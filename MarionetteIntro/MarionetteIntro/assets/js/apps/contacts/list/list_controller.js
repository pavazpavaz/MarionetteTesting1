// List Controller

// "The controller is like the orchestra conductor"

// "If the sub-module exists, it will be used instead of creating a new one"
// This allows us to have our controller and views defined in separate files,
// while keeping them withing the same Marionette sub-module.

// Module definition: (can be given a callback that takes 6 arguments)
// 1. The module itself (the name we're going to use within the callback to refer to the module we're defining).
// 2. the application object that module was called from.
// 3. Backbone
// 4. Backbone.Marionette
// 5. jQuery
// 6. Underscore
// 7. (any custom arguments).

ContactManager.module("ContactsApp.List", function (List, ContactManager, Backbone, Marionette, $, _) {
    List.Controller = {
        listContacts: function () {
            // displaying loading view for contacts list:
            // (after the data is loaded Marionette will automatically replace it.)
            var loadingView = new ContactManager.Common.Views.Loading();
            ContactManager.mainRegion.show(loadingView);

            var fetchingContacts = ContactManager.request("contact:entities");

            $.when(fetchingContacts).done(function (contacts) {
                var contactsListView = new List.Contacts({
                    collection: contacts
                });

                // Show event listener:
                contactsListView.on("childview:contact:show", function (childView, model) {
                    // triggering an event to display a contact:
                    ContactManager.trigger("contact:show", model.get("id"));
                });

                // Delete event listener:
                // Register an event listener and provide a callback function.
                // When a child view within a collection view triggers an event, that event will bubble up through the parent
                // collection view with "childview:" prepended to the event name.
                contactsListView.on("childview:contact:delete", function (childView, model) {
                    model.destroy();
                });

                // "put the contents of contactsListView inside the element corresponding to the jQuery selector #main-region"
                ContactManager.mainRegion.show(contactsListView);
            });
        }
    }
});