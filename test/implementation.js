'use strict';

const expect = require('code').expect;   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;

const Foo = require('../src/implementation');

describe('Foo', () => {

    it('checks to make sure Foo is an object', (done) => {

        expect(Foo).to.be.a.object();
        done();
    });
});
