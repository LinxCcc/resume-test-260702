# Private resume site

Vue 3 resume site with a server-side shared-password gate for deployment behind
Nginx on a private Linux server.

## Security model

- The login page is a standalone public document and does not contain resume
  data.
- The Vue application, images, fonts, and other assets are returned only after
  a signed session cookie is verified.
- Passwords are stored as scrypt hashes. Plaintext passwords are never written
  to the repository or browser storage.
- Sessions are signed, expire automatically, and are invalidated when the
  shared password changes.
- Ten failed login attempts within ten minutes trigger a thirty-minute block;
  the login endpoint is also rate-limited by Nginx.

## Local commands

```bash
npm install
npm run build
npm run password:hash
npm start
```

The production server requires `ACCESS_PASSWORD_HASH` and a
`SESSION_SECRET` of at least 32 characters. Deployment templates are in
`deploy/`.

## Deployment layout

```text
/var/www/resume/current/
├── client/
└── server/
```

The Node service listens only on `127.0.0.1:3000`; Nginx is the public HTTPS
entry point.
