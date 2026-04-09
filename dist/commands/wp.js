import * as api from '../api.js';
import { handleAction } from '../utils.js';
export const registerWordpressCommands = (program) => {
    program
        .command('wordpress-users <siteId>')
        .description('Get all WordPress users for a site')
        .action((siteId) => handleAction(() => api.getWordpressUsers(siteId)));
    program
        .command('create-wordpress-user <siteId> <username> <email>')
        .description('Create a new WordPress user on a site')
        .action((siteId, username, email) => handleAction(() => api.createWordpressUser(siteId, { username, email })));
    program
        .command('delete-wordpress-user <siteId> <userId>')
        .description('Delete a WordPress user from a site')
        .action((siteId, userId) => handleAction(() => api.deleteWordpressUser(siteId, userId)));
    program
        .command('wp-cli <siteId> <command>')
        .description('Run a WP-CLI command on a site')
        .action((siteId, command) => handleAction(() => api.runWpCliCommand(siteId, { command })));
    program
        .command('wp-password-reset <siteId> <userId>')
        .description('Reset WordPress user password')
        .action((siteId, userId) => handleAction(() => api.resetUserPassword(siteId, userId)));
    program
        .command('site-password-reset <siteId>')
        .description('Reset site-level WordPress password')
        .action((siteId) => handleAction(() => api.resetSitePassword(siteId)));
    program
        .command('site-phpmyadmin <siteId>')
        .description('Get phpMyAdmin URL for a site')
        .action((siteId) => handleAction(() => api.getPhpMyAdminUrl(siteId)));
    program
        .command('site-wp-version <siteId>')
        .description('Get WordPress version for a site')
        .action((siteId) => handleAction(() => api.getWordpressVersion(siteId)));
    program
        .command('site-wp-update <siteId> <version>')
        .description('Update WordPress version for a site')
        .action((siteId, version) => handleAction(() => api.updateWordpressVersion(siteId, version)));
    program
        .command('site-bash <siteId> <command>')
        .description('Run a bash command on a site')
        .action((siteId, command) => handleAction(() => api.runBashCommand(siteId, command)));
};
