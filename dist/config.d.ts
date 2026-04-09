export interface Config {
    clientId: string;
    clientSecret: string;
}
export declare const loadConfig: () => Config | null;
export declare const saveConfig: (config: Config) => void;
export declare const deleteConfig: () => void;
export declare const getCredentials: () => Config | null;
