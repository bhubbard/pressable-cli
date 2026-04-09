import * as api from '../api.js';
import { handleAction } from '../utils.js';
export const registerDnsCommands = (program) => {
    program
        .command('dns-zones <siteId>')
        .description('Get all DNS zones for a site')
        .action((siteId) => handleAction(() => api.getDnsZones(siteId)));
    program
        .command('create-dns-zone <siteId> <zoneName>')
        .description('Create a DNS zone for a site')
        .action((siteId, zoneName) => handleAction(() => api.createDnsZone(siteId, { name: zoneName })));
    program
        .command('dns-zone <siteId> <zoneId>')
        .description('Get a specific DNS zone')
        .action((siteId, zoneId) => handleAction(() => api.getDnsZone(siteId, zoneId)));
    program
        .command('delete-dns-zone <siteId> <zoneId>')
        .description('Delete a DNS zone')
        .action((siteId, zoneId) => handleAction(() => api.deleteDnsZone(siteId, zoneId)));
    program
        .command('dns-records <siteId> <zoneId>')
        .description('Get all DNS records for a zone')
        .action((siteId, zoneId) => handleAction(() => api.getDnsRecords(siteId, zoneId)));
    program
        .command('create-dns-record <siteId> <zoneId>')
        .description('Create a DNS record for a zone')
        .option('--type <type>', 'Record type')
        .option('--name <name>', 'Record name')
        .option('--content <content>', 'Record content')
        .option('--ttl <ttl>', 'Record TTL')
        .action((siteId, zoneId, options) => handleAction(() => api.createDnsRecord(siteId, zoneId, {
        type: options.type,
        name: options.name,
        content: options.content,
        ttl: options.ttl
    })));
    program
        .command('dns-record <siteId> <zoneId> <recordId>')
        .description('Get a specific DNS record')
        .action((siteId, zoneId, recordId) => handleAction(() => api.getDnsRecord(siteId, zoneId, recordId)));
    program
        .command('update-dns-record <siteId> <zoneId> <recordId>')
        .description('Update a DNS record')
        .option('--type <type>', 'Record type')
        .option('--name <name>', 'Record name')
        .option('--content <content>', 'Record content')
        .option('--ttl <ttl>', 'Record TTL')
        .action((siteId, zoneId, recordId, options) => handleAction(() => api.updateDnsRecord(siteId, zoneId, recordId, {
        type: options.type,
        name: options.name,
        content: options.content,
        ttl: options.ttl
    })));
    program
        .command('delete-dns-record <siteId> <zoneId> <recordId>')
        .description('Delete a DNS record')
        .action((siteId, zoneId, recordId) => handleAction(() => api.deleteDnsRecord(siteId, zoneId, recordId)));
};
export const registerWebhookCommands = (program) => {
    program
        .command('webhooks <siteId>')
        .description('Get all webhooks for a site')
        .action((siteId) => handleAction(() => api.getWebhooks(siteId)));
    program
        .command('create-webhook <siteId> <url> <event>')
        .description('Create a webhook for a site')
        .action((siteId, url, event) => handleAction(() => api.createWebhook(siteId, { url, event })));
    program
        .command('webhook <siteId> <webhookId>')
        .description('Get a specific webhook')
        .action((siteId, webhookId) => handleAction(() => api.getWebhook(siteId, webhookId)));
    program
        .command('update-webhook <siteId> <webhookId>')
        .description('Update a webhook')
        .option('--url <url>', 'Webhook URL')
        .option('--event <event>', 'Webhook event')
        .action((siteId, webhookId, options) => handleAction(() => api.updateWebhook(siteId, webhookId, { url: options.url, event: options.event })));
    program
        .command('delete-webhook <siteId> <webhookId>')
        .description('Delete a webhook')
        .action((siteId, webhookId) => handleAction(() => api.deleteWebhook(siteId, webhookId)));
};
