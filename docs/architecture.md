# Architecture Deep Dive

This document explains the request lifecycle and key backend flows.

## System context

```mermaid
flowchart LR
  Browser[Browser Client] -->|HTTP| Frontend[React + Vite]
  Frontend -->|REST /api/*| API[Express API]
  API --> DB[(MongoDB)]
  API --> Mail[SMTP via Nodemailer]
  API --> Files[/uploads]
```

## Auth flow

```mermaid
sequenceDiagram
  participant U as User
  participant C as Client
  participant A as API (/api/auth)
  participant D as MongoDB

  U->>C: Submit login/register form
  C->>A: POST /register or POST /login
  A->>D: Find/create user
  D-->>A: User record
  A-->>C: JWT token + user payload
  C->>C: Store token in localStorage
  C->>A: Protected request with Authorization: Bearer <token>
  A-->>C: Protected resource response
```

## Project CRUD flow

```mermaid
sequenceDiagram
  participant Admin as Admin User
  participant C as Client
  participant P as API (/api/projects)
  participant M as Multer
  participant D as MongoDB

  Admin->>C: Create or edit project
  C->>P: POST/PUT with Bearer token (+ image optional)
  P->>M: Parse multipart payload when image is present
  M-->>P: Uploaded file metadata
  P->>D: Persist project document
  D-->>P: Saved project
  P-->>C: JSON response for UI refresh
```

## Contact submission flow

```mermaid
sequenceDiagram
  participant V as Visitor
  participant C as Client
  participant R as Rate Limiter
  participant K as API (/api/contact)
  participant D as MongoDB
  participant S as SMTP

  V->>C: Submit contact form
  C->>R: POST /api/contact
  R-->>K: Allowed request
  K->>D: Save message record
  K->>S: Send notification email
  K-->>C: 201 success
```

## Design notes

- Client-side token attachment is centralized in `client/src/utils/api.js` interceptor.
- Route-level concerns are split by domain (`auth`, `projects`, `contact`) to keep handlers focused.
- Public contact endpoint is protected by rate limiting to reduce abuse.
- File uploads are isolated behind middleware for cleaner route handlers.
