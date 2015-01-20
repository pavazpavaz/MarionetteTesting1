// Show View sub-module

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

ContactManager.module("ContactsApp.Show", function (Show, ContactManager, Backbone, Marionette, $, _) {

    // VIEWS 
    // We need to define a view to display. Views are javascript objects that take care of "reacting to things that happen"
    // (clicks, keeping track of a model, etc.) Since we are not refreshing the page (SPA) nor interacting with the server
    // users interactions with the the view are handled here.
    // The view's responsibility in Marionette is to monitor the models it's displaying, and if those models change, the view
    // renders itself again (using the same template). (React to changes in the environment).
    Show.MissingContact = Marionette.ItemView.extend({
        template: "#missing-contact-view"
    });

    Show.Contact = Marionette.ItemView.extend({
        template: "#contact-view",

        events: {
            "click a.js-edit": "editClicked"
        },

        editClicked: function (e) {
            e.preventDefault();
            this.trigger("contact:edit", this.model);
        }
    });
});