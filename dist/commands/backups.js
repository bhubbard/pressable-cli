import * as api from '../api.js';
import { handleAction } from '../utils.js';
export const registerBackupCommands = (program) => {
    program
        .command('create-backup <siteId>')
        .description('Create a new backup')
        .action((siteId) => handleAction(() => api.createBackup(siteId)));
    program
        .command('backups <siteId>')
        .description('Get all backups for a site')
        .action((siteId) => handleAction(() => api.getBackups(siteId)));
    program
        .command('backup <siteId> <backupId>')
        .description('Get a specific backup')
        .action((siteId, backupId) => handleAction(() => api.getBackup(siteId, backupId)));
    program
        .command('restore-backup <siteId> <backupId>')
        .description('Restore a backup')
        .action((siteId, backupId) => handleAction(() => api.restoreBackup(siteId, backupId)));
    program
        .command('site-ondemand-backups <siteId>')
        .description('Get all on-demand backups for a site')
        .action((siteId) => handleAction(() => api.getOnDemandBackups(siteId)));
    program
        .command('site-ondemand-backup-create <siteId>')
        .description('Create an on-demand backup for a site')
        .action((siteId) => handleAction(() => api.createOnDemandBackup(siteId)));
    program
        .command('site-ondemand-backup-get <siteId> <backupId>')
        .description('Get a specific on-demand backup')
        .action((siteId, backupId) => handleAction(() => api.getOnDemandBackup(siteId, backupId)));
    program
        .command('site-ondemand-backup-download <siteId> <backupId>')
        .description('Download an on-demand backup')
        .action((siteId, backupId) => handleAction(() => api.downloadOnDemandBackup(siteId, backupId)));
    program
        .command('site-ondemand-backup-delete <siteId> <backupId>')
        .description('Delete an on-demand backup')
        .action((siteId, backupId) => handleAction(() => api.deleteOnDemandBackup(siteId, backupId)));
};
