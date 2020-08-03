export interface Input {
    'analog'?: {
        'scaling'?: {
            'raw'?: {
                'low'?:  number;
                'high'?: number;
            };
            'scaled'?: {
                'low'?:  number;
                'high'?: number;
            };
            'type'?: string;
        };
        'key'?:      string;
        'units'?:    string;
        'offset'?:   number;
    };
    'digital'?: {
        'bit'?:  number;
        'low'?:  number;
        'high'?: number;
    };
    'type'?:        string;
    'value'?:       any;
    'hidden'?:      boolean;
    'inputId'?:     string;
    'priority'?:    boolean;
    'moduleId'?:    number;
    'description'?: string;
}