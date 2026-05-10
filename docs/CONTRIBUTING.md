# Contributing

Thanks for your interest in contributing.

## Development setup

1. Fork and clone the repository.
2. Install dependencies:
   - `cd client && npm install`
   - `cd ../server && npm install`
3. Create `server/.env` (see README).
4. Start both apps:
   - `cd server && npm start`
   - `cd client && npm run dev`

## Branch and commit conventions

- Create a branch from `main`:
  - `feature/<short-description>`
  - `fix/<short-description>`
- Keep commits small and focused.
- Use clear commit messages in imperative tone.

## Pull request checklist

- PR title describes the change clearly.
- UI changes include before/after screenshots when applicable.
- New behavior is documented in README/docs if needed.
- `server` tests pass locally (`npm test` in `server`).

## Coding guidelines

- Prefer small reusable components.
- Keep route handlers concise; move repeated logic to middleware/helpers.
- Avoid mixing unrelated refactors with feature changes.
