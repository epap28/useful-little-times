# Security Policy

Please report security issues privately when possible.

Do not open a public issue for vulnerabilities involving authentication, session cookies, dependency exploits, or data exposure.

## Supported Version

The main branch is the supported development line until the first stable release.

## Local Secrets

Never commit `.env` files. Use `.env.example` as the template and set a strong `AUTH_SECRET` in deployed environments.
