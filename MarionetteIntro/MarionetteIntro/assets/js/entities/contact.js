// Entities

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

ContactManager.module("Entities", function (Entities, ContactManager, Backbone, Marionette, $, _) {
    // Our Entities: (Models and Collections)
    // Our Model:
    Entities.Contact = Backbone.Model.extend({
        // we need a means to indicate a specific model's location that don't belong to a collection:
        urlRoot: "contacts",
        // data validation:
        validate: function (attrs, options) {
            var errors = {}
            if (! attrs.firstName) {
                errors.firstName = "can't be blank";
            }
            if (! attrs.lastName) {
                errors.lastName = "can't be blank";
            }
            else {
                if (attrs.lastName.length < 2) {
                    errors.lastName = "is too short";
                }
            }
            if (! _isEmpty(errors)) {
                return errors;
            }
        }
    });

    // Configuring our model to use Web Storage (instead of a remote RESTful API):
    Entities.configureStorage(Entities.Contact);

    // Our Collection:
    Entities.ContactCollection = Backbone.Collection.extend({
        // url: where is our collection located. 
        // (Backbone will manage all the persistence for us by interacting wiht a RESTful API implementation on the server):
        // NOTE: in this exercise we'll be using Web Storage.
        // to create a new contact, Backbone will POST the json data to “/contacts”
        // to read the contact with id 3, Backbone will GET the json data from “/contacts/3”
        // to update the contact with id 3, Backbone will PUT the json data to “/contacts/3”
        // to delete the contact with id 3, Backbone will DELETE the json data to “/contacts/3”
        url: "contacts",
        model: Entities.Contact,
        comparator: "firstName"
    });

    // Configuring our collection to use Web Storage (instead of a remote RESTful API):
    Entities.configureStorage(Entities.ContactCollection);

    var contacts;

    // "cheating" by initializing a few contacts if our collection is empty when we load it:
    var initializeContacts = function () {
        contacts = new Entities.ContactCollection([
            {
                id: 1,
                firstName: "Bob",
                lastName: "Brigham",
                phoneNumber: "555-0163"
            },
            {
                id: 2,
                firstName: "Alice",
                lastName: "Arten",
                phoneNumber: "555-0184"
            },
            {
                id: 3,
                firstName: "Charlie",
                lastName: "Campbell",
                phoneNumber: "555-0129"
            },
            {
                id: 4,
                firstName: "Bob",
                lastName: "Dallas",
                phoneNumber: "555-0889"
            },
            {
                id: 5,
                firstName: "Alice",
                lastName: "Tudor",
                phoneNumber: "555-0529"
            },
            {
                id: 6,
                firstName: "Charlie",
                lastName: "Mambo",
                phoneNumber: "555-0111"
            }
        ]);
        contacts.forEach(function (contact) {
            contact.save();
        });
        // return a list of models, instead of a collection:
        return contacts.models;
    };

    var API = {
        // handler to return the contacts collection:
        getContactEntities: function () {
            var contacts = new Entities.ContactCollection();
            // Declaring a jQuery Deferred object instance (used to synchronize code):
            // "I promise I'll dos something, and I'll update you as things progress."
            var defer = $.Deferred();
            contacts.fetch({
                // resolve the deferred object with the data as soon as it's received:
                success: function (data) {
                    defer.resolve(data);
                }
            });
            var promise = defer.promise();
            $.when(promise).done(function (contacts) {
                if (contacts.length === 0) {
                    // if we don't have any contacts yet, create some for convenience:
                    var models = initializeContacts();
                    // .reset() all models in the collection are removed and replaced by the models provided:
                    contacts.reset(models);
                }
                });
                // Returning the declared jQuery Deferred object instance's promise:
            return promise;
        },

        // handler to return a single contact:
        getContactEntity: function (contactId) {
            var contact = new Entities.Contact({ id: contactId });
            // Declaring a jQuery Deferred object instance (used to synchronize code):
            // "I promise I'll dos something, and I'll update you as things progress."
            var defer = $.Deferred();
            // Data Latency simulation:
            setTimeout(function () {
                contact.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    },
                    error: function (data) {
                        defer.resolve(undefined);
                    }
                });
            }, 2000);
            // Returning the declared jQuery Deferred object instance's promise:
            return defer.promise();
            // This contract (promise) allows code elsewhere to simply monitor the promise and react appropiately to any changes.
        }
    };

    // "request-response" request-handler for the "contact:entities" event,
    // it automatically defined at the application level by Marionette:
    ContactManager.reqres.setHandler("contact:entities", function () {
        return API.getContactEntities();
    });

    // "request-response" request-handler for the "contact:entity" event,
    // it automatically defined at the application level by Marionette:
    ContactManager.reqres.setHandler("contact:entity", function (id) {
        return API.getContactEntity(id);
    });

});