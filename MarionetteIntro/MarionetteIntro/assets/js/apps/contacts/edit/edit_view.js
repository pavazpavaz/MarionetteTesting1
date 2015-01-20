// Edit View sub-module

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
// 7. (any custom arguments)

ContactManager.module("ContactsApp.Edit", function (Edit, ContactManager, Backbone, Marionette, $, _) {
    Edit.Contact = Marionette.ItemView.extend({
        template: "#contact-form",

        events: {
            "click button.js-submit": "submitClicked"
        },

        submitClicked: function (e) {
            e.preventDefault();
            // triggering a 'form:submit' event with the form's data:
            var data = Backbone.Syphon.serialize(this);
            this.trigger("form:submit", data);
        },

        onFormDataInvalid: function (errors) {
            var $view = this.$el;

            // Clear the visible errors before displaying the new ones:
            var clearFormErrors = function () {
                // locate the form within the view:
                var $form = $view.find("form");
                // remove the error messages we've added to the DOM:
                $form.find(".help-inline.error").each(function () {
                    $(this).remove();
                });
                // remove the "error" class from the input control groups, which made Bootstrap give red outlines to the inputs:
                $form.find(".control-group.error").each(function () {
                    $(this).removeClass("error");
                });
            }

            // Mark data validation errors:
            var markErrors = function (value, key) {
                // get the "control group" Bootstrap uses for the label/input group:
                var $controlGroup = $view.find("contact-" + key).parent();
                // create a DOM element for the error message and style it with Bootstrap:
                var $errorEl = $("<span>", { class: "help-inline error", text: value });
                // add the error DOM element to the form's control group:
                $controlGroup.append($errorEl).addClass("error");
            }
            // Clear errors from the form:
            clearFormErrors();

            // markErrors iterator:
            _.each(errors, markErrors);
        }
    });
});