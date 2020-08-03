export const environment = {
	"auth": "https://auth.bitid.co.za",
	"drive": "https://drive.bitid.co.za",
	"appId": "000000000000000000000015",
	"socket": "wss://ws.telemetry.bitid.co.za",
	"appName": "MAPPING (WEB APP)",
	"alerting": "https://alerting.dev.bitid.co.za",
	"telemetry": "https://telemetry.bitid.co.za",
	"production": true,
	"googleMapsApiKey": "AIzaSyAOoUrCyDCaCLuUV_6uBjMwmmCqNHHFmLs",
	"roles": [
		{ "value": 1, "title": "Read Only" },
		{ "value": 2, "title": "Write Only" },
		{ "value": 3, "title": "Read/Write" },
		{ "value": 4, "title": "Admin" },
		{ "value": 5, "title": "Owner" },
	],
	"scopes": [
		{ "url": "/users/get", "role": 4 },
		{ "url": "/users/update", "role": 4 },

		{ "url": "/drive/files/upload", "role": 4 },

		{ "url": "/alerting/alerts/historical", "role": 4 },

		{ "url": "/telemetry/zones/get", "role": 4 },
		{ "url": "/telemetry/zones/add", "role": 4 },
		{ "url": "/telemetry/zones/list", "role": 4 },
		{ "url": "/telemetry/zones/share", "role": 4 },
		{ "url": "/telemetry/zones/update", "role": 4 },
		{ "url": "/telemetry/zones/delete", "role": 4 },
		{ "url": "/telemetry/zones/unsubscribe", "role": 4 },
		{ "url": "/telemetry/zones/updatesubscribers", "role": 4 },

		{ "url": "/telemetry/devices/get", "role": 4 },
		{ "url": "/telemetry/devices/list", "role": 4 },
		{ "url": "/telemetry/devices/share", "role": 4 },
		{ "url": "/telemetry/devices/update", "role": 4 },
		{ "url": "/telemetry/devices/delete", "role": 4 },
		{ "url": "/telemetry/devices/quickadd", "role": 4 },
		{ "url": "/telemetry/devices/historical", "role": 4 },
		{ "url": "/telemetry/devices/unsubscribe", "role": 4 },
		{ "url": "/telemetry/devices/updatesubscriber", "role": 4 },
	]
};