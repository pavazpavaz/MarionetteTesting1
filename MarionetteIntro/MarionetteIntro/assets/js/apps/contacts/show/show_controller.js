// Show Controller

// To get the data and display the view.
// "The controller is like the orchestra conductor"

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
    Show.Controller = {
        showContact: function (id) {

            // When Marionette displays the new view for contactView in the same region, it will automatically manage
            // closing the loadingView displayed in that region.
            var loadingView = new ContactManager.Common.Views.Loading({
                title: "Artificial Loading Dealy",
                message: "Data loading is delayed to demonstrate using a loading view."
            });
            ContactManager.mainRegion.show(loadingView);

            // We get the promise returned by our handler:
            var fetchingContact = ContactManager.request("contact:entity", id);
            // wait until the data has been fetched ($when...done) before displaying our view with the data:
            $.when(fetchingContact).done(function (contact) {
                var contactView;
                // does the model exist?
                if (contact !== undefined) {
                    // if the model exists instantiate a new contact view:
                    contactView = new Show.Contact({
                        model: contact
                    });

                    contactView.on("contact:edit", function (contact) {
                        ContactManager.trigger("contact:edit", contact.get("id"));
                    });
                }
                else {
                    // otherwise, if the model doesn't exist, instantiate the view for nonexistent contacts:
                    contactView = new Show.MissingContact();
                }

                ContactManager.mainRegion.show(contactView);
            });          
        }
    }
});