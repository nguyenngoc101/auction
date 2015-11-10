var Promise = require('bluebird'),
    models = require('../models'),
    errors = require('../errors');

module.exports = {

  /**
   * Find a paginated set of users
   * @public
   * @param {{options}} options (optional)
   * Ex: options: {
   *  criteria: {name: 'user'},
   *  filter: {name: true, age: true}
   *  extra: {skip: 5, limit: 10, sort: {created_at: -1}}
   * }
   * @returns {Promise<Users>} Users Collection with Meta
   */
  get: function (options) {
    // Validate
    options = options || {};
    options.extra = options.extra || {};

    var criteria = options.criteria || {},
        filter = options.filter || {},
        sort = options.extra.sort || {},
        skip = options.extra.skip || 0,
        limit = options.extra.limit || null;

    return models.User.find(criteria, filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();
  },

  create: function (user, options) {
    models.User.findOne(user).then(function (result) {
      if (result) {
        return new errors.BadRequestError('User\'s email already existed');
      } else {
        return models.User.save(user);
      }
    }).catch(function (err) {
      Promise.reject(err);
    });
  },

  edit: function (user, options) {
  },

  show: function (options) {
  },

  delete: function (options) {
  }
};
