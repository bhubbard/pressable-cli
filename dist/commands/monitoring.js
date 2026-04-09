import * as api from '../api.js';
import { handleAction } from '../utils.js';
import fs from 'node:fs';
export const registerPluginThemeCommands = (program) => {
    // Plugins
    program
        .command('plugins <siteId>')
        .description('Get all plugins for a site')
        .action((siteId) => handleAction(() => api.getPlugins(siteId)));
    program
        .command('update-plugin <siteId> <plugin-slug>')
        .description('Update a plugin on a site')
        .action((siteId, pluginSlug) => handleAction(() => api.updatePlugin(siteId, { plugin: pluginSlug })));
    program
        .command('plugin-activate <siteId> <slug>')
        .description('Activate a plugin on a site')
        .action((siteId, slug) => handleAction(() => api.activatePlugin(siteId, slug)));
    program
        .command('plugin-deactivate <siteId> <slug>')
        .description('Deactivate a plugin on a site')
        .action((siteId, slug) => handleAction(() => api.deactivatePlugin(siteId, slug)));
    program
        .command('plugin-install <siteId> <slug>')
        .description('Install a plugin on a site')
        .action((siteId, slug) => handleAction(() => api.installPlugin(siteId, slug)));
    program
        .command('plugin-delete <siteId> <slug>')
        .description('Delete a plugin from a site')
        .action((siteId, slug) => handleAction(() => api.deletePlugin(siteId, slug)));
    // MU Plugins
    program
        .command('mu-plugins <siteId>')
        .description('Get all must-use plugins for a site')
        .action((siteId) => handleAction(() => api.getMuPlugins(siteId)));
    program
        .command('create-mu-plugin <siteId> <name> <code_path>')
        .description('Create a must-use plugin for a site')
        .action((siteId, name, code_path) => {
        const code = fs.readFileSync(code_path, 'utf8');
        return handleAction(() => api.createMuPlugin(siteId, { name, code }));
    });
    program
        .command('delete-mu-plugin <siteId> <pluginId>')
        .description('Delete a must-use plugin from a site')
        .action((siteId, pluginId) => handleAction(() => api.deleteMuPlugin(siteId, pluginId)));
    // Themes
    program
        .command('themes <siteId>')
        .description('Get all themes for a site')
        .action((siteId) => handleAction(() => api.getThemes(siteId)));
    program
        .command('update-theme <siteId> <theme-slug>')
        .description('Update a theme on a site')
        .action((siteId, themeSlug) => handleAction(() => api.updateTheme(siteId, { theme: themeSlug })));
    program
        .command('theme-activate <siteId> <slug>')
        .description('Activate a theme on a site')
        .action((siteId, slug) => handleAction(() => api.activateTheme(siteId, slug)));
    program
        .command('theme-install <siteId> <slug>')
        .description('Install a theme on a site')
        .action((siteId, slug) => handleAction(() => api.installTheme(siteId, slug)));
    program
        .command('theme-delete <siteId> <slug>')
        .description('Delete a theme from a site')
        .action((siteId, slug) => handleAction(() => api.deleteTheme(siteId, slug)));
};
export const registerMonitoringCommands = (program) => {
    program
        .command('site-logs-php <siteId>')
        .description('Get PHP logs for a site')
        .action((siteId) => handleAction(() => api.getPhpLogs(siteId)));
    program
        .command('site-logs-server <siteId>')
        .description('Get server logs for a site')
        .action((siteId) => handleAction(() => api.getServerLogs(siteId)));
    program
        .command('site-logs-activity <siteId>')
        .description('Get site activity logs')
        .action((siteId) => handleAction(() => api.getActivityLogs(siteId)));
    program
        .command('site-stats <siteId>')
        .description('Get statistics for a site')
        .action((siteId) => handleAction(() => api.getSiteStats(siteId)));
    program
        .command('site-metrics <siteId>')
        .description('Get performance metrics for a site')
        .action((siteId) => handleAction(() => api.getSiteMetrics(siteId)));
    program
        .command('site-security-alerts <siteId>')
        .description('Get security alerts for a site')
        .action((siteId) => handleAction(() => api.getSecurityAlerts(siteId)));
    program
        .command('site-firewall-rules <siteId>')
        .description('Get egress firewall rules for a site')
        .action((siteId) => handleAction(() => api.getFirewallRules(siteId)));
    program
        .command('site-firewall-rule-create <siteId>')
        .description('Create an egress firewall rule')
        .option('--protocol <protocol>', 'Protocol (tcp, udp)')
        .option('--port <port>', 'Destination port')
        .option('--address <address>', 'Destination IP address/CIDR')
        .action((siteId, options) => handleAction(() => api.createFirewallRule(siteId, options)));
    program
        .command('site-firewall-rule-delete <siteId> <ruleId>')
        .description('Delete an egress firewall rule')
        .action((siteId, ruleId) => handleAction(() => api.deleteFirewallRule(siteId, ruleId)));
    program
        .command('site-apm <siteId>')
        .description('Get APM status for a site')
        .action((siteId) => handleAction(() => api.getSiteApm(siteId)));
    program
        .command('site-cron <siteId>')
        .description('Get cron jobs for a site')
        .action((siteId) => handleAction(() => api.getSiteCronJobs(siteId)));
    program
        .command('site-usage-limits <siteId>')
        .description('Get usage limits for a site')
        .action((siteId) => handleAction(() => api.getSiteUsageLimits(siteId)));
    program
        .command('site-usage-limits-update <siteId>')
        .description('Update usage limits for a site')
        .option('--db <size>', 'Database size limit (MB/GB)')
        .option('--fs <size>', 'Filesystem size limit (MB/GB)')
        .action((siteId, options) => handleAction(() => api.setSiteUsageLimits(siteId, options)));
};
export const registerCollaboratorCommands = (program) => {
    program
        .command('collaborators')
        .description('Get all collaborators')
        .action(() => handleAction(() => api.getCollaborators()));
    program
        .command('collaborator <collaboratorId>')
        .description('Get a specific collaborator')
        .action((collaboratorId) => handleAction(() => api.getCollaborator(collaboratorId)));
    program
        .command('add-collaborator <siteId> <email>')
        .description('Add a collaborator to a site')
        .action((siteId, email) => handleAction(() => api.addCollaborator(siteId, { email })));
    program
        .command('remove-collaborator <collaboratorId>')
        .description('Remove a collaborator')
        .action((collaboratorId) => handleAction(() => api.removeCollaborator(collaboratorId)));
    program
        .command('collaborators-batch-add <siteId> <emails...>')
        .description('Add multiple collaborators to a site')
        .action((siteId, emails) => handleAction(() => api.addCollaboratorsBatch(siteId, emails)));
    program
        .command('collaborators-batch-remove <siteId> <emails...>')
        .description('Remove multiple collaborators from a site')
        .action((siteId, emails) => handleAction(() => api.removeCollaboratorsBatch(siteId, emails)));
    program
        .command('collaborators-by-email <email>')
        .description('Get all sites a collaborator has access to by email')
        .action((email) => handleAction(() => api.getCollaboratorSitesByEmail(email)));
};
