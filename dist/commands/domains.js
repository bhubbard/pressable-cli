import * as api from '../api.js';
import { handleAction } from '../utils.js';
export const registerDomainCommands = (program) => {
    program
        .command('site-domains <siteId>')
        .description('Get all domains for a site')
        .action((siteId) => handleAction(() => api.getSiteDomains(siteId)));
    program
        .command('site-domain-add <siteId> <domain>')
        .description('Add a domain to a site')
        .action((siteId, domain) => handleAction(() => api.addSiteDomain(siteId, domain)));
    program
        .command('site-domain-delete <siteId> <domainId>')
        .description('Delete a domain from a site')
        .action((siteId, domainId) => handleAction(() => api.deleteSiteDomain(siteId, domainId)));
    program
        .command('site-domain-primary <siteId> <domainId>')
        .description('Set a domain as primary for a site')
        .action((siteId, domainId) => handleAction(() => api.setPrimaryDomain(siteId, domainId)));
};
export const registerSftpCommands = (program) => {
    program
        .command('site-sftp-users <siteId>')
        .description('Get all SFTP users for a site')
        .action((siteId) => handleAction(() => api.getSftpUsers(siteId)));
    program
        .command('site-sftp-reset <siteId> <username>')
        .description('Reset SFTP password for a user')
        .action((siteId, username) => handleAction(() => api.resetSftpPassword(siteId, username)));
};
