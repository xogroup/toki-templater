'use strict';

const Dot = require('dot');
const Joi = require('joi');

module.exports = function (source, schema, options = {}) {

    return new Promise( (resolve, reject) => {

        if (!source) {
            source = this.config || {};
        }

        let context = null;
        if (options.context) {
            context = options.context;
        }
        else if (this && this.contexts) {
            context = this.contexts;
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

            if (schema) {
                const validated = Joi.validate(output, schema);

                if (validated.error) {
                    return reject(validated.error);
                }
            }
        }

        return resolve(output);
    });
};
