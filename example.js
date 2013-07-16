
/**
 * Module dependencies.
 */

var model = require('model')
  , schemaValidate = require('schema-validate');

var User = model('user')
  .use(schemaValidate())
  .attr('name', {
    type: 'string', required: true
  })
  .attr('key', {
    type: 'array',
    required: true,
    items: {
      type: 'object',
      properties: {
        value: { type: 'string', required: true }
      }
    }
  });
var user = new User({ name: 'Edward', key: [{ value: 234 }] });
user.validate();
console.log(user.isValid());
console.log(user.errors);
