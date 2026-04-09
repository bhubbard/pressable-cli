import { getCredentials } from './config.js';

const API_BASE_URL = 'https://my.pressable.com';

export class PressableError extends Error {
  constructor(
    public message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'PressableError';
  }
}

interface TokenResponse {
  access_token: string;
}

export const getAccessToken = async (): Promise<string> => {
  const creds = getCredentials();

  if (!creds) {
    throw new PressableError(
      'Missing Pressable API credentials. Please set PRESSABLE_API_CLIENT_ID and PRESSABLE_API_CLIENT_SECRET, or run "pressable auth login".'
    );
  }

  const { clientId, clientSecret } = creds;

  try {
    const body = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials'
    });

    const response = await fetch(`${API_BASE_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body.toString()
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new PressableError('Failed to get access token', response.status, errorData);
    }

    const data = (await response.json()) as TokenResponse;
    return data.access_token;
  } catch (error: any) {
    if (error instanceof PressableError) throw error;
    throw new PressableError(`Error getting access token: ${error.message}`);
  }
};

export const makeRequest = async <T = any>(endpoint: string, method: string = 'GET', data: any = {}): Promise<T> => {
  const accessToken = await getAccessToken();

  const options: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  };

  if (method !== 'GET' && method !== 'HEAD' && Object.keys(data).length > 0) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/v1${endpoint}`, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new PressableError(`Request to ${endpoint} failed`, response.status, errorData);
    }

    return (await response.json()) as T;
  } catch (error: any) {
    if (error instanceof PressableError) throw error;
    throw new PressableError(`Error making request to ${endpoint}: ${error.message}`);
  }
};

//
// Account
//
export const getAccount = () => makeRequest('/account');
export const updateAccount = (data: { php_version?: string; datacenter_id?: number }) =>
  makeRequest('/account', 'PUT', data);
export const getAccountActivity = () => makeRequest('/account/activity');
export const getAccountActions = () => makeRequest('/activity/account-actions');
export const getDatacenters = () => makeRequest('/account/datacenters');
export const getPhpVersions = () => makeRequest('/account/php-versions');
export const getAccountAddons = () => makeRequest('/account/addons');

//
// Sites
//
export const getSites = (params?: any) => {
  let endpoint = '/sites';
  if (params) {
    const query = new URLSearchParams(params).toString();
    endpoint += `?${query}`;
  }
  return makeRequest(endpoint);
};
export const getSite = (siteId: string | number) => makeRequest(`/sites/${siteId}`);
export const createSite = (data: any) => makeRequest('/sites', 'POST', data);
export const deleteSite = (siteId: string | number) => makeRequest(`/sites/${siteId}`, 'DELETE');
export const validateSiteName = (name: string) => makeRequest('/sites/validate', 'POST', { name });
export const disableSite = (siteId: string | number) => makeRequest(`/sites/${siteId}/disable`, 'POST');
export const enableSite = (siteId: string | number) => makeRequest(`/sites/${siteId}/enable`, 'POST');
export const convertSite = (siteId: string | number, type: 'live' | 'staging' | 'sandbox') =>
  makeRequest(`/sites/${siteId}/convert`, 'POST', { type });
export const flushObjectCache = (siteId: string | number) => makeRequest(`/sites/${siteId}/object-cache`, 'DELETE');
export const setMaintenanceMode = (siteId: string | number, enabled: boolean) =>
  makeRequest(`/sites/${siteId}/maintenance-mode`, 'PUT', { enabled });
export const setMultisiteSupport = (siteId: string | number, enabled: boolean) =>
  makeRequest(`/sites/${siteId}/multisite-support`, 'PUT', { enabled });

//
// Domains
//
export const getSiteDomains = (siteId: string | number) => makeRequest(`/sites/${siteId}/domains`);
export const addSiteDomain = (siteId: string | number, domain: string) =>
  makeRequest(`/sites/${siteId}/domains`, 'POST', { domain });
export const deleteSiteDomain = (siteId: string | number, domainId: string | number) =>
  makeRequest(`/sites/${siteId}/domains/${domainId}`, 'DELETE');
export const setPrimaryDomain = (siteId: string | number, domainId: string | number) =>
  makeRequest(`/sites/${siteId}/domains/${domainId}/primary`, 'PUT');

//
// SFTP
//
export const getSftpUsers = (siteId: string | number) => makeRequest(`/sites/${siteId}/sftp-users`);
export const resetSftpPassword = (siteId: string | number, username: string) =>
  makeRequest(`/sites/${siteId}/sftp-users/password-reset`, 'POST', { username });

//
// Backups
//
export const createBackup = (siteId: string | number) => makeRequest(`/sites/${siteId}/backups`, 'POST');
export const getBackups = (siteId: string | number) => makeRequest(`/sites/${siteId}/backups`);
export const getBackup = (siteId: string | number, backupId: string | number) =>
  makeRequest(`/sites/${siteId}/backups/${backupId}`);
export const restoreBackup = (siteId: string | number, backupId: string | number) =>
  makeRequest(`/sites/${siteId}/backups/${backupId}/restore`, 'POST');

