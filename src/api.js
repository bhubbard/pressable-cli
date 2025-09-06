const axios = require('axios');
const querystring = require('querystring');

const API_BASE_URL = 'https://my.pressable.com';

// 
// Authentication
// 

const getAccessToken = async () => {
    try {
        const data = querystring.stringify({
            client_id: process.env.PRESSABLE_API_CLIENT_ID,
            client_secret: process.env.PRESSABLE_API_CLIENT_SECRET,
            grant_type: 'client_credentials'
        });

        const response = await axios.post(`${API_BASE_URL}/auth/token`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error.response.data);
        return null;
    }
};

const makeRequest = async (endpoint, method = 'GET', data = {}) => {
    try {
        const accessToken = await getAccessToken();
        if (!accessToken) {
            return null;
        }

        const response = await axios({
            method,
            url: `${API_BASE_URL}/v1${endpoint}`,
            data,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response.data;
    } catch (error) {
        console.error(`Error making request to ${endpoint}:`, error.response.data);
        return null;
    }
};

// 
// Account
// 

const getAccount = () => makeRequest('/account');
const getAccountActivity = () => makeRequest('/account/activity');
const getDatacenters = () => makeRequest('/account/datacenters');
const getPhpVersions = () => makeRequest('/account/php-versions');

// 
// Sites
// 

const getSites = () => makeRequest('/sites');
const getSite = (siteId) => makeRequest(`/sites/${siteId}`);
const createSite = (data) => makeRequest('/sites', 'POST', data);
const deleteSite = (siteId) => makeRequest(`/sites/${siteId}`, 'DELETE');

// 
// Backups
// 

const createBackup = (siteId) => makeRequest(`/sites/${siteId}/backups`, 'POST');
const getBackups = (siteId) => makeRequest(`/sites/${siteId}/backups`);
const getBackup = (siteId, backupId) => makeRequest(`/sites/${siteId}/backups/${backupId}`);
const restoreBackup = (siteId, backupId) => makeRequest(`/sites/${siteId}/backups/${backupId}/restore`, 'POST');

// 
// Collaborators
// 

const getCollaborators = () => makeRequest('/collaborators');
const getCollaborator = (collaboratorId) => makeRequest(`/collaborators/${collaboratorId}`);
const addCollaborator = (siteId, data) => makeRequest(`/sites/${siteId}/collaborators`, 'POST', data);
const removeCollaborator = (collaboratorId) => makeRequest(`/collaborators/${collaboratorId}`, 'DELETE');

// 
// Edge Cache
// 

const getEdgeCacheStatus = (siteId) => makeRequest(`/sites/${siteId}/edge-cache`);
const purgeEdgeCache = (siteId) => makeRequest(`/sites/${siteId}/edge-cache/purge`, 'POST');

// 
// Plugins
// 

const getPlugins = (siteId) => makeRequest(`/sites/${siteId}/plugins`);
const updatePlugin = (siteId, data) => makeRequest(`/sites/${siteId}/plugins/update`, 'POST', data);

// 
// Must-Use Plugins
// 

const getMuPlugins = (siteId) => makeRequest(`/sites/${siteId}/mu-plugins`);
const createMuPlugin = (siteId, data) => makeRequest(`/sites/${siteId}/mu-plugins`, 'POST', data);
const deleteMuPlugin = (siteId, pluginId) => makeRequest(`/sites/${siteId}/mu-plugins/${pluginId}`, 'DELETE');

// 
// Themes
// 

const getThemes = (siteId) => makeRequest(`/sites/${siteId}/themes`);
const updateTheme = (siteId, data) => makeRequest(`/sites/${siteId}/themes/update`, 'POST', data);

// 
// WordPress
// 

const getWordpressUsers = (siteId) => makeRequest(`/sites/${siteId}/wordpress/users`);
const createWordpressUser = (siteId, data) => makeRequest(`/sites/${siteId}/wordpress/users`, 'POST', data);
const deleteWordpressUser = (siteId, userId) => makeRequest(`/sites/${siteId}/wordpress/users/${userId}`, 'DELETE');
const runWpCliCommand = (siteId, data) => makeRequest(`/sites/${siteId}/wordpress/wp-cli`, 'POST', data);

// 
// DNS
// 

const getDnsZones = (siteId) => makeRequest(`/sites/${siteId}/dns/zones`);
const createDnsZone = (siteId, data) => makeRequest(`/sites/${siteId}/dns/zones`, 'POST', data);
const getDnsZone = (siteId, zoneId) => makeRequest(`/sites/${siteId}/dns/zones/${zoneId}`);
const deleteDnsZone = (siteId, zoneId) => makeRequest(`/sites/${siteId}/dns/zones/${zoneId}`, 'DELETE');
const getDnsRecords = (siteId, zoneId) => makeRequest(`/sites/${siteId}/dns/zones/${zoneId}/records`);
const createDnsRecord = (siteId, zoneId, data) => makeRequest(`/sites/${siteId}/dns/zones/${zoneId}/records`, 'POST', data);
const getDnsRecord = (siteId, zoneId, recordId) => makeRequest(`/sites/${siteId}/dns/zones/${zoneId}/records/${recordId}`);
const updateDnsRecord = (siteId, zoneId, recordId, data) => makeRequest(`/sites/${siteId}/dns/zones/${zoneId}/records/${recordId}`, 'PUT', data);
const deleteDnsRecord = (siteId, zoneId, recordId) => makeRequest(`/sites/${siteId}/dns/zones/${zoneId}/records/${recordId}`, 'DELETE');

// 
// Webhooks
// 

const getWebhooks = (siteId) => makeRequest(`/sites/${siteId}/webhooks`);
const createWebhook = (siteId, data) => makeRequest(`/sites/${siteId}/webhooks`, 'POST', data);
const getWebhook = (siteId, webhookId) => makeRequest(`/sites/${siteId}/webhooks/${webhookId}`);
const updateWebhook = (siteId, webhookId, data) => makeRequest(`/sites/${siteId}/webhooks/${webhookId}`, 'PUT', data);
const deleteWebhook = (siteId, webhookId) => makeRequest(`/sites/${siteId}/webhooks/${webhookId}`, 'DELETE');

module.exports = {
    getAccessToken,
    makeRequest,
    getAccount,
    getAccountActivity,
    getDatacenters,
    getPhpVersions,
    getSites,
    getSite,
    createSite,
    deleteSite,
    createBackup,
    getBackups,
    getBackup,
    restoreBackup,
    getCollaborators,
    getCollaborator,
    addCollaborator,
    removeCollaborator,
    getEdgeCacheStatus,
    purgeEdgeCache,
    getPlugins,
    updatePlugin,
    getMuPlugins,
    createMuPlugin,
    deleteMuPlugin,
    getThemes,
    updateTheme,
    getWordpressUsers,
    createWordpressUser,
    deleteWordpressUser,
    runWpCliCommand,
    getDnsZones,
    createDnsZone,
    getDnsZone,
    deleteDnsZone,
    getDnsRecords,
    createDnsRecord,
    getDnsRecord,
    updateDnsRecord,
    deleteDnsRecord,
    getWebhooks,
    createWebhook,
    getWebhook,
    updateWebhook,
    deleteWebhook
};