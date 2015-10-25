(function($){

    var ListView = Backbone.View.extend({
        el: $('body'), // attaches `this.el` to an existing element.

        initialize: function(){
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

            this.render(); // not all views are self-rendering. This one is.
        },

        render: function(){
            $(this.el).append("<ul> <li>hello world</li> </ul>");
        }
    });

    var listView = new ListView();
})(jQuery);

// part2
(function($){
    var ListView = Backbone.View.extend({
        el: $('body'), // el attaches to existing element

        events: {
            'click button#add': 'addItem'
        },
        initialize: function(){
            _.bindAll(this, 'render', 'addItem'); // every function that uses 'this' as the current object should be in here

            this.counter = 0; // total number of items added thus far
            this.render();
        },
        render: function(){
            $(this.el).append("<button id='add'>Add list item</button>");
            $(this.el).append("<ul></ul>");
        },
        addItem: function(){
            this.counter++;
            $('ul', this.el).append("<li>hello world"+this.counter+"</li>");
        }
    });

    var listView = new ListView();
})(jQuery);


//part3
(function($){

    var Item = Backbone.Model.extend({
        defaults: {
            part1: 'hello',
            part2: 'world'
        }
    });

    var List = Backbone.Collection.extend({
        model: Item
    });

    var ListView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click button#add': 'addItem'
        },

        initialize: function(){
            _.bindAll(this, 'render', 'addItem', 'appendItem'); // remember: every function that uses 'this' as the current object should be in here

            this.collection = new List();
            this.collection.bind('add', this.appendItem); // collection event binder

            this.counter = 0;
            this.render();
        },
        render: function(){

            var self = this;
            $(this.el).append("<button id='add'>Add list item</button>");
            $(this.el).append("<ul></ul>");
            _(this.collection.models).each(function(item){ // in case collection is not empty
                self.appendItem(item);
            }, this);
        },

        addItem: function(){
            this.counter++;
            var item = new Item();
            item.set({
                part2: item.get('part2') + this.counter // modify item defaults
            });
            this.collection.add(item); // add item to collection; view is updated via event 'add'
        },

        appendItem: function(item){
            $('ul', this.el).append("<li>"+item.get('part1')+" "+item.get('part2')+"</li>");
        }
    });

    var listView = new ListView();
})(jQuery);

//part 4
(function($){
    var Item = Backbone.Model.extend({
        defaults: {
            part1: 'hello',
            part2: 'world'
        }
    });

    var List = Backbone.Collection.extend({
        model: Item
    });
    var ItemView = Backbone.View.extend({
        tagName: 'li', // name of (orphan) root tag in this.el
        initialize: function(){
            _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
        },
        render: function(){
            $(this.el).html('<span>'+this.model.get('part1')+' '+this.model.get('part2')+'</span>');
            return this; // for chainable calls, like .render().el
        }
    });

    var ListView = Backbone.View.extend({
        el: $('body'), // el attaches to existing element
        events: {
            'click button#add': 'addItem'
        },
        initialize: function(){
            _.bindAll(this, 'render', 'addItem', 'appendItem'); // every function that uses 'this' as the current object should be in here

            this.collection = new List();
            this.collection.bind('add', this.appendItem); // collection event binder

            this.counter = 0;
            this.render();
        },
        render: function(){
            var self = this;
            $(this.el).append("<button id='add'>Add list item</button>");
            $(this.el).append("<ul></ul>");
            _(this.collection.models).each(function(item){ // in case collection is not empty
                self.appendItem(item);
            }, this);
        },
        addItem: function(){
            this.counter++;
            var item = new Item();
            item.set({
                part2: item.get('part2') + this.counter // modify item defaults
            });
            this.collection.add(item);
        },
        appendItem: function(item){
            var itemView = new ItemView({
                model: item
            });
            $('ul', this.el).append(itemView.render().el);
        }
    });

    var listView = new ListView();
})(jQuery);

//part5
(function($){
    Backbone.sync = function(method, model, success, error){
        success();
    }

    var Item = Backbone.Model.extend({
        defaults: {
            part1: 'hello',
            part2: 'world'
        }
    });

    var List = Backbone.Collection.extend({
        model: Item
    });

    var ItemView = Backbone.View.extend({
        tagName: 'li', // name of tag to be created
        events: {
            'click span.swap':  'swap',
            'click span.delete': 'remove'
        },
        initialize: function(){
            _.bindAll(this, 'render', 'unrender', 'swap', 'remove'); // every function that uses 'this' as the current object should be in here

            this.model.bind('change', this.render);
            this.model.bind('remove', this.unrender);
        },
        render: function(){
            $(this.el).html('<span style="color:black;">'+this.model.get('part1')+' '+this.model.get('part2')+'</span> &nbsp; &nbsp; <span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');
            return this; // for chainable calls, like .render().el
        },
        unrender: function(){
            $(this.el).remove();
        },
        swap: function(){
            var swapped = {
                part1: this.model.get('part2'),
                part2: this.model.get('part1')
            };
            this.model.set(swapped);
        },
        remove: function(){
            this.model.destroy();
        }
    });

    var ListView = Backbone.View.extend({
        el: $('body'), // el attaches to existing element
        events: {
            'click button#add': 'addItem'
        },
        initialize: function(){
            _.bindAll(this, 'render', 'addItem', 'appendItem'); // every function that uses 'this' as the current object should be in here

            this.collection = new List();
            this.collection.bind('add', this.appendItem); // collection event binder

            this.counter = 0;
            this.render();
        },
        render: function(){
            var self = this;
            $(this.el).append("<button id='add'>Add list item</button>");
            $(this.el).append("<ul></ul>");
            _(this.collection.models).each(function(item){ // in case collection is not empty
                self.appendItem(item);
            }, this);
        },
        addItem: function(){
            this.counter++;
            var item = new Item();
            item.set({
                part2: item.get('part2') + this.counter // modify item defaults
            });
            this.collection.add(item);
        },
        appendItem: function(item){
            var itemView = new ItemView({
                model: item
            });
            $('ul', this.el).append(itemView.render().el);
        }
    });

    var listView = new ListView();
})(jQuery);

//JWT
// Header
var oHeader = {alg: 'HS256', typ: 'JWT'};
// Payload
var oPayload = {};
var tNow = KJUR.jws.IntDate.get('now');
var tEnd = KJUR.jws.IntDate.get('now + 1day');
oPayload.iss = "http://foo.com";
oPayload.sub = "mailto:mike@foo.com";
oPayload.nbf = tNow;
oPayload.iat = tNow;
oPayload.exp = tEnd;
oPayload.jti = "id123456";
oPayload.aud = "http://foo.com/employee";
// Sign JWT, password=616161
var sHeader = JSON.stringify(oHeader);
var sPayload = JSON.stringify(oPayload);
var sJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, "616161");

//verification
var IntDate = KJUR.jws.IntDate;
var isValid = KJUR.jws.JWS.verifyJWT("eyT...", "616161",
    {alg: ['HS256'],
        verifyAt: IntDate.get('20150601000000Z')});

// OR
var IntDate = KJUR.jws.IntDate;
var isValid = KJUR.jws.JWS.verifyJWT("eyT...", "616161",
    {alg: ['HS256'],
        verifyAt: IntDate.get('20150601000000Z'),
        iss: ['http://foo.com', 'http://us.foo.com'],
        sub: ['mailto:mike@foo.com',
        'mailto:kate@foo.com'],
        aud: ['http://foo.com/employee',
        'http://foo.com/partner']});