'use strict';

const Joi = require('joi');
const expect = require('code').expect;   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;

const Templater = require('../lib/implementation');

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

    it('should return an interpolated string', () => {

        return Templater('foo {{bar}}', null, { hydrationContext: { bar: 'baz' } })
        .then( (result) => {

            expect(result).to.equal('foo baz');
        });
    });

    it('should return an interpolated string with a stringified object', () => {

        return Templater('foo {{bar}}', null, { hydrationContext: { bar: { nested: 'baz' } } })
        .then( (result) => {

            expect(result).to.equal('foo {"nested":"baz"}');
        });
    });

    it('should return an interpolated string with multiple templated values', () => {

        return Templater('/example/{{foo}}/{{bar}}/{{not.yet}}', null, { hydrationContext: { foo: 'dynamic', bar: 'route' } })
        .then( (result) => {

            expect(result).to.equal('/example/dynamic/route/{{not.yet}}');
        });
    });

    it('should fill out an object template', () => {

        return Templater({ foo: '{{bob}}' }, null, { hydrationContext: {
            bob: 'bar'
        } })
        .then( (result) => {

            expect(result).to.equal({ foo: 'bar' });
        });
    });

    it('should leave unfilled templates in place', () => {

        return Templater({ foo: '{{bob}}', bar: '{{baz}}' }, null, { hydrationContext: {
            bob: 'bar'
        } })
        .then( (result) => {

            expect(result).to.equal({ foo: 'bar', bar: '{{baz}}' });
        });
    });

    it('should default to the local context', () => {

        const localContext = {
            config: { foo: '{{bob}}' },
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

        return Templater({ foo: '{{foo.bob}}' }, null, { hydrationContext: {
            foo: {
                bob: 'bar'
            }
        } })
        .then( (result) => {

            expect(result).to.equal({ foo: 'bar' });
        });
    });

    it('should fill out an array template', () => {

        return Templater(['{{foo}}', '{{bar}}', '{{bob}}'], null, { hydrationContext: {
            foo: 'foo stuff',
            bar: {
                bar: 'stuff'
            },
            bob: ['b', 'o', 'b']
        } })
            .then( (result) => {

                expect(result).to.equal([
                    'foo stuff',
                    {
                        bar: 'stuff'
                    },
                    ['b', 'o', 'b']
                ]);
            });
    });

    it('should hydrate an array value', () => {

        return Templater({ foo: '{{foo}}' }, null, { hydrationContext: {
            foo: [
                {
                    bob: 'bar'
                }
            ]
        } })
            .then( (result) => {

                expect(result).to.equal({ foo: [{ bob: 'bar' }] });
            });
    });

    it('should fill an object blob', () => {

        return Templater({ foo: '{{foo}}' }, null, {
            hydrationContext: {
                foo: {
                    bob: 'bar'
                }
            }
        })
            .then((result) => {

                expect(result).to.equal({ foo: { bob: 'bar' } });
            });
    });

    it('should fill a mutli-level object blob', () => {

        return Templater({ foo: '{{foo}}' }, null, {
            hydrationContext: {
                foo: {
                    bob: 'bar',
                    baz: {
                        more: 'bar'
                    }
                }
            }
        })
            .then((result) => {

                expect(result).to.equal({ foo: { bob: 'bar', baz: { more: 'bar' } } });
            });
    });

    it('should handle a schema', () => {

        return Templater({ foo: '{{foo.bob}}' }, {
            foo: Joi.string()
        }, { hydrationContext: {
            foo: {
                bob: 'bar'
            }
        } })
        .then( (result) => {

            expect(result).to.equal({ foo: 'bar' });
        });
    });

    it('should handle a schema with options', () => {

        return Templater({ foo: '{{foo.bob}}', baz: 'please do not fail me' }, {
            foo: Joi.string()
        }, {
            hydrationContext: {
                foo: {
                    bob: 'bar'
                }
            },
            joiOptions      : {
                allowUnknown : true
            }
        })
        .then( (result) => {

            expect(result).to.equal({ foo: 'bar', baz: 'please do not fail me' });
        });
    });

    it('should reject when a schema fails', () => {

        return Templater({ foo: '{{foo.bob}}' }, {
            bob: Joi.string()
        }, { hydrationContext: {
            foo: {
                bob: 'bar'
            }
        } })
        .catch( (e) => {

            expect(e).to.be.instanceof(Error);
        });
    });

    it('should not throw uncaught errors when hydrationContext is not an object', () => {

        return Templater({ foo: '{{foo.bob}}' }, {
            foo: Joi.string()
        }, {
            hydrationContext: 200,
            joiOptions      : {
                allowUnknown : true
            }
        })
        .then( (result) => {

            expect(result).to.equal({ foo: '{{foo.bob}}' });
        });
    });
});
