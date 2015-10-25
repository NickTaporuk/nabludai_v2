#coffeescript
_sync = Backbone.sync
Backbone.sync = (method, model, options) ->
  options.beforeSend = (xhr) ->
    xhr.setRequestHeader('X-Auth-Token_or_other_header' , your_hash_key)
  #make sure your server accepts X-Auth-Token_or_other_header!!
  #calling the original sync function so we only overriding what we need
  _sync.call( this, method, model, options )