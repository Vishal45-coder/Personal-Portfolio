---
title: My OSCP Journey
date: 2026-08-19
excerpt: What actually changed between starting PEN-200 and passing the exam. Less about tooling than about method, and about treating every box as a full attack path.
tags:
  - OSCP
  - Penetration testing
  - Career
---

## Where I started

I began the PEN-200 path from fundamentals and worked up through reconnaissance, web
exploitation, Linux and Windows privilege escalation, password attacks, tunneling, pivoting,
and Active Directory. The early labs were slow. The value was not in finishing them quickly,
it was in building a process I could repeat under pressure.

## What changed my results

- I stopped treating machines as a list of isolated vulnerabilities and started treating each
  one as a full attack path, from enumeration and initial access through privilege escalation,
  credential discovery, lateral movement, and post exploitation.
- I built a repeatable workflow around BloodHound, Impacket, Chisel, NetExec, WinPEAS, LinPEAS,
  msfvenom, Burp Suite, Nmap, and Wireshark. Tools support enumeration and validation. They do
  not replace either one.
- The largest single improvement was method rather than tooling. Careful enumeration,
  disciplined troubleshooting when something failed, and going back to question an assumption
  were worth more than any specific exploit.
- When a privilege escalation route stalled, the answer was almost always something I had
  already collected and not read closely enough.

## The enumeration habit that mattered most

Full port scans first, then services, then versions. Skipping the slow scan to save ten minutes
cost me hours more than once.

```bash
# Full TCP sweep, then targeted service detection on what actually answered
nmap -p- --min-rate 2000 -T4 -oA scans/all-ports 10.10.10.10
nmap -p 22,80,445 -sC -sV -oA scans/services 10.10.10.10
```

When a web service showed up, I catalogued everything before touching an exploit: response
headers, error messages, technologies, and any parameter that reached a backend.

## After the exam

I passed in 2026. I still run CTF and lab boxes across web, Linux, Windows, and Active Directory
environments to keep exploitation, privilege escalation, credential attacks, pivoting, and
lateral movement current.

The part that carried directly into my day job was the discipline around validation. Confirming
real impact before reporting a finding is the same skill in a lab and in production.
