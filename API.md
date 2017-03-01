# API Reference <!-- This title stays the same probably -->

<!-- Auto Table of Contents. Use doctoc: https://github.com/thlorenz/doctoc -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

In order to start using the Templater, you only need to import it.<!-- Description on how to setup and initialize your thing -->

## Methods <!-- Methods too -->

### Templater(template, schema, options)

Require in the module and call it with the template you want hydrated, an optional Joi schema, and any options. Returns a promise.

#### template

The template to be hydrated. Can be passed in as a JSON string or an option. If not provided, `this.config` will be used.

#### schema

An optional joi schema. Validation will be done against the hydrated object. This is only used if you pass in an object.

#### options

##### context

Used to override the default context from `this.contexts`
