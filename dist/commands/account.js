import * as api from '../api.js';
import { handleAction } from '../utils.js';
export const registerAccountCommands = (program) => {
    program
        .command('account')
        .description('Get account details')
        .action(() => handleAction(() => api.getAccount()));
    program
        .command('account-update')
        .description('Update account details')
        .option('--php <version>', 'Set default PHP version')
        .option('--datacenter <id>', 'Set default datacenter ID')
        .action((options) => handleAction(() => api.updateAccount({
        php_version: options.php,
        datacenter_id: options.datacenter ? parseInt(options.datacenter) : undefined
    })));
    program
        .command('account-actions')
        .description('Get detailed account activity actions')
        .action(() => handleAction(() => api.getAccountActions()));
    program
        .command('account-addons')
        .description('Get account add-ons')
        .action(() => handleAction(() => api.getAccountAddons()));
    program
        .command('activity')
        .description('Get account activity')
        .action(() => handleAction(() => api.getAccountActivity()));
    program
        .command('datacenters')
        .description('Get all datacenters')
        .action(() => handleAction(() => api.getDatacenters()));
    program
        .command('php-versions')
        .description('Get all PHP versions')
        .action(() => handleAction(() => api.getPhpVersions()));
};
