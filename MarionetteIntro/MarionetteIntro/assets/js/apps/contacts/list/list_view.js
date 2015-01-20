// List View

// "If the sub-module exists, it will be used instead of creating a new one"
// This allows us to have our controller and views defined in separate files,
// while keeping them within the same Marionette sub-module.

// Module definition: (can be given a callback that takes 6 arguments)
// 1. The module itself (the name we're going to use within the callback to refer to the module we're defining).
// 2. the application object that module was called from.
// 3. Backbone
// 4. Backbone.Marionette
// 5. jQuery
// 6. Underscore
// 7. (any custom arguments).

ContactManager.module("ContactsApp.List", function (List, ContactManager, Backbone, Marionette, $, _) {
    // VIEWS 
    // We need to define a view to display. Views are javascript objects that take care of "reacting to things that happen"
    // (clicks, keeping track of a model, etc.) Since we are not refreshing the page (SPA) nor interacting with the server
    // users interactions with the the view are handled here.
    // The view's responsibility in Marionette is to monitor the models it's displaying, and if those models change, the view
    // renders itself again (using the same template). (React to changes in the environment).
    List.Contact = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#contact-list-item",

        events: {
            "click": "highlightName",
            "click td a.js-show": "showClicked",
            "click button.js-delete": "deleteClicked"
        },

        // using this.el will return the DOM element containing the view (a jQuery object wrapper).
        highlightName: function(e) {
            this.$el.toggleClass("warning");
        },

        // preventDefault prevents the browser from navigating to the link's location.
        showClicked: function(e){
            e.preventDefault();
            e.stopPropagation();
            this.trigger("contact:show", this.model);
        },

        // jQuery's .stopPropagation hides the event from parent DOM elements.
        // trigger(eventName, argumentToPassOn)
        deleteClicked: function(e){
            e.stopPropagation();
            this.trigger("contact:delete", this.model);
        },

        // Marionette calls a child view's remove method (if it's defined) when the corresponding model is removed from the
        // collection referenced by the collection/composite view.
        // Marionette.ItemView.prototype.remove.call(self) is to remove the DOM element once it's done fading out
        // (instead of just hiding it).
        remove: function () {
            var self = this;
            this.$el.fadeOut(function () {
                Marionette.ItemView.prototype.remove.call(self);
            });
        }
    });

    List.Contacts = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table table-hover",
        template: "#contact-list",
        childView: List.Contact,
        childViewContainer: "tbody"
    });
});