// Router (for all the ContactsApp sub-modules)
// Routing Controller

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

ContactManager.module("ContactsApp", function (ContactsApp, ContactManager, Backbone, Marionette, $, _) {
    ContactsApp.Router = Marionette.AppRouter.extend({
        // Route declarations:
        // appRoutes object { "URL fragments /:parameter (/:optional param)" : "callback methods" }
        // NOTE: the callback function (e.g. listContacts) specified in the appRoutes object must exist in the router's controller. 
        appRoutes: {
            "contacts": "listContacts",
            "contacts/:id": "showContact",
            "contacts/:id/edit": "editContact"
        }
    });

    // Public methods within an API object.
    // NOTE: All the callbacks used in the appRoutes object must be located in our API object.
    var API = {

        listContacts: function () {
            // send it to List Controller:
            ContactsApp.List.Controller.listContacts();
        },

        showContact: function (id) {
            // send it to Show Controller:
            ContactsApp.Show.Controller.showContact(id);
        },

        editContact: function (id) {
            // send it to Edit Controller:
            ContactsApp.Edit.Controller.editContact(id);
        }

    };


    // Event listeners for "routing" - update URL fragment and call the appropriate controller action:
    ContactManager.on("contacts:list", function () {
        ContactManager.navigate("contacts");
        API.listContacts();
    });

    // responding to the "contacts/id" URLs:
    ContactManager.on("contact:show", function (id) {
        ContactManager.navigate("contacts/" + id);
        API.showContact(id);
    });

    // responding to the "contacts/id/edit" URLs:
    ContactManager.on("contact:edit", function (id) {
        ContactManager.navigate("contacts/" + id + "/edit");
        API.editContact(id);
    });


    // API object is provided to the router during instantiation.
    // "start" event is only triggered after all the initiliazers have been run.
    ContactManager.addInitializer(function () {
        new ContactsApp.Router({
            controller: API
        });
    });
});