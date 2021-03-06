var assert = require('assert');
const util = require('../application/util');

let request;

describe('Util', function() {
    beforeEach(function() {
        request = {
            'protocol': 'https',
            'host': 'ec2-10-0-0-1.compute-1.amazonaws.com'
        };

    });

    describe('Build Origin URI', function() {

        it('Accessing file', function() {
            request.uri = '/index.html';
            request.querystring = '';
            const uri = util.buildCustomOriginURI(request);
            const expectedUri = `${request.protocol}://${request.host}${request.uri}`;
            assert.equal(uri, expectedUri);
        });

        it('Accessing file with querystring', function() {
            request.uri = '/style.css';
            request.querystring = 'ver=1.0.0';
            const uri = util.buildCustomOriginURI(request);
            const expectedUri = `${request.protocol}://${request.host}${request.uri}?${request.querystring}`;
            assert.equal(uri, expectedUri);
        });

    });

    describe('Build Cache Filename', function() {
        const rootAccessFileName = '_ROOT';
        const queryStringSymbol = '#';

        it('Accessing file', function() {
            request.uri = '/index.html';
            request.querystring = '';

            const filename = util.buildCacheFilename(request, rootAccessFileName, queryStringSymbol);
            const expectedFilename = request.uri.substr(1);
            assert(filename, expectedFilename);
        });
        
        it('Accessing file with querystring', function() {
            request.uri = '/style.css';
            request.querystring = 'ver=1.0.0';

            const filename = util.buildCacheFilename(request, rootAccessFileName, queryStringSymbol);
            const expectedFilename = `${request.uri.substr(1)}${queryStringSymbol}${request.querystring}`;
            assert(filename, expectedFilename);
        });

        it('Accessing root directory', function() {
            request.uri = '/';
            request.querystring = '';

            const filename = util.buildCacheFilename(request, rootAccessFileName, queryStringSymbol);
            const expectedFilename = rootAccessFileName;
            assert(filename, expectedFilename);
        });

        it('Accessing root directory with querystring', function() {
            request.uri = '/style.css';
            request.querystring = 'ver=1.0.0';

            const filename = util.buildCacheFilename(request, rootAccessFileName, queryStringSymbol);
            const expectedFilename = `${rootAccessFileName}${queryStringSymbol}${request.querystring}`;
            assert(filename, expectedFilename);
        });        
    });
});
