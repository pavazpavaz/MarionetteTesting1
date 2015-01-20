var ContactManager = new Marionette.Application();

// We need to define a region (an area in our page) where Marionette can insert the view, in order to display it.
ContactManager.addRegions({
    mainRegion: "#main-region"
});

// helper function to be called on "start" (this function can added to Marionette Application.prototype via extending):
ContactManager.navigate = function (route, options) {
    // sets options default value to {} if none are provided:
    options || (options = {});
    Backbone.history.navigate(route, options);
};

// helper function to be called on "start" (this function can added to Marionette Application.prototype via extending):
ContactManager.getCurrentRoute = function () {
    return Backbone.history.fragment
};

// On start, call controller ContactsApp.List's function listContacts()
// that gets the entities and the view to show on the page:
ContactManager.on("start", function () {
    if (Backbone.history) {
        Backbone.history.start();

        if (this.getCurrentRoute() === "") {
            // trigger an event:
            ContactManager.trigger("contacts:list");
            // we'll update the URL fragment and call the appropriate action within our controller that's listening to this event.
        }
    }
});