/**
 * Created by a.korotaev on 11.07.16.
 */
var User = Backbone.Model.extend ({
    idAttribute: 'user_id'
});

var UsersCollection = Backbone.Collection.extend ({
    model: User,
    url: 'https://livedemo.xsolla.com/summer-school-16/?offset=0&limit=10'
});

users = new UsersCollection;

users.add ({
    user_id: 1,
    user_name: '%USERNAME%'
});

var userView = Backbone.View.extend ({
    initialize: function () {
        // lets listen to model change and update ourselves
        this.listenTo (this.model, "change", this.render);
    },
    template: _.template ('<td class="user_id"><%- user_id %></td><td class="user_name"><%- user_name %></td>'),
    render: function () {
        this.$el.html (this.template (this.model.attributes));
        return this.$el;
    },
    tagName: 'tr'
});

var usersView = Backbone.View.extend ({
    initialize: function () {
        this.listenTo (this.model, 'add remove', this.render);
    },
    render: function () {
        this.$el.html ('');
        this.model.each (function (model) {
            var uv = new userView ({
                model: model
            });
            this.$el.append (uv.render ());
        }, this);
        return this.$el;
    },
    tagName: 'table'
});