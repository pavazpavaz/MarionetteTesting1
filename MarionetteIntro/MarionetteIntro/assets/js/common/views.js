// Common Views sub-module

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

ContactManager.module("Common.Views", function (Views, ContactManager, Backbone, Marionette, $, _) {
    Views.Loading = Marionette.ItemView.extend({
        template: "#loading-view",

        // define defaults as properties:
        title: "Loading Data",
        message: "Please wait, data is loading.",

        serializeData: function(){
            // returning JSON object with the attribute keys we want to access within the template:
            return {
                title: Marionette.getOption(this, "title"),
                message: Marionette.getOption(this, "message")
            }
        },

        // Marionette will trigger a "show" event and will execute the view's onShow function, if defined.
        // This way it will fire up our spinner automatically when the view is displayed:
        onShow: function () {
            var opts = {
                lines: 13, // The number of lines to draw
                length: 20, // The length of each line
                width: 10, // The line thickness
                radius: 30, // The radius of the inner circle
                corners: 1, // Corner roundness (0..1)
                rotate: 0, // The rotation offset
                direction: 1, // 1: clockwise, -1: counterclockwise
                color: "#000", // #rgb or #rrggbb
                speed: 1, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: "spinner", // The CSS class to assign to the spinner
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                top: "250px", // Top position relative to parent in px
                left: "400px" // Left position relative to parent in px
            };
            $("#spinner").spin(opts);
        }
    });
});