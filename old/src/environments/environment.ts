export const environment = {
    "auth":             "https://auth.bitid.co.za",
    "appId":            "000000000000000000000015",
    "drive":            "https://drive.bitid.co.za",
    "appName":          "Mapping",
    "alerting":         "https://alerting.dev.bitid.co.za",
    "telemetry":        "https://telemetry.bitid.co.za",
    "websocket":        "wss://ws.telemetry.bitid.co.za",
    "production":       false,
    "googleMapsApiKey": "AIzaSyAOoUrCyDCaCLuUV_6uBjMwmmCqNHHFmLs",
    "scopes": [
        {"url":"/users/get","role":4},
        {"url":"/users/update","role":4},
        
        {"url":"/drive/files/upload","role":4},

        {"url":"/alerting/alerts/historical","role":4},

        {"url":"/telemetry/devices/add","role":4},
        {"url":"/telemetry/devices/list","role":4},
        {"url":"/telemetry/devices/share","role":4},
        {"url":"/telemetry/devices/update","role":4},
        {"url":"/telemetry/devices/delete","role":4},
        {"url":"/telemetry/devices/quickadd","role":4},
        {"url":"/telemetry/devices/historical","role":4},
        {"url":"/telemetry/devices/unsubscribe","role":4},
        {"url":"/telemetry/devices/updatesubscribers","role":4},
        
        {"url":"/telemetry/zones/get","role":4},
        {"url":"/telemetry/zones/add","role":4},
        {"url":"/telemetry/zones/list","role":4},
        {"url":"/telemetry/zones/share","role":4},
        {"url":"/telemetry/zones/update","role":4},
        {"url":"/telemetry/zones/delete","role":4},
        {"url":"/telemetry/zones/unsubscribe","role":4},
        {"url":"/telemetry/zones/updatesubscribers","role":4},

        {"url":"/telemetry/locatracking/get","role":4},
        {"url":"/telemetry/locatracking/set","role":4},
        {"url":"/telemetry/locatracking/historical","role":4},
    ],
    "roles": [
        {
            "value":        1,
            "description":  "Read"
        },
        {
            "value":        2,
            "description":  "Write"
        },
        {
            "value":        3,
            "description":  "Read/Write"
        },
        {
            "value":        4,
            "description":  "Admin"
        },
        {
            "value":        5,
            "description":  "Owner"
        },
        {
            "value":        6,
            "description":  "System Admin"
        }
    ],
    "deviceTypes": [
        {
            "value":        "test",
            "description":  "Test Device"
        }
    ],
    "organizationOnly": [
        {
            "value":        0,
            "description":  "Anyone Can Share"
        },
        {
            "value":        1,
            "description":  "Organization Only"
        }
    ]
};