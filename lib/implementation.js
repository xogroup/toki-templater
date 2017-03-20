'use strict';

const Hoek = require('hoek');
const Joi = require('joi');

const templater = (template, context) => {

    if (typeof template === 'string') {
        const match = template.match(/{{2}([\w.]+)(?=}{2})/);
        if (match) {
            return Hoek.reach(context, match[1]);
        }

        return template;
    }

    Object.keys(template).forEach((key) => {

        template[key] = templater(template[key], context);
    });

    return template;
};

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

        const output = templater(source, context);

        if (schema) {
            const validated = Joi.validate(output, schema);

            if (validated.error) {
                return reject(validated.error);
            }
        }

        return resolve(output);
    });
};
