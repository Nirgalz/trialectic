"""Small executable *test reference model*, NOT the Trialectic production engine.

Only implements narrow consequences of validated decisions D-27, D-31, D-35,
D-40–D-47. Storage and evaluation details remain experimental.
"""

from copy import deepcopy
from dataclasses import dataclass, field

STATES = frozenset({"satisfied", "unsatisfied", "indeterminate"})
COVERAGE = frozenset({"complete", "incomplete", "indeterminate"})


class InvalidDefinition(ValueError):
    """A logical input is malformed, absent or references a wrong version."""


class DependencyAnalysisNeeded(Exception):
    """A cyclic logical reference must be analyzed as a dependency, not recursed."""


def _state(value):
    if value not in STATES:
        raise InvalidDefinition(f"Unknown state: {value!r}")
    return value


def _coverage(value):
    if value not in COVERAGE:
        raise InvalidDefinition(f"Unknown completeness: {value!r}")
    return value


def group(op, members):
    """D-40 three-state all/any; D-42 forbids Boolean empty identities."""
    if op not in ("all", "any") or not isinstance(members, (list, tuple)) or not members:
        raise InvalidDefinition("Expected nonempty 'all' or 'any' group")
    values = [_state(x) for x in members]
    if op == "all":
        if "unsatisfied" in values:
            return "unsatisfied"
        return "satisfied" if all(x == "satisfied" for x in values) else "indeterminate"
    if "satisfied" in values:
        return "satisfied"
    return "unsatisfied" if all(x == "unsatisfied" for x in values) else "indeterminate"


def pathway(members, completeness):
    """D-41: a known failed necessary condition defeats the identified pathway."""
    coverage = _coverage(completeness)
    value = group("all", members)
    if value == "unsatisfied":
        return value
    return value if coverage == "complete" else "indeterminate"


def inventory(path_values, completeness):
    """D-41/43: absence of a found route is not global impossibility."""
    coverage = _coverage(completeness)
    if not isinstance(path_values, (list, tuple)):
        raise InvalidDefinition("Pathways must be a list")
    values = [_state(p) for p in path_values]
    if not values:
        return "indeterminate"  # No identified pathway; not an empty any-group.
    if "satisfied" in values:
        return "satisfied"  # A confirmed *modeled* alternative.
    if coverage == "complete" and all(v == "unsatisfied" for v in values):
        return "unsatisfied"  # Only in explicitly scoped, claimed complete inventory.
    return "indeterminate"


def can_assessment(action_conditions, pathway_completeness, power_assessment=None):
    """D-27: condition evaluation does not establish *complete* Power."""
    return {
        "action_pathway": pathway(action_conditions, pathway_completeness),
        "power": _state(power_assessment) if power_assessment is not None else "indeterminate",
    }


def relation_qualifications(explicit):
    """D-31: a correspondence does not imply contribution or sufficiency."""
    allowed = {"correspondence", "contribution", "conditional_sufficiency", "scenario_necessity"}
    if not isinstance(explicit, list) or not set(explicit) <= allowed:
        raise InvalidDefinition("Unknown NEED/CAN relation qualification")
    return {name: name in explicit for name in sorted(allowed)}


def expression(expr, registry=None, active=frozenset()):
    """A *provisional* D-42 expression adapter with explicit versioned references."""
    registry = {} if registry is None else registry
    if not isinstance(expr, dict):
        raise InvalidDefinition("An expression must be a mapping")
    if "state" in expr and set(expr) == {"state"}:
        return _state(expr["state"])
    if "ref" in expr and set(expr) == {"ref"}:
        ref = expr["ref"]
        if not isinstance(ref, dict) or set(ref) != {"id", "version"} or not all(ref.values()):
            raise InvalidDefinition("Reference requires exact id and version")
        key = (ref["id"], ref["version"])
        if key in active:
            raise DependencyAnalysisNeeded(f"Cycle involving {key}")
        if key not in registry:
            raise InvalidDefinition(f"Missing versioned reference {key}")
        return expression(registry[key], registry, active | {key})
    if set(expr) == {"op", "items"} and isinstance(expr["items"], list):
        if not expr["items"]:
            raise InvalidDefinition("Empty logical group")
        return group(expr["op"], [expression(e, registry, active) for e in expr["items"]])
    raise InvalidDefinition("Invalid recursive expression")


@dataclass(frozen=True)
class Definition:
    object_id: str
    version: str


@dataclass(frozen=True)
class Assessment:
    claim_id: str
    model_status: str
    empirical_status: str
    evidence_ids: tuple[str, ...]


@dataclass
class Scenario:
    scenario_id: str
    definitions: dict[str, Definition]
    physical: dict[tuple[str, str], object]
    events: list[str] = field(default_factory=list)
    contested: set[tuple[str, str]] = field(default_factory=set)
    assessments: list[Assessment] = field(default_factory=list)

    def fork(self, name):
        return Scenario(name, self.definitions.copy(), deepcopy(self.physical),
                        self.events.copy(), self.contested.copy(), self.assessments.copy())

    def observed_condition(self, key, required=True):
        if key in self.contested or key not in self.physical:
            return "indeterminate"
        return "satisfied" if self.physical[key] == required else "unsatisfied"

    def dispute_evidence(self, key):
        """D-45: epistemic overlay, not a physical transition or Actualization."""
        self.contested.add(key)

    def register_assessment(self, claim_id, model_status, empirical_status, evidence_ids=()):
        if model_status not in {"established_in_model", "not_derived", "indeterminate"}:
            raise InvalidDefinition("Invalid model status")
        if empirical_status not in {"plausible", "refuted_in_context", "indeterminate"}:
            raise InvalidDefinition("Invalid empirical status")
        row = Assessment(claim_id, model_status, empirical_status, tuple(evidence_ids))
        self.assessments.append(row)
        return row

    def actualize(self, event_id, changes, depends_on=()):
        """Only declared, unblocked *simulated* events can change physical state."""
        if any(k in self.contested for k in depends_on):
            return "suspended"
        if any(k[0] not in self.definitions for k in changes):
            raise InvalidDefinition("Unrecognized Object in event")
        if event_id in self.events:
            raise InvalidDefinition("Duplicate Actualization event")
        for key, value in changes.items():
            self.physical[key] = value
        self.events.append(event_id)
        return "applied"


def temporal_need(observations, continuous_coverage=False):
    """D-35: endpoint satisfaction is different from temporal compliance."""
    if not observations:
        raise InvalidDefinition("No temporal observations")
    times = [row[0] for row in observations]
    if times != sorted(set(times)):
        raise InvalidDefinition("Times must be increasing and unique")
    states = [_state(row[1]) for row in observations]
    effective_at_end = states[-1]
    if "unsatisfied" in states:
        compliance = "unsatisfied"
    elif continuous_coverage and all(s == "satisfied" for s in states):
        compliance = "satisfied"
    else:
        compliance = "indeterminate"  # Samples cannot establish continuity.
    return {"effective_at_end": effective_at_end, "temporal_compliance": compliance}


def declared_origin_groups(reports):
    """D-46: count declared roots, *not* empirically verified independence."""
    groups = {}
    for report in reports:
        if set(report) != {"id", "root"} or not report["id"] or not report["root"]:
            raise InvalidDefinition("Declared report requires id and root")
        groups.setdefault(report["root"], set()).add(report["id"])
    return {root: sorted(ids) for root, ids in sorted(groups.items())}
