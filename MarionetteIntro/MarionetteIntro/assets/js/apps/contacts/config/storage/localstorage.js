// Entities extension that add functionality to our Entities
// in order to use Web Storage instead of a remote RESTful API.

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

ContactManager.module("Entities", function (Entities, ContactManager, Backbone, Marionette, $, _) {
    // determining the storage key:
    var findStorageKey = function (entity) {
        // use a model's urlRoot value
        if (entity.urlRoot) {
            return _.result(entity, "urlRoot");
        }
        // use a collection's url value:
        if (entity.url) {
            return _.result(entity, "url");
        }
        // fallback to obtaining a model's storage key from the collection it belongs to:
        if (entity.collection && entity.collection.url) {
            return _.result(entity.collection, "url");
        }

        throw new Error("Unable to determine storage key");
    };

    var StorageMixin = function (entityPrototype) {
        var storageKey = findStorageKey(entityPrototype);
        return { localStorage: new Backbone.LocalStorage(storageKey) };
    };

    // The extended function receives an entity and extends that entity's prototype with the StorageMixin object.
    Entities.configureStorage = function (entity) {
        _.extend(entity.prototype, new StorageMixin(entity.prototype));
    };
});