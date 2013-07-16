
/**
 * Module dependencies.
 */

var chai = require('chai')
  , SchemaValidate = require('schema-validate')
  , model = require('model')

  // symbol imports

  , should = chai.should();

/**
 * Tests.
 */

describe('SchemaValidate', function(){
  it('should validate the sample', function(){
    var User
      , user
      , error
      , message;
    User = model('user')
      .use(SchemaValidate())
      .attr('name', {
        type: 'string', required: true
      })
      .attr('key', {
        type: 'object',
        required: true,
        properties: {
          value: { type: 'string', required: true }
        }
      });
    user = new User({ name: 'Edward', key: {} });
    user.validate();
    user.errors.length.should.equal(1);
    error = user.errors[0];
    error.attr.should.equal('key.value');
    message = error.message;
    message.attribute.should.equal('required');
    message.details.should.equal(true);
    message.message.should.equal('Property is required');
  });
});
