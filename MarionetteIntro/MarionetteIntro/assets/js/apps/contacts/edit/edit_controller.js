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

ContactManager.module("ContactsApp.Edit", function (Edit, ContactManager, Backbone, Marionette, $, _) {
    Edit.Controller = {
        editContact: function (id) {
            var loadingView = new ContactManager.Common.Views.Loading({
                title: "Artificial Loading Delay",
                message: "Data loading is delayed to demonstrate using a loading view."
            });
            ContactManager.mainRegion.show(loadingView);

            var fetchingContact = ContactManager.request("contact:entity", id);
            $.when(fetchingContact).done(function (contact) {
                var view;
                if (contact !== undefined) {
                    view = new Edit.Contact({
                        model: contact
                    });

                    // handling the 'form:submit' event:
                    view.on("form:submit", function (data) {
                        if (contact.save(data)) {
                            // after updating the contact, we display the show view by triggering a routing event:
                            // if the data is valid, we redirect to the "show" view:
                            ContactManager.trigger("contact:show", contact.get("id"));
                        }
                        // if the data is not valid, triggerMethod() (that will automatically execute a function whose
                        // name corresponds to the event:
                        // ("form:data:invalid", contact.validationError) -> onFormDataInvalid(contact.validationError)
                        else {
                            view.triggerMethod("form:data:invalid", contact.validationError);
                        }
                    });
                }
                else {
                    view = new ContactManager.ContactsApp.Show.MissingContact();
                }

                ContactManager.mainRegion.show(view);
            });
        }
    };
});