# Examples

## Basic Usage
```Javascript
const Templater = require('toki-templater');

Templater().then( (hydratedConfig) => {
    console.log('hydrated config', hydratedConfig);
});
```

### Passing in our own object

```Javascript
const Templater = require('toki-templater');

Templater({
    name: '{{=it.getName.output.name}}'
}).then( (hydratedConfig) => {
    console.log(hydratedConfig)
});
```

### Passing in our own validator

```Javascript
const Joi = require('joi');
const Templater = require('toki-templater');

const schema = {
    name: Joi.string().length(3)
};

Templater({
    name: '{{=it.getName.output.name}}'
}, schema).then( (hydratedConfig) => {
    console.log(hydratedConfig)
}).catch( (e) => {
    console.log('Oops! Name not long enough!');
});
```

### Passing in our own context

```Javascript
const Joi = require('joi');
const Templater = require('toki-templater');

const schema = {
    name: Joi.string().length(3)
};

Templater(
    {
        name: '{{=it.name}}'
    },
    null,
    {
        context: {
            name: 'Bob'
        }
    }
).then( (hydratedConfig) => {
    console.log(hydratedConfig)
}).catch( (e) => {
    console.log('Oops! Name not long enough!');
});
```
