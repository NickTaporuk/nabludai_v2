// Generated by CoffeeScript 1.10.0
(function() {
  var _sync;

  _sync = Backbone.sync();

  Backbone.sync = function(method, model, options) {
    options.beforeSend = function(xhr) {
      return xhr.setRequestHeader('X-Auth-Token_or_other_header', your_hash_key);
    };
    return _sync.call(this, method, model, options);
  };

}).call(this);
