#!/usr/bin/env node
import 'dotenv/config.js';
import { program } from 'commander';
import process from 'node:process';
// Command Registrations
import { registerAccountCommands } from './commands/account.js';
import { registerAuthCommands } from './commands/auth.js';
import { registerSiteCommands } from './commands/sites.js';
import { registerDomainCommands, registerSftpCommands } from './commands/domains.js';
import { registerBackupCommands } from './commands/backups.js';
import { registerWordpressCommands } from './commands/wp.js';
import { registerPluginThemeCommands, registerMonitoringCommands, registerCollaboratorCommands } from './commands/monitoring.js';
import { registerDnsCommands, registerWebhookCommands } from './commands/dns.js';
program
    .version('1.0.0')
    .description('A CLI to interact with the Pressable API');
// Register all command modules
registerAuthCommands(program);
registerAccountCommands(program);
registerSiteCommands(program);
registerDomainCommands(program);
registerSftpCommands(program);
registerBackupCommands(program);
registerWordpressCommands(program);
registerPluginThemeCommands(program);
registerMonitoringCommands(program);
registerCollaboratorCommands(program);
registerDnsCommands(program);
registerWebhookCommands(program);
// Handle unknown commands
program.on('command:*', () => {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
});
program.parse(process.argv);
