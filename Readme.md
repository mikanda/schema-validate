
# schema-validate

  Validator to validate a model against a json schema.

## Installation

  Install with [component(1)](http://component.io):

    $ component install mikanda/schema-validate

## Usage

  ```js
  var model = require('model')
    , schemaValidate = require('schema-validate');

  var User = model('user')
    .use(schemaValidate())

    // define your attributes using json-schema

    .attr('name', {
      type: 'string',
      required: true
    })
    ...
    ;
  var user = new User({ ... });
  user.validate();

  // console.log(user.errors);
  ```

## API

### SchemaValidate()

  Initializes a new validator.

## License

  MIT
