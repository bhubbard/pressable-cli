#!/usr/bin/env node
import 'dotenv/config.js';
import { program } from 'commander';
import * as api from './api.js';
import fs from 'node:fs';
import process from 'node:process';
program
    .version('1.0.0')
    .description('A CLI to interact with the Pressable API');
// 
// Account
// 
program
    .command('account')
    .description('Get account details')
    .action(async () => {
    const account = await api.getAccount();
    if (account) {
        console.log(JSON.stringify(account, null, 2));
    }
});
program
    .command('account-update')
    .description('Update account details')
    .option('--php <version>', 'Set default PHP version')
    .option('--datacenter <id>', 'Set default datacenter ID')
    .action(async (options) => {
    const result = await api.updateAccount({
        php_version: options.php,
        datacenter_id: options.datacenter ? parseInt(options.datacenter) : undefined
    });
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('account-actions')
    .description('Get detailed account activity actions')
    .action(async () => {
    const actions = await api.getAccountActions();
    if (actions) {
        console.log(JSON.stringify(actions, null, 2));
    }
});
program
    .command('account-addons')
    .description('Get account add-ons')
    .action(async () => {
    const addons = await api.getAccountAddons();
    if (addons) {
        console.log(JSON.stringify(addons, null, 2));
    }
});
program
    .command('activity')
    .description('Get account activity')
    .action(async () => {
    const activity = await api.getAccountActivity();
    if (activity) {
        console.log(activity);
    }
});
program
    .command('datacenters')
    .description('Get all datacenters')
    .action(async () => {
    const datacenters = await api.getDatacenters();
    if (datacenters) {
        console.log(datacenters);
    }
});
program
    .command('php-versions')
    .description('Get all PHP versions')
    .action(async () => {
    const phpVersions = await api.getPhpVersions();
    if (phpVersions) {
        console.log(phpVersions);
    }
});
// 
// Sites
// 
program
    .command('sites')
    .description('List all sites')
    .option('--search <term>', 'Search sites by name')
    .option('--page <number>', 'Results page number')
    .option('--limit <number>', 'Results per page')
    .action(async (options) => {
    const sites = await api.getSites(options);
    if (sites) {
        console.log(JSON.stringify(sites, null, 2));
    }
});
program
    .command('site-validate <name>')
    .description('Validate a site name')
    .action(async (name) => {
    const result = await api.validateSiteName(name);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-disable <siteId>')
    .description('Disable a site')
    .action(async (siteId) => {
    const result = await api.disableSite(siteId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-enable <siteId>')
    .description('Enable a site')
    .action(async (siteId) => {
    const result = await api.enableSite(siteId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-convert <siteId> <type>')
    .description('Convert site type (live, staging, sandbox)')
    .action(async (siteId, type) => {
    const result = await api.convertSite(siteId, type);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-flush-cache <siteId>')
    .description('Flush object cache for a site')
    .action(async (siteId) => {
    const result = await api.flushObjectCache(siteId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-maintenance <siteId> <on_off>')
    .description('Toggle maintenance mode (on or off)')
    .action(async (siteId, on_off) => {
    const enabled = on_off.toLowerCase() === 'on';
    const result = await api.setMaintenanceMode(siteId, enabled);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-multisite <siteId> <on_off>')
    .description('Toggle multisite support (on or off)')
    .action(async (siteId, on_off) => {
    const enabled = on_off.toLowerCase() === 'on';
    const result = await api.setMultisiteSupport(siteId, enabled);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site <siteId>')
    .description('Get details of a specific site')
    .action(async (siteId) => {
    const site = await api.getSite(siteId);
    if (site) {
        console.log(site);
    }
});
program
    .command('create-site')
    .description('Create a new site')
    .option('-n, --name <name>', 'Site name')
    .action(async (options) => {
    const site = await api.createSite({ name: options.name });
    if (site) {
        console.log(site);
    }
});
program
    .command('delete-site <siteId>')
    .description('Delete a site')
    .action(async (siteId) => {
    const result = await api.deleteSite(siteId);
    if (result) {
        console.log(result);
    }
});
program
    .command('site-domains <siteId>')
    .description('Get all domains for a site')
    .action(async (siteId) => {
    const domains = await api.getSiteDomains(siteId);
    if (domains) {
        console.log(JSON.stringify(domains, null, 2));
    }
});
program
    .command('site-domain-add <siteId> <domain>')
    .description('Add a domain to a site')
    .action(async (siteId, domain) => {
    const result = await api.addSiteDomain(siteId, domain);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-domain-delete <siteId> <domainId>')
    .description('Delete a domain from a site')
    .action(async (siteId, domainId) => {
    const result = await api.deleteSiteDomain(siteId, domainId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-domain-primary <siteId> <domainId>')
    .description('Set a domain as primary for a site')
    .action(async (siteId, domainId) => {
    const result = await api.setPrimaryDomain(siteId, domainId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-sftp-users <siteId>')
    .description('Get all SFTP users for a site')
    .action(async (siteId) => {
    const users = await api.getSftpUsers(siteId);
    if (users) {
        console.log(JSON.stringify(users, null, 2));
    }
});
program
    .command('site-sftp-reset <siteId> <username>')
    .description('Reset SFTP password for a user')
    .action(async (siteId, username) => {
    const result = await api.resetSftpPassword(siteId, username);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
// 
// Backups
// 
program
    .command('create-backup <siteId>')
    .description('Create a new backup')
    .action(async (siteId) => {
    const backup = await api.createBackup(siteId);
    if (backup) {
        console.log(JSON.stringify(backup, null, 2));
    }
});
program
    .command('backups <siteId>')
    .description('Get all backups for a site')
    .action(async (siteId) => {
    const backups = await api.getBackups(siteId);
    if (backups) {
        console.log(JSON.stringify(backups, null, 2));
    }
});
program
    .command('backup <siteId> <backupId>')
    .description('Get a specific backup')
    .action(async (siteId, backupId) => {
    const backup = await api.getBackup(siteId, backupId);
    if (backup) {
        console.log(JSON.stringify(backup, null, 2));
    }
});
program
    .command('restore-backup <siteId> <backupId>')
    .description('Restore a backup')
    .action(async (siteId, backupId) => {
    const result = await api.restoreBackup(siteId, backupId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-ondemand-backups <siteId>')
    .description('Get all on-demand backups for a site')
    .action(async (siteId) => {
    const backups = await api.getOnDemandBackups(siteId);
    if (backups) {
        console.log(JSON.stringify(backups, null, 2));
    }
});
program
    .command('site-ondemand-backup-create <siteId>')
    .description('Create an on-demand backup for a site')
    .action(async (siteId) => {
    const backup = await api.createOnDemandBackup(siteId);
    if (backup) {
        console.log(JSON.stringify(backup, null, 2));
    }
});
program
    .command('site-ondemand-backup-get <siteId> <backupId>')
    .description('Get a specific on-demand backup')
    .action(async (siteId, backupId) => {
    const backup = await api.getOnDemandBackup(siteId, backupId);
    if (backup) {
        console.log(JSON.stringify(backup, null, 2));
    }
});
program
    .command('site-ondemand-backup-download <siteId> <backupId>')
    .description('Download an on-demand backup')
    .action(async (siteId, backupId) => {
    const backup = await api.downloadOnDemandBackup(siteId, backupId);
    if (backup) {
        console.log(JSON.stringify(backup, null, 2));
    }
});
program
    .command('site-ondemand-backup-delete <siteId> <backupId>')
    .description('Delete an on-demand backup')
    .action(async (siteId, backupId) => {
    const result = await api.deleteOnDemandBackup(siteId, backupId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
// 
// Collaborators
// 
program
    .command('collaborators')
    .description('Get all collaborators')
    .action(async () => {
    const collaborators = await api.getCollaborators();
    if (collaborators) {
        console.log(collaborators);
    }
});
program
    .command('collaborator <collaboratorId>')
    .description('Get a specific collaborator')
    .action(async (collaboratorId) => {
    const collaborator = await api.getCollaborator(collaboratorId);
    if (collaborator) {
        console.log(collaborator);
    }
});
program
    .command('add-collaborator <siteId> <email>')
    .description('Add a collaborator to a site')
    .action(async (siteId, email) => {
    const collaborator = await api.addCollaborator(siteId, { email });
    if (collaborator) {
        console.log(collaborator);
    }
});
program
    .command('remove-collaborator <collaboratorId>')
    .description('Remove a collaborator')
    .action(async (collaboratorId) => {
    const result = await api.removeCollaborator(collaboratorId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('collaborators-batch-add <siteId> <emails...>')
    .description('Add multiple collaborators to a site')
    .action(async (siteId, emails) => {
    const result = await api.addCollaboratorsBatch(siteId, emails);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('collaborators-batch-remove <siteId> <emails...>')
    .description('Remove multiple collaborators from a site')
    .action(async (siteId, emails) => {
    const result = await api.removeCollaboratorsBatch(siteId, emails);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('collaborators-by-email <email>')
    .description('Get all sites a collaborator has access to by email')
    .action(async (email) => {
    const result = await api.getCollaboratorSitesByEmail(email);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-favorite <siteId>')
    .description('Toggle favorite status for a site')
    .action(async (siteId) => {
    const result = await api.toggleFavoriteSite(siteId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
// 
// Edge Cache
// 
program
    .command('edge-cache-status <siteId>')
    .description('Get edge cache status for a site')
    .action(async (siteId) => {
    const status = await api.getEdgeCacheStatus(siteId);
    if (status) {
        console.log(status);
    }
});
program
    .command('purge-edge-cache <siteId>')
    .description('Purge edge cache for a site')
    .action(async (siteId) => {
    const result = await api.purgeEdgeCache(siteId);
    if (result) {
        console.log(result);
    }
});
// 
// Plugins
// 
program
    .command('plugins <siteId>')
    .description('Get all plugins for a site')
    .action(async (siteId) => {
    const plugins = await api.getPlugins(siteId);
    if (plugins) {
        console.log(plugins);
    }
});
program
    .command('update-plugin <siteId> <plugin-slug>')
    .description('Update a plugin on a site')
    .action(async (siteId, pluginSlug) => {
    const result = await api.updatePlugin(siteId, { plugin: pluginSlug });
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('plugin-activate <siteId> <slug>')
    .description('Activate a plugin on a site')
    .action(async (siteId, slug) => {
    const result = await api.activatePlugin(siteId, slug);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('plugin-deactivate <siteId> <slug>')
    .description('Deactivate a plugin on a site')
    .action(async (siteId, slug) => {
    const result = await api.deactivatePlugin(siteId, slug);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('plugin-install <siteId> <slug>')
    .description('Install a plugin on a site')
    .action(async (siteId, slug) => {
    const result = await api.installPlugin(siteId, slug);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('plugin-delete <siteId> <slug>')
    .description('Delete a plugin from a site')
    .action(async (siteId, slug) => {
    const result = await api.deletePlugin(siteId, slug);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
// 
// Must-Use Plugins
// 
program
    .command('mu-plugins <siteId>')
    .description('Get all must-use plugins for a site')
    .action(async (siteId) => {
    const plugins = await api.getMuPlugins(siteId);
    if (plugins) {
        console.log(plugins);
    }
});
program
    .command('create-mu-plugin <siteId> <name> <code_path>')
    .description('Create a must-use plugin for a site')
    .action(async (siteId, name, code_path) => {
    const code = fs.readFileSync(code_path, 'utf8');
    const plugin = await api.createMuPlugin(siteId, { name, code });
    if (plugin) {
        console.log(plugin);
    }
});
program
    .command('delete-mu-plugin <siteId> <pluginId>')
    .description('Delete a must-use plugin from a site')
    .action(async (siteId, pluginId) => {
    const result = await api.deleteMuPlugin(siteId, pluginId);
    if (result) {
        console.log(result);
    }
});
// 
// Themes
// 
program
    .command('themes <siteId>')
    .description('Get all themes for a site')
    .action(async (siteId) => {
    const themes = await api.getThemes(siteId);
    if (themes) {
        console.log(themes);
    }
});
program
    .command('update-theme <siteId> <theme-slug>')
    .description('Update a theme on a site')
    .action(async (siteId, themeSlug) => {
    const result = await api.updateTheme(siteId, { theme: themeSlug });
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('theme-activate <siteId> <slug>')
    .description('Activate a theme on a site')
    .action(async (siteId, slug) => {
    const result = await api.activateTheme(siteId, slug);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('theme-install <siteId> <slug>')
    .description('Install a theme on a site')
    .action(async (siteId, slug) => {
    const result = await api.installTheme(siteId, slug);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('theme-delete <siteId> <slug>')
    .description('Delete a theme from a site')
    .action(async (siteId, slug) => {
    const result = await api.deleteTheme(siteId, slug);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
// 
// WordPress
// 
program
    .command('wordpress-users <siteId>')
    .description('Get all WordPress users for a site')
    .action(async (siteId) => {
    const users = await api.getWordpressUsers(siteId);
    if (users) {
        console.log(users);
    }
});
program
    .command('create-wordpress-user <siteId> <username> <email>')
    .description('Create a new WordPress user on a site')
    .action(async (siteId, username, email) => {
    const user = await api.createWordpressUser(siteId, { username, email });
    if (user) {
        console.log(user);
    }
});
program
    .command('delete-wordpress-user <siteId> <userId>')
    .description('Delete a WordPress user from a site')
    .action(async (siteId, userId) => {
    const result = await api.deleteWordpressUser(siteId, userId);
    if (result) {
        console.log(result);
    }
});
program
    .command('wp-cli <siteId> <command>')
    .description('Run a WP-CLI command on a site')
    .action(async (siteId, command) => {
    const result = await api.runWpCliCommand(siteId, { command });
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('wp-password-reset <siteId> <userId>')
    .description('Reset WordPress user password')
    .action(async (siteId, userId) => {
    const result = await api.resetUserPassword(siteId, userId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-password-reset <siteId>')
    .description('Reset site-level WordPress password')
    .action(async (siteId) => {
    const result = await api.resetSitePassword(siteId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-phpmyadmin <siteId>')
    .description('Get phpMyAdmin URL for a site')
    .action(async (siteId) => {
    const result = await api.getPhpMyAdminUrl(siteId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-wp-version <siteId>')
    .description('Get WordPress version for a site')
    .action(async (siteId) => {
    const result = await api.getWordpressVersion(siteId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-wp-update <siteId> <version>')
    .description('Update WordPress version for a site')
    .action(async (siteId, version) => {
    const result = await api.updateWordpressVersion(siteId, version);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-login <siteId>')
    .description('Get One Press Login URL for a site')
    .action(async (siteId) => {
    const result = await api.onePressLogin(siteId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-bash <siteId> <command>')
    .description('Run a bash command on a site')
    .action(async (siteId, command) => {
    const result = await api.runBashCommand(siteId, command);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
// 
// DNS
// 
program
    .command('dns-zones <siteId>')
    .description('Get all DNS zones for a site')
    .action(async (siteId) => {
    const zones = await api.getDnsZones(siteId);
    if (zones) {
        console.log(zones);
    }
});
program
    .command('create-dns-zone <siteId> <zoneName>')
    .description('Create a DNS zone for a site')
    .action(async (siteId, zoneName) => {
    const zone = await api.createDnsZone(siteId, { name: zoneName });
    if (zone) {
        console.log(zone);
    }
});
program
    .command('dns-zone <siteId> <zoneId>')
    .description('Get a specific DNS zone')
    .action(async (siteId, zoneId) => {
    const zone = await api.getDnsZone(siteId, zoneId);
    if (zone) {
        console.log(zone);
    }
});
program
    .command('delete-dns-zone <siteId> <zoneId>')
    .description('Delete a DNS zone')
    .action(async (siteId, zoneId) => {
    const result = await api.deleteDnsZone(siteId, zoneId);
    if (result) {
        console.log(result);
    }
});
program
    .command('dns-records <siteId> <zoneId>')
    .description('Get all DNS records for a zone')
    .action(async (siteId, zoneId) => {
    const records = await api.getDnsRecords(siteId, zoneId);
    if (records) {
        console.log(records);
    }
});
program
    .command('create-dns-record <siteId> <zoneId>')
    .description('Create a DNS record for a zone')
    .option('--type <type>', 'Record type')
    .option('--name <name>', 'Record name')
    .option('--content <content>', 'Record content')
    .option('--ttl <ttl>', 'Record TTL')
    .action(async (siteId, zoneId, options) => {
    const record = await api.createDnsRecord(siteId, zoneId, { type: options.type, name: options.name, content: options.content, ttl: options.ttl });
    if (record) {
        console.log(record);
    }
});
program
    .command('dns-record <siteId> <zoneId> <recordId>')
    .description('Get a specific DNS record')
    .action(async (siteId, zoneId, recordId) => {
    const record = await api.getDnsRecord(siteId, zoneId, recordId);
    if (record) {
        console.log(record);
    }
});
program
    .command('update-dns-record <siteId> <zoneId> <recordId>')
    .description('Update a DNS record')
    .option('--type <type>', 'Record type')
    .option('--name <name>', 'Record name')
    .option('--content <content>', 'Record content')
    .option('--ttl <ttl>', 'Record TTL')
    .action(async (siteId, zoneId, recordId, options) => {
    const record = await api.updateDnsRecord(siteId, zoneId, recordId, { type: options.type, name: options.name, content: options.content, ttl: options.ttl });
    if (record) {
        console.log(record);
    }
});
program
    .command('delete-dns-record <siteId> <zoneId> <recordId>')
    .description('Delete a DNS record')
    .action(async (siteId, zoneId, recordId) => {
    const result = await api.deleteDnsRecord(siteId, zoneId, recordId);
    if (result) {
        console.log(result);
    }
});
// 
// Webhooks
// 
program
    .command('webhooks <siteId>')
    .description('Get all webhooks for a site')
    .action(async (siteId) => {
    const webhooks = await api.getWebhooks(siteId);
    if (webhooks) {
        console.log(webhooks);
    }
});
program
    .command('create-webhook <siteId> <url> <event>')
    .description('Create a webhook for a site')
    .action(async (siteId, url, event) => {
    const webhook = await api.createWebhook(siteId, { url, event });
    if (webhook) {
        console.log(webhook);
    }
});
program
    .command('webhook <siteId> <webhookId>')
    .description('Get a specific webhook')
    .action(async (siteId, webhookId) => {
    const webhook = await api.getWebhook(siteId, webhookId);
    if (webhook) {
        console.log(webhook);
    }
});
program
    .command('update-webhook <siteId> <webhookId>')
    .description('Update a webhook')
    .option('--url <url>', 'Webhook URL')
    .option('--event <event>', 'Webhook event')
    .action(async (siteId, webhookId, options) => {
    const webhook = await api.updateWebhook(siteId, webhookId, { url: options.url, event: options.event });
    if (webhook) {
        console.log(webhook);
    }
});
program
    .command('delete-webhook <siteId> <webhookId>')
    .description('Delete a webhook')
    .action(async (siteId, webhookId) => {
    const result = await api.deleteWebhook(siteId, webhookId);
    if (result) {
        console.log(result);
    }
});
program
    .command('site-logs-php <siteId>')
    .description('Get PHP logs for a site')
    .action(async (siteId) => {
    const result = await api.getPhpLogs(siteId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-logs-server <siteId>')
    .description('Get server logs for a site')
    .action(async (siteId) => {
    const result = await api.getServerLogs(siteId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-logs-activity <siteId>')
    .description('Get site activity logs')
    .action(async (siteId) => {
    const result = await api.getActivityLogs(siteId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-stats <siteId>')
    .description('Get statistics for a site')
    .action(async (siteId) => {
    const result = await api.getSiteStats(siteId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-metrics <siteId>')
    .description('Get performance metrics for a site')
    .action(async (siteId) => {
    const result = await api.getSiteMetrics(siteId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-security-alerts <siteId>')
    .description('Get security alerts for a site')
    .action(async (siteId) => {
    const result = await api.getSecurityAlerts(siteId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-firewall-rules <siteId>')
    .description('Get egress firewall rules for a site')
    .action(async (siteId) => {
    const result = await api.getFirewallRules(siteId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-firewall-rule-create <siteId>')
    .description('Create an egress firewall rule')
    .option('--protocol <protocol>', 'Protocol (tcp, udp)')
    .option('--port <port>', 'Destionation port')
    .option('--address <address>', 'Destination IP address/CIDR')
    .action(async (siteId, options) => {
    const result = await api.createFirewallRule(siteId, options);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-firewall-rule-delete <siteId> <ruleId>')
    .description('Delete an egress firewall rule')
    .action(async (siteId, ruleId) => {
    const result = await api.deleteFirewallRule(siteId, ruleId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-apm <siteId>')
    .description('Get APM status for a site')
    .action(async (siteId) => {
    const result = await api.getSiteApm(siteId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-cron <siteId>')
    .description('Get cron jobs for a site')
    .action(async (siteId) => {
    const result = await api.getSiteCronJobs(siteId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-usage-limits <siteId>')
    .description('Get usage limits for a site')
    .action(async (siteId) => {
    const result = await api.getSiteUsageLimits(siteId);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program
    .command('site-usage-limits-update <siteId>')
    .description('Update usage limits for a site')
    .option('--db <size>', 'Database size limit (MB/GB)')
    .option('--fs <size>', 'Filesystem size limit (MB/GB)')
    .action(async (siteId, options) => {
    const result = await api.setSiteUsageLimits(siteId, options);
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
});
program.parse(process.argv);
