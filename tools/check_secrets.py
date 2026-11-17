"""Fail closed on staged/tracked credentials, with no secret values in diagnostics."""
import argparse
import re
import subprocess
from pathlib import PurePosixPath

TOKEN = re.compile(r"(?<![A-Za-z0-9])" + r"sk" + r"-[A-Za-z0-9_-]{20,}")
ASSIGNMENT = re.compile(r"OPENAI_API_KEY\s*[:=]\s*['\"]?\s*(?:sk|rk)-[A-Za-z0-9_-]{8,}", re.I)
BLOCKED_NAMES = {"credentials.local.json", "secrets.local.json", "credentials.json"}
BLOCKED_SUFFIXES = (".pem", ".p12", ".pfx", ".secret")


def cmd(*args):
    return subprocess.run(["git", *args], check=True, capture_output=True).stdout


def prohibited_path(path):
    normalized = PurePosixPath(path)
    return any(p == ".env" or p.startswith(".env.") or
               p.lower() in BLOCKED_NAMES or p.lower().endswith(BLOCKED_SUFFIXES)
               for p in normalized.parts)


def check_bytes(path, data):
    # Key-like markers in binary artifacts are still checked.
    if prohibited_path(path):
        return "forbidden credential file path"
    if TOKEN.search(data.decode("utf-8", "ignore")) or ASSIGNMENT.search(data.decode("utf-8", "ignore")):
        return "API-key-like token detected"
    return None


def check(staged=False):
    paths = cmd(*(["diff", "--cached", "--name-only", "-z", "--diff-filter=ACMR"]
                  if staged else ["ls-files", "-z"])).decode().split("\0")
    violations = []
    for path in filter(None, paths):
        try:
            data = cmd("show", ":" + path) if staged else cmd("show", "HEAD:" + path)
        except subprocess.CalledProcessError:
            # Files added to an empty repository, or not yet committed, may lack HEAD.
            if staged:
                raise
            continue
        reason = check_bytes(path, data)
        if reason:
            violations.append((path, reason))
    return violations


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--staged", action="store_true",
                    help="inspect the staging area (pre-commit hook)")
    args = ap.parse_args()
    try:
        failures = check(staged=args.staged)
    except (OSError, subprocess.CalledProcessError) as exc:
        print("Secret check could not run; refusing to pass:", type(exc).__name__)
        return 2
    if failures:
        for path, reason in failures:
            print("BLOCKED:", path, "-", reason, "(value intentionally hidden)")
        print("Do not override protection to commit a real credential.")
        return 1
    print("Secret check: no forbidden paths or token patterns detected.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
