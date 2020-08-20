var Q           = require('q');
var cors        = require('cors');
var http        = require('http');
var express     = require('express');
var bodyParser  = require('body-parser');
var healthcheck = require('@bitid/health-check');

global.__base       = __dirname + '/';
global.__logger     = require('./lib/logger');
global.__settings   = require('./config.json');

try {
    var portal = {
        errorResponse: {
            "error": {
                "code":     401,
                "message":  "Invalid Credentials",
                "errors":[{
                    "code":         401,
                    "reason":       "Portal Error",
                    "message":      "Portal Error",
                    "location":    "portal",
                    "locationType": "portal"
                }]
            },
            "hiddenErrors":[]
        },

        api: (args) => {
            var deferred = Q.defer();

            try {
                var app = express();
                app.use(cors());
                app.use(bodyParser.urlencoded({
                    'limit':    '50mb',
                    'extended': true
                }));
                app.use(bodyParser.json({
                    "limit": '50mb'
                }));

                app.use('/', express.static(__dirname + '/app/dist/mapping'));
                app.get('/*', (req, res) => {
                    res.sendFile(__dirname + '/app/dist/mapping/index.html');
                });

                app.use('/health-check', healthcheck);
                __logger.info('Loaded: ./health-check')

                var server = http.createServer(app);
                server.listen(args.settings.port);

                deferred.resolve(args);
            } catch(err) {
                deferred.reject(err.message);
            };
            
            return deferred.promise;
        },

        init: (args) => {
            portal.logger(args)
            .then(portal.api, null)
            .then(args => {
                console.log('Webserver Running on port: ', args.settings.port);
            }, err => {
                console.log('Error Initializing: ', err);
            });
        },

        logger: (args) => {
            var deferred = Q.defer();
            
            __logger.init();
            deferred.resolve(args);
            
            return deferred.promise;
        }
    };

    portal.init({
        'settings': __settings
    });
} catch(error) {
    console.log('The following error has occurred: ', error.message);
};