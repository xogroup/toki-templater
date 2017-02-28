# Examples

## Hooking up Foo

```javascript
const Foo = require('foo');
let foo = new Foo();

foo.bar();
```

## Calling the hello method

```javascript
const Foo = require('foo');
let foo = new Foo();

foo.name = 'World';
return foo.hello();
```
