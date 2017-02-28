'use strict';

const Dot = require('dot');

module.exports = function (source, schema, options = {}) {

    return new Promise( (resolve, reject) => {

        if (!source) {
            source = this.action;
        }

        const context = options.context || this.action.contexts;
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
