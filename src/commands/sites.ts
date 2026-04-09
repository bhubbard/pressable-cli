import { Command } from 'commander';
import * as api from '../api.js';
import { handleAction } from '../utils.js';

export const registerSiteCommands = (program: Command) => {
  program
    .command('sites')
    .description('List all sites')
    .option('--search <term>', 'Search sites by name')
    .option('--page <number>', 'Results page number')
    .option('--limit <number>', 'Results per page')
    .action((options) => handleAction(() => api.getSites(options), 'Fetching sites...'));

  program
    .command('account-actions')
    .description('Get detailed account activity actions')
    .action(() => handleAction(() => api.getAccountActions(), 'Fetching account actions...'));

  program
    .command('site <siteId>')
    .description('Get details of a specific site')
    .action((siteId) => handleAction(() => api.getSite(siteId), 'Fetching site details...'));

  program
    .command('create-site')
    .description('Create a new site')
    .option('-n, --name <name>', 'Site name')
    .action((options) => handleAction(() => api.createSite({ name: options.name }), 'Creating site...'));

  program
    .command('delete-site <siteId>')
    .description('Delete a site')
    .action((siteId) => handleAction(() => api.deleteSite(siteId)));

  program
    .command('site-validate <name>')
    .description('Validate a site name')
    .action((name) => handleAction(() => api.validateSiteName(name)));

  program
    .command('site-disable <siteId>')
    .description('Disable a site')
    .action((siteId) => handleAction(() => api.disableSite(siteId)));

  program
    .command('site-enable <siteId>')
    .description('Enable a site')
    .action((siteId) => handleAction(() => api.enableSite(siteId)));

  program
    .command('site-convert <siteId> <type>')
    .description('Convert site type (live, staging, sandbox)')
    .action((siteId, type) => handleAction(() => api.convertSite(siteId, type as any)));

  program
    .command('site-flush-cache <siteId>')
    .description('Flush object cache for a site')
    .action((siteId) => handleAction(() => api.flushObjectCache(siteId)));

  program
    .command('site-maintenance <siteId> <on_off>')
    .description('Toggle maintenance mode (on or off)')
    .action((siteId, on_off) => {
      const enabled = on_off.toLowerCase() === 'on';
      return handleAction(() => api.setMaintenanceMode(siteId, enabled));
    });

  program
    .command('site-multisite <siteId> <on_off>')
    .description('Toggle multisite support (on or off)')
    .action((siteId, on_off) => {
      const enabled = on_off.toLowerCase() === 'on';
      return handleAction(() => api.setMultisiteSupport(siteId, enabled));
    });

  program
    .command('site-favorite <siteId>')
    .description('Toggle favorite status for a site')
    .action((siteId) => handleAction(() => api.toggleFavoriteSite(siteId)));

  program
    .command('site-login <siteId>')
    .description('Get One Press Login URL for a site')
    .action((siteId) => handleAction(() => api.onePressLogin(siteId)));
};
