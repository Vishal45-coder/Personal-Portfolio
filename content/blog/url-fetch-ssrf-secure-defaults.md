---
title: The Security Control That Ships Turned Off
date: 2026-09-07
excerpt: A widely used open source database lets users fetch external URLs from SQL, and the filter that restricts where those requests can go does nothing until an administrator configures it. Granting read access to external data quietly grants server side request forgery.
tags:
  - SSRF
  - Database security
  - Cloud security
  - Secure defaults
---

While reviewing the source code of a widely used open source database, I traced the function
that decides whether the server is allowed to fetch a given URL. The logic is short. If no
allowlist has been configured, the function returns early and permits the request, and the
comment above that early return says as much: everything is allowed by default.

The filter exists. It is simply inert until an administrator turns it on.

## The setup

The database supports reading external data directly from SQL, which is a genuinely useful
feature. Teams use it to read from object storage, partner APIs, and external data feeds. The
syntax varies by product, but the shape is always similar:

```sql
-- Illustrative syntax
SELECT * FROM url_source('https://storage.example.com/data.csv');
```

To use it, an administrator grants that user permission to read from external URLs. The
administrator believes they have granted this:

> This user can now read from our object storage bucket. That is it.

What they actually granted is this:

> This user can now make the database server send HTTP requests to anywhere.

## What "anywhere" means

Because the filter is inert by default, a restricted user, one who cannot even list the other
accounts on the system, can point the server at an internal address:

```sql
-- Reaches an internal service the user could never reach directly
SELECT * FROM url_source('http://127.0.0.1:9999/credentials.json');
```

And get back:

```json
{
  "AccessKeyId": "ASIAXXXXXXXXXEXAMPLE",
  "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG...",
  "Token": "FwoGZXIvYXdz..."
}
```

The user did not access any database they were not supposed to. They made the server fetch an
internal resource on their behalf. That is server side request forgery.

## Why cloud makes this worse

On AWS, GCP, and Azure, every instance has a metadata service at `169.254.169.254`. It hands
out the instance's IAM credentials to anyone who asks, with no password and no authentication,
by design. The one thing protecting it is that it only answers requests originating from the
instance itself.

SSRF removes that protection:

```sql
SELECT * FROM url_source(
    'http://169.254.169.254/latest/meta-data/iam/security-credentials/RoleName'
);
```

A SQL user with no shell access just took cloud credentials.

## The core issue

The fix for this exists. The vendor even ships the code for it. It only activates when an
administrator explicitly configures it, and most do not, because nothing tells them they need
to.

Secure products should be safe out of the box. A security control that requires opt in is not a
control, it is a suggestion.

## The fix

Administrators can activate the filter by defining an allowlist of permitted hosts in the
server configuration. Most data platforms with this feature expose such a setting, though the
parameter name differs between products, so check your vendor's documentation:

```xml
<!-- Illustrative. Parameter names vary by product. -->
<allowed_hosts>
    <host>storage.example.com</host>
</allowed_hosts>
```

Once set, only listed hosts are reachable. Everything else, including `127.0.0.1` and
`169.254.169.254`, is blocked.

The better fix belongs to the vendor: block private IP ranges and cloud metadata addresses by
default, even when no allowlist is configured. No legitimate external data source lives at
`127.0.0.1`.

If you run this kind of platform on AWS, enforcing IMDSv2 is worth doing regardless. It
requires a token obtained through a PUT request before credentials are returned, which a
simple GET based SSRF cannot perform on its own.

## Takeaway

Before granting URL fetch access to any user in any data platform, treat it like opening a
firewall port. Because that is exactly what it is.

---

Reported to the vendor through responsible disclosure. Product name, version, and source
excerpts are withheld deliberately.
