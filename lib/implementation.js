'use strict';

const Hoek = require('hoek');
const Joi = require('joi');

const templater = (template, hydrationContext) => {

    if (typeof template === 'string') {
        const match = template.match(/{{2}([\w.]+)(?=}{2})/);
        if (match) {
            const reachedValue = Hoek.reach(hydrationContext, match[1]);

            if (reachedValue !== undefined) {
                return reachedValue;
            }
        }

        return template;
    }

    Object.keys(template).forEach((key) => {

        template[key] = templater(template[key], hydrationContext);
    });

    return template;
};

module.exports = function (source, schema, options = {}) {

    return new Promise( (resolve, reject) => {

        if (!source) {
            source = this.config || {};
        }

        let hydrationContext = null;
        if (options.hydrationContext) {
            hydrationContext = options.hydrationContext;
        }
        else if (this && this.contexts) {
            hydrationContext = this.contexts;
        }
        else {
            hydrationContext = {};
        }

        const output = templater(source, hydrationContext);

        if (schema) {
            const validated = Joi.validate(output, schema, options.joiOptions);

            if (validated.error) {
                return reject(validated.error);
            }
        }

        return resolve(output);
    });
};
