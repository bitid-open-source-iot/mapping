var Q           = require('q');
var chai        = require('chai');
var fetch       = require('node-fetch');
var assert      = require('chai').assert;
var expect      = require('chai').expect;
var should      = require('chai').should();
var config      = require('./config.json');
var chaiSubset  = require('chai-subset');
chai.use(chaiSubset);

describe('Health Check', function() {
    it('/', function(done) {
        this.timeout(5000);

        tools.api.healthcheck()
        .then((result) => {
            try {
                result.should.have.property('uptime');
                result.should.have.property('memory');
                result.should.have.property('database');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });
});

var tools = {
    api: {
        healthcheck: async () => {
            var deferred = Q.defer();
            
            const response = await tools.put('/health-check', {});

            deferred.resolve(response);

            return deferred.promise;
        }
    },
    put: async (url, payload) => {
        var deferred = Q.defer();

        payload.header = {
            'email': config.email, 
            'appId': config.appId
        };

        payload = JSON.stringify(payload);

        const response = await fetch(config.mapping + url, {
            'headers': {
                'Accept':           '*/*',
                'Referer':          '127.0.0.1',
                'Content-Type':     'application/json; charset=utf-8',
                'Authorization':    JSON.stringify(config.token),
                'Content-Length':   payload.length
            },
            'body':   payload,
            'method': 'PUT'
        });
        
        const result = await response.json();

        deferred.resolve(result);
        
        return deferred.promise;
    }
};