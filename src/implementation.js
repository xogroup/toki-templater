'use strict';

const Dot = require('dot');

module.exports = function (source, schema, options = {}) {

    return new Promise( (resolve, reject) => {

        if (!source) {
            source = this.action || {};
        }

        let context = null;
        if (options.context) {
            context = options.context;
        }
        else if (this && this.action && this.action.contexts) {
            context = this.action.context;
        }
        else {
            context = {};
        }

        const sourceType = typeof source;

        if (sourceType === 'object') {
            source = JSON.stringify(source);
        }

        const template = Dot.template(source);
        let output = template(context);

        if (sourceType === 'object') {
            output = JSON.parse(output);
        }

        return resolve(output);
    });
};
