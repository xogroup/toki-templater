'use strict';

const Hoek = require('hoek');
const Joi = require('joi');

const templater = (template, hydrationContext) => {

    if (typeof template === 'string') {
        const fullTemplatePattern = /^{{2}([\w.]+)(?=}{2}$)/;
        const interpolatedTemplatePattern = /{{2}([\w.]+)(}{2})/g;
        const fullTemplateMatch = template.match(fullTemplatePattern);

        if (fullTemplateMatch) {
            const reachedValue = Hoek.reach(hydrationContext, fullTemplateMatch[1]);

            if (reachedValue !== undefined) {
                return reachedValue;
            }
        }
        else {
            let result = '';

            template.split(interpolatedTemplatePattern).forEach((templateChunk, index, templatePieces) => {

                if (templateChunk === '}}') {
                    return;
                }
                else if (templatePieces[index + 1] === '}}') {
                    const reachedValue = Hoek.reach(hydrationContext, templateChunk);

                    if (reachedValue !== undefined) {
                        if (typeof reachedValue === 'object') {
                            result += JSON.stringify(reachedValue);
                        }
                        else {
                            result += reachedValue;
                        }
                    }
                    else {
                        result += '{{' + templateChunk + '}}';
                    }
                }
                else {
                    result += templateChunk;
                }
            });

            return result;
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