// On-Demand Backups
export const getOnDemandBackups = (siteId: string | number) => makeRequest(`/sites/${siteId}/ondemand-backups`);
export const createOnDemandBackup = (siteId: string | number) =>
  makeRequest(`/sites/${siteId}/ondemand-backups`, 'POST');
export const getOnDemandBackup = (siteId: string | number, backupId: string | number) =>
  makeRequest(`/sites/${siteId}/ondemand-backups/${backupId}`);
export const downloadOnDemandBackup = (siteId: string | number, backupId: string | number) =>
  makeRequest(`/sites/${siteId}/ondemand-backups/${backupId}/download`);
export const deleteOnDemandBackup = (siteId: string | number, backupId: string | number) =>
  makeRequest(`/sites/${siteId}/ondemand-backups/${backupId}`, 'DELETE');

//
// Collaborators
//
export const getCollaborators = () => makeRequest('/collaborators');
export const getCollaborator = (collaboratorId: string | number) => makeRequest(`/collaborators/${collaboratorId}`);
export const addCollaborator = (siteId: string | number, data: any) =>
  makeRequest(`/sites/${siteId}/collaborators`, 'POST', data);
export const removeCollaborator = (collaboratorId: string | number) =>
  makeRequest(`/collaborators/${collaboratorId}`, 'DELETE');
export const addCollaboratorsBatch = (siteId: string | number, emails: string[]) =>
  makeRequest(`/sites/${siteId}/collaborators/batch`, 'POST', { emails });
export const removeCollaboratorsBatch = (siteId: string | number, emails: string[]) =>
  makeRequest(`/sites/${siteId}/collaborators/batch/destroy`, 'POST', { emails });
export const getCollaboratorSitesByEmail = (email: string) =>
  makeRequest(`/collaborators/sites-by-email?email=${encodeURIComponent(email)}`);
export const toggleFavoriteSite = (siteId: string | number) => makeRequest(`/sites/${siteId}/favorite`, 'POST');

//
// Edge Cache
//
export const getEdgeCacheStatus = (siteId: string | number) => makeRequest(`/sites/${siteId}/edge-cache`);
export const purgeEdgeCache = (siteId: string | number) => makeRequest(`/sites/${siteId}/edge-cache/purge`, 'POST');

//
// Plugins
//
export const getPlugins = (siteId: string | number) => makeRequest(`/sites/${siteId}/plugins`);
export const updatePlugin = (siteId: string | number, data: any) =>
  makeRequest(`/sites/${siteId}/plugins/update`, 'POST', data);
export const activatePlugin = (siteId: string | number, plugin: string) =>
  makeRequest(`/sites/${siteId}/plugins/activate`, 'POST', { plugin });
export const deactivatePlugin = (siteId: string | number, plugin: string) =>
  makeRequest(`/sites/${siteId}/plugins/deactivate`, 'POST', { plugin });
export const installPlugin = (siteId: string | number, plugin: string) =>
  makeRequest(`/sites/${siteId}/plugins/install`, 'POST', { plugin });
export const deletePlugin = (siteId: string | number, plugin: string) =>
  makeRequest(`/sites/${siteId}/plugins/${plugin}`, 'DELETE');

//
// Must-Use Plugins
//
export const getMuPlugins = (siteId: string | number) => makeRequest(`/sites/${siteId}/mu-plugins`);
export const createMuPlugin = (siteId: string | number, data: any) =>
  makeRequest(`/sites/${siteId}/mu-plugins`, 'POST', data);
export const deleteMuPlugin = (siteId: string | number, pluginId: string | number) =>
  makeRequest(`/sites/${siteId}/mu-plugins/${pluginId}`, 'DELETE');

//
// Themes
//
export const getThemes = (siteId: string | number) => makeRequest(`/sites/${siteId}/themes`);
export const updateTheme = (siteId: string | number, data: any) =>
  makeRequest(`/sites/${siteId}/themes/update`, 'POST', data);
export const activateTheme = (siteId: string | number, theme: string) =>
  makeRequest(`/sites/${siteId}/themes/activate`, 'POST', { theme });
export const installTheme = (siteId: string | number, theme: string) =>
  makeRequest(`/sites/${siteId}/themes/install`, 'POST', { theme });
export const deleteTheme = (siteId: string | number, theme: string) =>
  makeRequest(`/sites/${siteId}/themes/${theme}`, 'DELETE');

//
// WordPress
//
export const getWordpressUsers = (siteId: string | number) => makeRequest(`/sites/${siteId}/wordpress/users`);
export const createWordpressUser = (siteId: string | number, data: any) =>
  makeRequest(`/sites/${siteId}/wordpress/users`, 'POST', data);
export const deleteWordpressUser = (siteId: string | number, userId: string | number) =>
  makeRequest(`/sites/${siteId}/wordpress/users/${userId}`, 'DELETE');
export const resetUserPassword = (siteId: string | number, userId: string | number) =>
  makeRequest(`/sites/${siteId}/wordpress/users/${userId}/password-reset`, 'POST');
export const resetSitePassword = (siteId: string | number) =>
  makeRequest(`/sites/${siteId}/wordpress/password-reset`, 'POST');
