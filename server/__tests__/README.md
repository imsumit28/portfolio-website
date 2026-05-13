# Backend Test Suite

This folder contains API-level tests for the Express backend.

## Test Files

1. `health.test.js`
- Verifies `GET /` returns `200` and the expected status banner.

2. `auth.validation.test.js`
- Validates auth input handling for:
  - invalid email on register
  - short password on register
  - missing credentials on login
- Uses Jest mocks for `User` model interactions where needed.

3. `contact.validation.test.js`
- Validates contact input handling for:
  - missing required fields
  - invalid email format
  - normalization of valid payload before persistence
- Uses Jest mock for the `Contact` model save flow.

## Run Tests

From `server/`:

```bash
npm test
```

## Why These Tests Matter

- They lock down basic request validation rules.
- They protect against regressions in auth/contact endpoints.
- They provide fast verification in CI before merge/deploy.
