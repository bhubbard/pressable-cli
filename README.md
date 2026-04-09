# Pressable CLI

A modern, TypeScript-based command-line interface to interact with the Pressable API. Built for Node.js and Bun.

## Features

- **TypeScript & ESM**: Fully typed for better developer experience and modern standards.
- **Bun Support**: Native support for the Bun runtime.
- **Fetch API**: Uses native `fetch` (Node 18+) for cross-runtime compatibility.
- **100% API Coverage**: Supports all documented endpoints in the Pressable API v1.
- **Raw JSON Output**: All commands output pretty-printed JSON, perfect for piping into `jq`.
- **Interactive Feedback**: Real-time terminal spinners during network requests.

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/pressable-cli.git
    cd pressable-cli
    ```

2. **Install dependencies**:

    ```bash
    npm install
    # OR
    bun install
    ```

3. **Build the project**:

    ```bash
    npm run build
    ```

4. **Link for global access**:

    ```bash
    npm link
    ```

## Authentication

The CLI supports two methods of authentication. The local configuration file is the preferred method for most users.

### 1. Persistent Configuration (Preferred)
Run the login command to securely save your credentials to `~/.pressable.json`:

```bash
pressable auth-login --client-id <your_id> --client-secret <your_secret>
```

Other authentication commands:
- `pressable auth-status` - Check current authentication status and source.
- `pressable auth-logout` - Delete saved credentials.

### 2. Environment Variables
You can also use a `.env` file in the project root or set environment variables directly:

```env
PRESSABLE_API_CLIENT_ID=your_client_id
PRESSABLE_API_CLIENT_SECRET=your_client_secret
```

## Command Overview

The CLI provides comprehensive management for your Pressable account and sites.

### 👤 Account

- `pressable account` - Get account details
- `pressable account-update --php <v> --datacenter <id>` - Update default account settings
- `pressable account-actions` - Get detailed account activity
- `pressable account-addons` - List account add-ons
- `pressable datacenters` - List all available datacenters
- `pressable php-versions` - List supported PHP versions

### 🏗️ Sites

- `pressable sites [--search <term>] [--page <n>] [--limit <n>]` - List/search sites
- `pressable site <siteId>` - Get site details
- `pressable create-site --name <name>` - Create a new site
- `pressable delete-site <siteId>` - Delete a site
- `pressable site-validate <name>` - Check if a site name is available
- `pressable site-disable <siteId>` - Disable a site
- `pressable site-enable <siteId>` - Enable a site
- `pressable site-convert <siteId> <live|staging|sandbox>` - Change site environment type
- `pressable site-clone <siteId>` - Clone a site (requires additional params)
- `pressable site-flush-cache <siteId>` - Flush object cache
- `pressable site-maintenance <siteId> <on|off>` - Toggle maintenance mode
- `pressable site-multisite <siteId> <on|off>` - Toggle multisite support
- `pressable site-favorite <siteId>` - Toggle favorite status
- `pressable site-login <siteId>` - Get One-Press Login URL

### 💾 Backups

- `pressable backups <siteId>` - List all backups
- `pressable create-backup <siteId>` - Create a standard backup
- `pressable restore-backup <siteId> <backupId>` - Restore a backup
- `pressable site-ondemand-backups <siteId>` - List on-demand backups
- `pressable site-ondemand-backup-create <siteId>` - Create an on-demand backup
- `pressable site-ondemand-backup-download <siteId> <id>` - Get download link for on-demand backup

### 🔗 Domains & SFTP

- `pressable site-domains <siteId>` - List domains
- `pressable site-domain-add <siteId> <domain>` - Add a domain
- `pressable site-domain-delete <siteId> <id>` - Remove a domain
- `pressable site-domain-primary <siteId> <id>` - Set primary domain
- `pressable site-sftp-users <siteId>` - List SFTP users
- `pressable site-sftp-reset <siteId> <user>` - Reset SFTP password

### 🔌 WordPress Management

- `pressable plugins <siteId>` - List plugins
- `pressable plugin-install <siteId> <slug>` - Install a plugin
- `pressable plugin-activate <siteId> <slug>` - Activate a plugin
- `pressable plugin-deactivate <siteId> <slug>` - Deactivate a plugin
- `pressable plugin-delete <siteId> <slug>` - Delete a plugin
- `pressable themes <siteId>` - List themes
- `pressable theme-install <siteId> <slug>` - Install a theme
- `pressable theme-activate <siteId> <slug>` - Activate a theme
- `pressable themes-delete <siteId> <slug>` - Delete a theme
- `pressable wp-cli <siteId> "<command>"` - Run a WP-CLI command
- `pressable site-bash <siteId> "<command>"` - Run a Bash command on the server

### 📈 Monitoring & Utility

- `pressable site-logs-php <siteId>` - Get PHP logs
- `pressable site-logs-server <siteId>` - Get server logs
- `pressable site-logs-activity <siteId>` - Get site activity logs
- `pressable site-stats <siteId>` - Get site statistics
- `pressable site-metrics <siteId>` - Get performance metrics
- `pressable site-security-alerts <siteId>` - Get security alerts
- `pressable site-firewall-rules <siteId>` - List egress firewall rules
- `pressable site-cron <siteId>` - List cron jobs
- `pressable site-usage-limits <siteId>` - Get DB/FS usage limits

## Development

The project includes a full suite of development tools:

- `npm test` - Run unit tests with Vitest.
- `npm run lint` - Run ESLint.
- `npm run format` - Format code with Prettier.

**Run from source**:
- Node: `npm run dev -- <command>`
- Bun: `bun run bun:dev -- <command>`

## License

MIT