export const getPhpMyAdminUrl = (siteId: string | number) => makeRequest(`/sites/${siteId}/wordpress/phpmyadmin`);
export const getWordpressVersion = (siteId: string | number) => makeRequest(`/sites/${siteId}/wordpress/version`);
export const updateWordpressVersion = (siteId: string | number, version: string) =>
  makeRequest(`/sites/${siteId}/wordpress/version`, 'PUT', { version });
export const onePressLogin = (siteId: string | number) =>
  makeRequest(`/sites/${siteId}/wordpress/one-press-login`, 'POST');
export const runWpCliCommand = (siteId: string | number, data: any) =>
  makeRequest(`/sites/${siteId}/wordpress/wp-cli`, 'POST', data);
export const runBashCommand = (siteId: string | number, command: string) =>
  makeRequest(`/sites/${siteId}/bash`, 'POST', { command });

//
// Logs
//
export const getPhpLogs = (siteId: string | number) => makeRequest(`/sites/${siteId}/logs/php`);
export const getServerLogs = (siteId: string | number) => makeRequest(`/sites/${siteId}/logs/server`);
export const getActivityLogs = (siteId: string | number) => makeRequest(`/sites/${siteId}/logs/activity`);

//
// Statistics & Metrics
//
export const getSiteStats = (siteId: string | number) => makeRequest(`/sites/${siteId}/stats`);
export const getSiteMetrics = (siteId: string | number) => makeRequest(`/sites/${siteId}/metrics`);

//
// Security & Firewall
//
export const getSecurityAlerts = (siteId: string | number) => makeRequest(`/sites/${siteId}/security-alerts`);
export const getFirewallRules = (siteId: string | number) => makeRequest(`/sites/${siteId}/firewall-rules`);
export const createFirewallRule = (siteId: string | number, data: any) =>
  makeRequest(`/sites/${siteId}/firewall-rules`, 'POST', data);
export const deleteFirewallRule = (siteId: string | number, ruleId: string | number) =>
  makeRequest(`/sites/${siteId}/firewall-rules/${ruleId}`, 'DELETE');

//
// Utilities (APM, Cron, Limits)
//
export const getSiteApm = (siteId: string | number) => makeRequest(`/sites/${siteId}/apm`);
export const getSiteCronJobs = (siteId: string | number) => makeRequest(`/sites/${siteId}/cron-jobs`);
export const getSiteUsageLimits = (siteId: string | number) => makeRequest(`/sites/${siteId}/usage-limits`);
export const setSiteUsageLimits = (siteId: string | number, data: any) =>
  makeRequest(`/sites/${siteId}/usage-limits`, 'PUT', data);

//
// DNS
//
export const getDnsZones = (siteId: string | number) => makeRequest(`/sites/${siteId}/dns/zones`);
export const createDnsZone = (siteId: string | number, data: any) =>
  makeRequest(`/sites/${siteId}/dns/zones`, 'POST', data);
export const getDnsZone = (siteId: string | number, zoneId: string | number) =>
  makeRequest(`/sites/${siteId}/dns/zones/${zoneId}`);
export const deleteDnsZone = (siteId: string | number, zoneId: string | number) =>
  makeRequest(`/sites/${siteId}/dns/zones/${zoneId}`, 'DELETE');
export const getDnsRecords = (siteId: string | number, zoneId: string | number) =>
  makeRequest(`/sites/${siteId}/dns/zones/${zoneId}/records`);
export const createDnsRecord = (siteId: string | number, zoneId: string | number, data: any) =>
  makeRequest(`/sites/${siteId}/dns/zones/${zoneId}/records`, 'POST', data);
export const getDnsRecord = (siteId: string | number, zoneId: string | number, recordId: string | number) =>
  makeRequest(`/sites/${siteId}/dns/zones/${zoneId}/records/${recordId}`);
export const updateDnsRecord = (
  siteId: string | number,
  zoneId: string | number,
  recordId: string | number,
  data: any
) => makeRequest(`/sites/${siteId}/dns/zones/${zoneId}/records/${recordId}`, 'PUT', data);
export const deleteDnsRecord = (siteId: string | number, zoneId: string | number, recordId: string | number) =>
  makeRequest(`/sites/${siteId}/dns/zones/${zoneId}/records/${recordId}`, 'DELETE');

//
// Webhooks
//
export const getWebhooks = (siteId: string | number) => makeRequest(`/sites/${siteId}/webhooks`);
export const createWebhook = (siteId: string | number, data: any) =>
  makeRequest(`/sites/${siteId}/webhooks`, 'POST', data);
export const getWebhook = (siteId: string | number, webhookId: string | number) =>
  makeRequest(`/sites/${siteId}/webhooks/${webhookId}`);
export const updateWebhook = (siteId: string | number, webhookId: string | number, data: any) =>
  makeRequest(`/sites/${siteId}/webhooks/${webhookId}`, 'PUT', data);
export const deleteWebhook = (siteId: string | number, webhookId: string | number) =>
  makeRequest(`/sites/${siteId}/webhooks/${webhookId}`, 'DELETE');
