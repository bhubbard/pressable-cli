import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
const CONFIG_FILE = path.join(os.homedir(), '.pressable.json');
export const loadConfig = () => {
    try {
        if (!fs.existsSync(CONFIG_FILE)) {
            return null;
        }
        const data = fs.readFileSync(CONFIG_FILE, 'utf8');
        return JSON.parse(data);
    }
    catch {
        return null;
    }
};
export const saveConfig = (config) => {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), { mode: 0o600 });
};
export const deleteConfig = () => {
    if (fs.existsSync(CONFIG_FILE)) {
        fs.unlinkSync(CONFIG_FILE);
    }
};
export const getCredentials = () => {
    // 1. Check environment variables first
    const envClientId = process.env.PRESSABLE_API_CLIENT_ID;
    const envClientSecret = process.env.PRESSABLE_API_CLIENT_SECRET;
    if (envClientId && envClientSecret) {
        return { clientId: envClientId, clientSecret: envClientSecret };
    }
    // 2. Check config file
    return loadConfig();
};
