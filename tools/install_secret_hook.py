"""Install a local-only pre-commit hook, without replacing unrelated user hooks."""
import os
import subprocess
import sys
from pathlib import Path


def main():
    try:
        git_path = subprocess.check_output(
            ["git", "rev-parse", "--git-path", "hooks/pre-commit"],
            stderr=subprocess.DEVNULL, text=True).strip()
    except (OSError, subprocess.CalledProcessError):
        print("Git unavailable: no local hook installed; CI guard still applies.")
        return 0
    hook = Path(git_path)
    if hook.exists():
        existing = hook.read_text(encoding="utf-8", errors="replace")
        if "tools/check_secrets.py --staged" in existing:
            print("Local secret pre-commit hook already installed.")
            return 0
        print("Existing pre-commit hook preserved:", hook)
        print("Add 'python tools/check_secrets.py --staged' to it manually.")
        return 0
    hook.parent.mkdir(parents=True, exist_ok=True)
    hook.write_text("#!/bin/sh\npython tools/check_secrets.py --staged\n", encoding="utf-8")
    os.chmod(hook, 0o755)
    print("Local pre-commit secret guard installed:", hook)
    return 0


if __name__ == "__main__":
    sys.exit(main())
