'use strict';

const Joi = require('joi');
const expect = require('code').expect;   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;

const Templater = require('../src/implementation');

describe('Templater', () => {

    it('should be a function', (done) => {

        expect(Templater).to.be.a.function();
        done();
    });

    it('should return a string', () => {

        return Templater('foo')
        .then( (result) => {

            expect(result).to.equal('foo');
        });
    });

    it('should return an object', () => {

        return Templater({ foo: 'bar' })
        .then( (result) => {

            expect(result).to.equal({ foo: 'bar' });
        });
    });

    it('should fill out an object template', () => {

        return Templater({ foo: '{{=it.bob}}' }, null, { context: {
            bob: 'bar'
        } })
        .then( (result) => {

            expect(result).to.equal({ foo: 'bar' });
        });
    });

    it('should default to the local context', () => {

        const localContext = {
            config: { foo: '{{=it.bob}}' },
            contexts: {
                bob: 'bar'
            }
        };

        return Templater.bind(localContext)()
        .then( (result) => {

            expect(result).to.equal({ foo: 'bar' });
        });
    });

    it('should default to the local context even with no config', () => {

        const localContext = {
            contexts: {
                bob: 'bar'
            }
        };

        return Templater.bind(localContext)()
        .then( (result) => {

            expect(result).to.equal({});
        });
    });

    it('should fill out a multi-level object template', () => {

        return Templater({ foo: '{{=it.foo.bob}}' }, null, { context: {
            foo: {
                bob: 'bar'
            }
        } })
        .then( (result) => {

            expect(result).to.equal({ foo: 'bar' });
        });
    });

    it('should handle a schema', () => {

        return Templater({ foo: '{{=it.foo.bob}}' }, {
            foo: Joi.string()
        }, { context: {
            foo: {
                bob: 'bar'
            }
        } })
        .then( (result) => {

            expect(result).to.equal({ foo: 'bar' });
        });
    });

    it('should reject when a schema fails', () => {

        return Templater({ foo: '{{=it.foo.bob}}' }, {
            bob: Joi.string()
        }, { context: {
            foo: {
                bob: 'bar'
            }
        } })
        .catch( (e) => {

            expect(e).to.be.instanceof(Error);
        });
    });

});
