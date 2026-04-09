import { Command } from 'commander';
import { handleAction } from '../utils.js';
import { saveConfig, loadConfig, deleteConfig } from '../config.js';
import * as api from '../api.js';

export const registerAuthCommands = (program: Command) => {
  program
    .command('auth-login')
    .description('Login to Pressable API and save credentials')
    .requiredOption('--client-id <id>', 'Pressable API Client ID')
    .requiredOption('--client-secret <secret>', 'Pressable API Client Secret')
    .action((options) =>
      handleAction(async () => {
        // Verify credentials by trying to get an access token
        // Temporarily set env vars for verification
        const originalId = process.env.PRESSABLE_API_CLIENT_ID;
        const originalSecret = process.env.PRESSABLE_API_CLIENT_SECRET;

        process.env.PRESSABLE_API_CLIENT_ID = options.clientId;
        process.env.PRESSABLE_API_CLIENT_SECRET = options.clientSecret;

        try {
          await api.getAccessToken();
          saveConfig({ clientId: options.clientId, clientSecret: options.clientSecret });
          return { message: 'Successfully logged in and saved credentials to ~/.pressable.json' };
        } finally {
          process.env.PRESSABLE_API_CLIENT_ID = originalId;
          process.env.PRESSABLE_API_CLIENT_SECRET = originalSecret;
        }
      })
    );

  program
    .command('auth-logout')
    .description('Logout and delete saved credentials')
    .action(() =>
      handleAction(async () => {
        deleteConfig();
        return { message: 'Successfully logged out and deleted credentials from ~/.pressable.json' };
      })
    );

  program
    .command('auth-status')
    .description('Check authentication status')
    .action(() =>
      handleAction(async () => {
        const config = loadConfig();
        if (config) {
          return {
            authenticated: true,
            source: 'config file (~/.pressable.json)',
            clientId: config.clientId.substring(0, 4) + '...'
          };
        }

        if (process.env.PRESSABLE_API_CLIENT_ID) {
          return {
            authenticated: true,
            source: 'environment variables',
            clientId: process.env.PRESSABLE_API_CLIENT_ID.substring(0, 4) + '...'
          };
        }

        return { authenticated: false };
      })
    );
};
