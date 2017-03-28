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
    name: '{{getName.output.name}}'
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
    name: '{{getName.output.name}}'
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
        name: '{{name}}'
    },
    null,
    {
        hydrationContext: {
            name: 'Bob'
        }
    }
).then( (hydratedConfig) => {
    console.log(hydratedConfig)
}).catch( (e) => {
    console.log('Oops! Name not long enough!');
});
```

### Interpolated string

```Javascript
const Templater = require('toki-templater');

Templater(
    '/route/{{document.id}}/example',
    null,
    {
        hydrationContext: {
            document: {
                id: 'GUID'
            }
        }
    }
).then( (hydratedConfig) => {
    console.log(hydratedConfig);
    // '/route/GUID/example'
});
```
