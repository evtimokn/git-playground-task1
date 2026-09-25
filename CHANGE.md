# Changelog

## Unreleased

### Changed
- `lib/config.js`: `SESSION_TIMEOUT_MINUTES` lowered from 15 to 5.
- `package.json`: `license` field reverted to `MIT` (was briefly changed to `Apache` and back).

### Fixed
- `notes.js`: `delete` now validates its `<id>` argument — missing or non-integer input prints a usage message instead of silently failing.
- `lib/store.js`:
  - `load()` now distinguishes a missing `notes.json` (starts fresh) from malformed JSON or an unexpected data shape (warns on stderr and resets safely instead of losing data silently).
  - `save()` now writes to a temp file and renames it into place, so a crash mid-write can't leave `notes.json` corrupted.

### Added
- `notes.md`: notes documenting the Lesson 1 "read the repo" exercise (moved out of `.github/workflows/`, which requires the `workflow` token scope, into the repo root).
