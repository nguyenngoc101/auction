var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    bcrypt = require('bcrypt'),
    moment = require('moment'),
    utils = require('../utils'),
    Schema = mongoose.Schema,
    UserSchema,
    SALT_WORK_FACTOR = 10,
    oAuthTypes;

mongoose.Promise = require('bluebird');

oAuthTypes = [
  'facebook',
  'twitter',
  'google'
];

/**
 * User Schema
 */

UserSchema = new Schema({
  _id: {type: String, default: uuid.v1},
  username: {type: String, default: ''},
  email: {type: String, default: ''},
  last_name: {type: String, default: ''},
  first_name: {type: String, default: ''},
  avatar_url: {type: String},
  genre: {type: String},
  birthday: {type: String},
  phone: {type: String},
  address: {type: String},
  provider: {type: String, default: ''}, // 'local', 'facebook', 'twitter', 'google'
  access_token: {type: String, default: ''},
  social_account_id: {type: String, default: ''},
  password: {type: String},
  created_at: {type: Date, default: Date.now},
  modified_at: {type: Date}
});

UserSchema.index({_id: 1}, {unique: true});

/**
 * Pre-save hook
 */

// Save password encrypted by bcrpt
UserSchema.pre('save', function (next) {
  var self = this;

  // Only hash the password if it has been modified (or is new)
  if (!self.isModified('password')) {
    return next();
  }

  // Generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    // Hash the password along with our new salt
    bcrypt.hash(self.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      // Override the cleartext password with the hashed one
      self.password = hash;
      next();
    });
  });
});

/**
 * Instance Methods
 */

UserSchema.methods = {
};

/**
 * Static Methods
 */

UserSchema.statics = {
};

/**
 * Exports User model
 */

module.exports = mongoose.model('User', UserSchema);
