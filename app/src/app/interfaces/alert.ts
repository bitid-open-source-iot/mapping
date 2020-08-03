export interface Alert {
    'push'?: {
        'enabled'?: boolean;
    };
    'zone'?: {
        'zoneId'?:  string;
        'trigger'?: string;
    };
    'email'?: {
        'enabled'?: boolean;
    };
    'slack'?: {
        'token'?:   string;
        'channel'?: string;
        'enabled'?: boolean;
    };
    'input'?: {
        'min'?:     number;
        'max'?:     number;
        'digital'?: number;
        'inputId'?: string;
        'trigger'?: string;
    };
    'trello'?: {
        'board'?:   string;
        'enabled'?: boolean;
    };
    'control'?: {
        'trigger'?:     string;
        'controlId'?:   string;
    };
    'webpush'?: {
        'enabled'?: boolean;
    };
    'connection'?: {
        'trigger'?: string;
    };
    'type'?:    string;
    'title'?:   string;
    'users'?:   string[];
    'alertId'?: string;
    'message'?: string;
}