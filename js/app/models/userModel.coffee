###

###
UserModel = Backbone.Model.extend
  url:'/api/registration'
  defaults:
    name: ''
    password: ''
    confirm: ''
    validate: (attrs, options)->
      if attrs.end < attrs.start
        console.log "can't end before it starts"

###

###
UserView =  Backbone.View.extend

  el: $ '#registration'

  model: UserModel
  initialize: ->
    _.bindAll @,'onFormSubmit'
    @model.bind('change:name', @changeTitle);

  onFormSubmit: (e)->
    console.log 'submit',@,'--',e,'--el:',@el
    formData =[]
    formData[frm.name]=frm.value for frm,i in @el when frm.type isnt 'submit'

    console.log 'model:',@model
    console.log 'formData:',formData
    false

  changeTitle: (e)->
    console.log 'submit',@,'--',e
    false


  events: 'submit': 'onFormSubmit'

userView = new UserView

