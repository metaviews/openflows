# Server Environment

Reference for projects and agents deployed on this machine.

## Hardware

- **CPU**: 2 cores — Intel Xeon E5-2680 v4 @ 2.40GHz
- **RAM**: 4GB, no swap
- **OS**: Debian Trixie (13)

## Access

- **User**: `jesse` (single account)
- **SSH**: key-based auth
- **Networking**: no ports exposed directly; all public traffic routes through Cloudflare Tunnel

## Installed runtimes

- **Node.js**: 22 (built-in `node:sqlite` available)
- **PHP**: php-fpm (for allanhirsh.com)
- **nginx**: reverse proxy / static server (for allanhirsh.com)
- **MariaDB**: database (for allanhirsh.com)

## Process management

- **PM2**: manages Node.js processes; `pm2 save` to persist across reboots
- **systemd**: manages cloudflared tunnel and system services

## Cloudflare

- **Tunnel**: `cloudflared` runs as a systemd service; config at `/etc/cloudflared/config.yml`
- **Access**: Cloudflare Access gates admin subdomains; email-based auth

## Projects

| Project | Path | Port | PM2 name | Public URL |
|---|---|---|---|---|
| allanhirsh.com | — | 80/443 via nginx | — | allanhirsh.com |
| Openflows / Peng | `/home/jesse/openflows` | 3000 | `peng` | admin.openflows.org |

## Port allocation convention

Start from 3000, increment by 1 for each new Node.js service. Document here when a port is claimed.

## Deployment pattern

For Node.js projects:
```bash
cd /home/jesse/<project>
git pull --rebase
npm install
pm2 restart <name>
```
