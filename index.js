#!/usr/bin/env node

require('dotenv').config();
const { program } = require('commander');
const api = require('./src/api');

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
            console.log(account);
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
    .action(async () => {
        const sites = await api.getSites();
        if (sites) {
            console.log(sites);
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

// 
// Backups
// 

program
    .command('create-backup <siteId>')
    .description('Create a new backup')
    .action(async (siteId) => {
        const backup = await api.createBackup(siteId);
        if (backup) {
            console.log(backup);
        }
    });

program
    .command('backups <siteId>')
    .description('Get all backups for a site')
    .action(async (siteId) => {
        const backups = await api.getBackups(siteId);
        if (backups) {
            console.log(backups);
        }
    });

program
    .command('backup <siteId> <backupId>')
    .description('Get a specific backup')
    .action(async (siteId, backupId) => {
        const backup = await api.getBackup(siteId, backupId);
        if (backup) {
            console.log(backup);
        }
    });

program
    .command('restore-backup <siteId> <backupId>')
    .description('Restore a backup')
    .action(async (siteId, backupId) => {
        const result = await api.restoreBackup(siteId, backupId);
        if (result) {
            console.log(result);
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
            console.log(result);
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
            console.log(result);
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
        const fs = require('fs');
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
            console.log(result);
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
            console.log(result);
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

program.parse(process.argv);