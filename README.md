# Pressable CLI

A command-line interface to interact with the Pressable API.

## Installation

1.  Clone this repository:

    ```bash
    git clone https://github.com/your-username/pressable-cli.git
    ```

2.  Install the dependencies:

    ```bash
    cd pressable-cli
    npm install
    ```

3.  Link the CLI to make it available globally:

    ```bash
    npm link
    ```

## Configuration

1.  Create a `.env` file in the root of the project.

2.  Add your Pressable API credentials to the `.env` file:

    ```
    PRESSABLE_API_CLIENT_ID=your_client_id
    PRESSABLE_API_CLIENT_SECRET=your_client_secret
    ```

    You can get your API credentials from [https://my.pressable.com/api-applications](https://my.pressable.com/api-applications).

## Commands

### Account

*   `pressable account` - Get account details

    ```bash
    pressable account
    ```

*   `pressable activity` - Get account activity

    ```bash
    pressable activity
    ```

*   `pressable datacenters` - Get all datacenters

    ```bash
    pressable datacenters
    ```

*   `pressable php-versions` - Get all PHP versions

    ```bash
    pressable php-versions
    ```

### Sites

*   `pressable sites` - List all sites

    ```bash
    pressable sites
    ```

*   `pressable site <siteId>` - Get details of a specific site

    ```bash
    pressable site 12345
    ```

*   `pressable create-site --name <name>` - Create a new site

    ```bash
    pressable create-site --name "My New Site"
    ```

*   `pressable delete-site <siteId>` - Delete a site

    ```bash
    pressable delete-site 12345
    ```

### Backups

*   `pressable create-backup <siteId>` - Create a new backup

    ```bash
    pressable create-backup 12345
    ```

*   `pressable backups <siteId>` - Get all backups for a site

    ```bash
    pressable backups 12345
    ```

*   `pressable backup <siteId> <backupId>` - Get a specific backup

    ```bash
    pressable backup 12345 67890
    ```

*   `pressable restore-backup <siteId> <backupId>` - Restore a backup

    ```bash
    pressable restore-backup 12345 67890
    ```

### Collaborators

*   `pressable collaborators` - Get all collaborators

    ```bash
    pressable collaborators
    ```

*   `pressable collaborator <collaboratorId>` - Get a specific collaborator

    ```bash
    pressable collaborator 12345
    ```

*   `pressable add-collaborator <siteId> <email>` - Add a collaborator to a site

    ```bash
    pressable add-collaborator 12345 john.doe@example.com
    ```

*   `pressable remove-collaborator <collaboratorId>` - Remove a collaborator

    ```bash
    pressable remove-collaborator 12345
    ```

### Edge Cache

*   `pressable edge-cache-status <siteId>` - Get edge cache status for a site

    ```bash
    pressable edge-cache-status 12345
    ```

*   `pressable purge-edge-cache <siteId>` - Purge edge cache for a site

    ```bash
    pressable purge-edge-cache 12345
    ```

### Plugins

*   `pressable plugins <siteId>` - Get all plugins for a site

    ```bash
    pressable plugins 12345
    ```

*   `pressable update-plugin <siteId> <plugin-slug>` - Update a plugin on a site

    ```bash
    pressable update-plugin 12345 my-plugin
    ```

### Must-Use Plugins

*   `pressable mu-plugins <siteId>` - Get all must-use plugins for a site

    ```bash
    pressable mu-plugins 12345
    ```

*   `pressable create-mu-plugin <siteId> <name> <code_path>` - Create a must-use plugin for a site

    ```bash
    pressable create-mu-plugin 12345 "My MU Plugin" /path/to/plugin.php
    ```

*   `pressable delete-mu-plugin <siteId> <pluginId>` - Delete a must-use plugin from a site

    ```bash
    pressable delete-mu-plugin 12345 67890
    ```

### Themes

*   `pressable themes <siteId>` - Get all themes for a site

    ```bash
    pressable themes 12345
    ```

*   `pressable update-theme <siteId> <theme-slug>` - Update a theme on a site

    ```bash
    pressable update-theme 12345 my-theme
    ```

### WordPress

*   `pressable wordpress-users <siteId>` - Get all WordPress users for a site

    ```bash
    pressable wordpress-users 12345
    ```

*   `pressable create-wordpress-user <siteId> <username> <email>` - Create a new WordPress user on a site

    ```bash
    pressable create-wordpress-user 12345 john.doe john.doe@example.com
    ```

*   `pressable delete-wordpress-user <siteId> <userId>` - Delete a WordPress user from a site

    ```bash
    pressable delete-wordpress-user 12345 67890
    ```

*   `pressable wp-cli <siteId> <command>` - Run a WP-CLI command on a site

    ```bash
    pressable wp-cli 12345 "plugin list"
    ```

### DNS

*   `pressable dns-zones <siteId>` - Get all DNS zones for a site

    ```bash
    pressable dns-zones 12345
    ```

*   `pressable create-dns-zone <siteId> <zoneName>` - Create a DNS zone for a site

    ```bash
    pressable create-dns-zone 12345 example.com
    ```

*   `pressable dns-zone <siteId> <zoneId>` - Get a specific DNS zone

    ```bash
    pressable dns-zone 12345 67890
    ```

*   `pressable delete-dns-zone <siteId> <zoneId>` - Delete a DNS zone

    ```bash
    pressable delete-dns-zone 12345 67890
    ```

*   `pressable dns-records <siteId> <zoneId>` - Get all DNS records for a zone

    ```bash
    pressable dns-records 12345 67890
    ```

*   `pressable create-dns-record <siteId> <zoneId> --type <type> --name <name> --content <content> --ttl <ttl>` - Create a DNS record for a zone

    ```bash
    pressable create-dns-record 12345 67890 --type A --name www --content 127.0.0.1 --ttl 3600
    ```

*   `pressable dns-record <siteId> <zoneId> <recordId>` - Get a specific DNS record

    ```bash
    pressable dns-record 12345 67890 11223
    ```

*   `pressable update-dns-record <siteId> <zoneId> <recordId> --type <type> --name <name> --content <content> --ttl <ttl>` - Update a DNS record

    ```bash
    pressable update-dns-record 12345 67890 11223 --type A --name www --content 127.0.0.2 --ttl 3600
    ```

*   `pressable delete-dns-record <siteId> <zoneId> <recordId>` - Delete a DNS record

    ```bash
    pressable delete-dns-record 12345 67890 11223
    ```

### Webhooks

*   `pressable webhooks <siteId>` - Get all webhooks for a site

    ```bash
    pressable webhooks 12345
    ```

*   `pressable create-webhook <siteId> <url> <event>` - Create a webhook for a site

    ```bash
    pressable create-webhook 12345 https://example.com/webhook site.renamed
    ```

*   `pressable webhook <siteId> <webhookId>` - Get a specific webhook

    ```bash
    pressable webhook 12345 67890
    ```

*   `pressable update-webhook <siteId> <webhookId> --url <url> --event <event>` - Update a webhook

    ```bash
    pressable update-webhook 12345 67890 --url https://example.com/new-webhook --event site.renamed
    ```

*   `pressable delete-webhook <siteId> <webhookId>` - Delete a webhook

    ```bash
    pressable delete-webhook 12345 67890
    ```
