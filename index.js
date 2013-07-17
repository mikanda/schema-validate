
/**
 * Module dependencies.
 */

var JSV = require('JSV').JSV
  , each = require('each')
  , bind = require('bind');

/**
 * Module exports.
 */

module.exports = SchemaValidate;

/**
 * Initialize new validator.
 */

function SchemaValidate() {

  // make this callbable as function

  if (!(this instanceof SchemaValidate)) return new SchemaValidate();
  var self = this;
  this.env = JSV.createEnvironment();

  // return real validator function

  return function(Model){
    Model.validate(bind(self, self.validate, Model));
  };
}

/**
 * Validator function called with the model class as context.
 *
 * @param {Model} Model the class
 * @param {Object} model the instance
 *
 * @api private
 */

SchemaValidate.prototype.validate = function(Model, model){
  var env = this.env;

  // check each attribute with the associated schema

  each(Model.attrs, function(attr, schema){
    var value = model[attr]()
      , report;
    report = env.validate(value, schema);
    registerErrors(model, attr, report);
  });
};

/**
 * Registers the errors included in the report as model errors.
 *
 * @param {Model} model the model instance
 * @param {String} attr the attribute the errors refer to
 * @param {Report} report the jsv report
 *
 * @api private
 */

function registerErrors(model, attr, report) {
  each(report.errors, function(error){

    // register the error

    model.error(attr, error);
  });
}
