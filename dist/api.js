import process from 'node:process';
const API_BASE_URL = 'https://my.pressable.com';
export const getAccessToken = async () => {
    try {
        const body = new URLSearchParams({
            client_id: process.env.PRESSABLE_API_CLIENT_ID || '',
            client_secret: process.env.PRESSABLE_API_CLIENT_SECRET || '',
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
            console.error('Error getting access token:', errorData);
            return null;
        }
        const data = (await response.json());
        return data.access_token;
    }
    catch (error) {
        console.error('Error getting access token:', error.message);
        return null;
    }
};
export const makeRequest = async (endpoint, method = 'GET', data = {}) => {
    try {
        const accessToken = await getAccessToken();
        if (!accessToken) {
            return null;
        }
        const options = {
            method,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        if (method !== 'GET' && method !== 'HEAD' && Object.keys(data).length > 0) {
            options.body = JSON.stringify(data);
        }
        const response = await fetch(`${API_BASE_URL}/v1${endpoint}`, options);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error(`Error making request to ${endpoint}:`, errorData);
            return null;
        }
        // Return raw JSON as per user request
        return await response.json();
    }
    catch (error) {
        console.error(`Error making request to ${endpoint}:`, error.message);
        return null;
    }
};
// 
// Account
// 
export const getAccount = () => makeRequest('/account');
export const updateAccount = (data) => makeRequest('/account', 'PUT', data);
export const getAccountActivity = () => makeRequest('/account/activity');
export const getAccountActions = () => makeRequest('/activity/account-actions');
export const getDatacenters = () => makeRequest('/account/datacenters');
export const getPhpVersions = () => makeRequest('/account/php-versions');
export const getAccountAddons = () => makeRequest('/account/addons');
// 
// Sites
// 
export const getSites = (params) => {
    let endpoint = '/sites';
    if (params) {
        const query = new URLSearchParams(params).toString();
        endpoint += `?${query}`;
    }
    return makeRequest(endpoint);
};
export const getSite = (siteId) => makeRequest(`/sites/${siteId}`);
export const createSite = (data) => makeRequest('/sites', 'POST', data);
export const deleteSite = (siteId) => makeRequest(`/sites/${siteId}`, 'DELETE');
export const validateSiteName = (name) => makeRequest('/sites/validate', 'POST', { name });
export const disableSite = (siteId) => makeRequest(`/sites/${siteId}/disable`, 'POST');
export const enableSite = (siteId) => makeRequest(`/sites/${siteId}/enable`, 'POST');
export const convertSite = (siteId, type) => makeRequest(`/sites/${siteId}/convert`, 'POST', { type });
export const flushObjectCache = (siteId) => makeRequest(`/sites/${siteId}/object-cache`, 'DELETE');
export const setMaintenanceMode = (siteId, enabled) => makeRequest(`/sites/${siteId}/maintenance-mode`, 'PUT', { enabled });
export const setMultisiteSupport = (siteId, enabled) => makeRequest(`/sites/${siteId}/multisite-support`, 'PUT', { enabled });
// 
// Domains
// 
export const getSiteDomains = (siteId) => makeRequest(`/sites/${siteId}/domains`);
export const addSiteDomain = (siteId, domain) => makeRequest(`/sites/${siteId}/domains`, 'POST', { domain });
export const deleteSiteDomain = (siteId, domainId) => makeRequest(`/sites/${siteId}/domains/${domainId}`, 'DELETE');
export const setPrimaryDomain = (siteId, domainId) => makeRequest(`/sites/${siteId}/domains/${domainId}/primary`, 'PUT');
// 
// SFTP
// 
export const getSftpUsers = (siteId) => makeRequest(`/sites/${siteId}/sftp-users`);
export const resetSftpPassword = (siteId, username) => makeRequest(`/sites/${siteId}/sftp-users/password-reset`, 'POST', { username });
// 
// Backups
// 
export const createBackup = (siteId) => makeRequest(`/sites/${siteId}/backups`, 'POST');
export const getBackups = (siteId) => makeRequest(`/sites/${siteId}/backups`);
export const getBackup = (siteId, backupId) => makeRequest(`/sites/${siteId}/backups/${backupId}`);
export const restoreBackup = (siteId, backupId) => makeRequest(`/sites/${siteId}/backups/${backupId}/restore`, 'POST');
// On-Demand Backups
export const getOnDemandBackups = (siteId) => makeRequest(`/sites/${siteId}/ondemand-backups`);
export const createOnDemandBackup = (siteId) => makeRequest(`/sites/${siteId}/ondemand-backups`, 'POST');
export const getOnDemandBackup = (siteId, backupId) => makeRequest(`/sites/${siteId}/ondemand-backups/${backupId}`);
export const downloadOnDemandBackup = (siteId, backupId) => makeRequest(`/sites/${siteId}/ondemand-backups/${backupId}/download`);
export const deleteOnDemandBackup = (siteId, backupId) => makeRequest(`/sites/${siteId}/ondemand-backups/${backupId}`, 'DELETE');
// 
// Collaborators
// 
export const getCollaborators = () => makeRequest('/collaborators');
export const getCollaborator = (collaboratorId) => makeRequest(`/collaborators/${collaboratorId}`);
export const addCollaborator = (siteId, data) => makeRequest(`/sites/${siteId}/collaborators`, 'POST', data);
export const removeCollaborator = (collaboratorId) => makeRequest(`/collaborators/${collaboratorId}`, 'DELETE');
export const addCollaboratorsBatch = (siteId, emails) => makeRequest(`/sites/${siteId}/collaborators/batch`, 'POST', { emails });
export const removeCollaboratorsBatch = (siteId, emails) => makeRequest(`/sites/${siteId}/collaborators/batch/destroy`, 'POST', { emails });
export const getCollaboratorSitesByEmail = (email) => makeRequest(`/collaborators/sites-by-email?email=${encodeURIComponent(email)}`);
export const toggleFavoriteSite = (siteId) => makeRequest(`/sites/${siteId}/favorite`, 'POST');
// 
// Edge Cache
// 
export const getEdgeCacheStatus = (siteId) => makeRequest(`/sites/${siteId}/edge-cache`);
export const purgeEdgeCache = (siteId) => makeRequest(`/sites/${siteId}/edge-cache/purge`, 'POST');
// 
// Plugins
// 
export const getPlugins = (siteId) => makeRequest(`/sites/${siteId}/plugins`);
export const updatePlugin = (siteId, data) => makeRequest(`/sites/${siteId}/plugins/update`, 'POST', data);
export const activatePlugin = (siteId, plugin) => makeRequest(`/sites/${siteId}/plugins/activate`, 'POST', { plugin });
export const deactivatePlugin = (siteId, plugin) => makeRequest(`/sites/${siteId}/plugins/deactivate`, 'POST', { plugin });
export const installPlugin = (siteId, plugin) => makeRequest(`/sites/${siteId}/plugins/install`, 'POST', { plugin });
export const deletePlugin = (siteId, plugin) => makeRequest(`/sites/${siteId}/plugins/${plugin}`, 'DELETE');
// 
// Must-Use Plugins
// 
export const getMuPlugins = (siteId) => makeRequest(`/sites/${siteId}/mu-plugins`);
export const createMuPlugin = (siteId, data) => makeRequest(`/sites/${siteId}/mu-plugins`, 'POST', data);
export const deleteMuPlugin = (siteId, pluginId) => makeRequest(`/sites/${siteId}/mu-plugins/${pluginId}`, 'DELETE');
// 
// Themes
// 
export const getThemes = (siteId) => makeRequest(`/sites/${siteId}/themes`);
export const updateTheme = (siteId, data) => makeRequest(`/sites/${siteId}/themes/update`, 'POST', data);
export const activateTheme = (siteId, theme) => makeRequest(`/sites/${siteId}/themes/activate`, 'POST', { theme });
export const installTheme = (siteId, theme) => makeRequest(`/sites/${siteId}/themes/install`, 'POST', { theme });
export const deleteTheme = (siteId, theme) => makeRequest(`/sites/${siteId}/themes/${theme}`, 'DELETE');
// 
// WordPress
// 
export const getWordpressUsers = (siteId) => makeRequest(`/sites/${siteId}/wordpress/users`);
export const createWordpressUser = (siteId, data) => makeRequest(`/sites/${siteId}/wordpress/users`, 'POST', data);
export const deleteWordpressUser = (siteId, userId) => makeRequest(`/sites/${siteId}/wordpress/users/${userId}`, 'DELETE');
export const resetUserPassword = (siteId, userId) => makeRequest(`/sites/${siteId}/wordpress/users/${userId}/password-reset`, 'POST');
export const resetSitePassword = (siteId) => makeRequest(`/sites/${siteId}/wordpress/password-reset`, 'POST');
export const getPhpMyAdminUrl = (siteId) => makeRequest(`/sites/${siteId}/wordpress/phpmyadmin`);
export const getWordpressVersion = (siteId) => makeRequest(`/sites/${siteId}/wordpress/version`);
export const updateWordpressVersion = (siteId, version) => makeRequest(`/sites/${siteId}/wordpress/version`, 'PUT', { version });
export const onePressLogin = (siteId) => makeRequest(`/sites/${siteId}/wordpress/one-press-login`, 'POST');
export const runWpCliCommand = (siteId, data) => makeRequest(`/sites/${siteId}/wordpress/wp-cli`, 'POST', data);
export const runBashCommand = (siteId, command) => makeRequest(`/sites/${siteId}/bash`, 'POST', { command });
// 
// Logs
// 
export const getPhpLogs = (siteId) => makeRequest(`/sites/${siteId}/logs/php`);
export const getServerLogs = (siteId) => makeRequest(`/sites/${siteId}/logs/server`);
export const getActivityLogs = (siteId) => makeRequest(`/sites/${siteId}/logs/activity`);
// 
// Statistics & Metrics
// 
export const getSiteStats = (siteId) => makeRequest(`/sites/${siteId}/stats`);
export const getSiteMetrics = (siteId) => makeRequest(`/sites/${siteId}/metrics`);
// 
// Security & Firewall
// 
export const getSecurityAlerts = (siteId) => makeRequest(`/sites/${siteId}/security-alerts`);
export const getFirewallRules = (siteId) => makeRequest(`/sites/${siteId}/firewall-rules`);
export const createFirewallRule = (siteId, data) => makeRequest(`/sites/${siteId}/firewall-rules`, 'POST', data);
export const deleteFirewallRule = (siteId, ruleId) => makeRequest(`/sites/${siteId}/firewall-rules/${ruleId}`, 'DELETE');
// 
// Utilities (APM, Cron, Limits)
// 
export const getSiteApm = (siteId) => makeRequest(`/sites/${siteId}/apm`);
export const getSiteCronJobs = (siteId) => makeRequest(`/sites/${siteId}/cron-jobs`);
export const getSiteUsageLimits = (siteId) => makeRequest(`/sites/${siteId}/usage-limits`);
export const setSiteUsageLimits = (siteId, data) => makeRequest(`/sites/${siteId}/usage-limits`, 'PUT', data);
// 
// DNS
// 
export const getDnsZones = (siteId) => makeRequest(`/sites/${siteId}/dns/zones`);
export const createDnsZone = (siteId, data) => makeRequest(`/sites/${siteId}/dns/zones`, 'POST', data);
export const getDnsZone = (siteId, zoneId) => makeRequest(`/sites/${siteId}/dns/zones/${zoneId}`);
export const deleteDnsZone = (siteId, zoneId) => makeRequest(`/sites/${siteId}/dns/zones/${zoneId}`, 'DELETE');
export const getDnsRecords = (siteId, zoneId) => makeRequest(`/sites/${siteId}/dns/zones/${zoneId}/records`);
export const createDnsRecord = (siteId, zoneId, data) => makeRequest(`/sites/${siteId}/dns/zones/${zoneId}/records`, 'POST', data);
export const getDnsRecord = (siteId, zoneId, recordId) => makeRequest(`/sites/${siteId}/dns/zones/${zoneId}/records/${recordId}`);
export const updateDnsRecord = (siteId, zoneId, recordId, data) => makeRequest(`/sites/${siteId}/dns/zones/${zoneId}/records/${recordId}`, 'PUT', data);
export const deleteDnsRecord = (siteId, zoneId, recordId) => makeRequest(`/sites/${siteId}/dns/zones/${zoneId}/records/${recordId}`, 'DELETE');
// 
// Webhooks
// 
export const getWebhooks = (siteId) => makeRequest(`/sites/${siteId}/webhooks`);
export const createWebhook = (siteId, data) => makeRequest(`/sites/${siteId}/webhooks`, 'POST', data);
export const getWebhook = (siteId, webhookId) => makeRequest(`/sites/${siteId}/webhooks/${webhookId}`);
export const updateWebhook = (siteId, webhookId, data) => makeRequest(`/sites/${siteId}/webhooks/${webhookId}`, 'PUT', data);
export const deleteWebhook = (siteId, webhookId) => makeRequest(`/sites/${siteId}/webhooks/${webhookId}`, 'DELETE');
