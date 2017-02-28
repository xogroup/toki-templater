'use strict';

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

});
