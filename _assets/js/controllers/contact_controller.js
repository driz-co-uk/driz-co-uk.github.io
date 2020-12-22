"use strict";

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

(() => {
    var _temp;

    const application = Stimulus.Application.start();
    application.register("form", (_temp = class extends Stimulus.Controller {
        constructor(...args) {
            super(...args);

            _defineProperty(this, "onBlur", event => {
                this.validateField(event.target);
            });

            _defineProperty(this, "onSubmit", event => {
                if (!this.validateForm()) {
                    event.preventDefault();
                    let firstInvalidField = this.firstInvalidField;
                    if(firstInvalidField) firstInvalidField.focus();
                }
            });
        }

        connect() {
            this.element.setAttribute('novalidate', true);
            this.element.addEventListener('blur', this.onBlur, true);
            this.element.addEventListener('submit', this.onSubmit);
            this.element.addEventListener('ajax:beforeSend', this.onSubmit);
        }

        disconnect() {
            this.element.removeEventListener('blur', this.onBlur);
            this.element.removeEventListener('submit', this.onSubmit);
            this.element.removeEventListener('ajax:beforeSend', this.onSubmit);
        }

        validateForm() {
            let isValid = true;
            // validate fields
            this.formFields.forEach(field => {
                if (this.shouldValidateField(field) && !this.validateField(field)) isValid = false;
            });
            // validate recaptcha (if exists)
            if($('#g-recaptcha').length > 0) {
                if(!this.validateRecaptcha()) isValid = false;
            }
            return isValid;
        }

        validateRecaptcha() {
            const response = grecaptcha.getResponse();
            const isValid = response.length !== 0;
            if(!isValid) { 
                $('#g-recaptcha').append('<p class="error">Please verify you\'re not a robot.');
            } else {
                $('#g-recaptcha').find('.error').remove();
            }
            return isValid;
        }

        validateField(field) {
            if (!this.shouldValidateField(field)) return true;
            // handle recaptcha iframe being classed as a valid element
            if(field.type === undefined) return true;
            const isValid = field.checkValidity();
            field.classList.toggle('invalid', !isValid);
            this.refreshErrorForInvalidField(field, isValid);
            return isValid;
        }

        shouldValidateField(field) {
            return !field.disabled && !['file', 'reset', 'submit', 'button'].includes(field.type);
        }

        refreshErrorForInvalidField(field, isValid) {
            this.removeExistingErrorMessage(field);
            if (!isValid) this.showErrorForInvalidField(field);
        }

        removeExistingErrorMessage(field) {
            const fieldContainer = field.closest('.form__group');
            if (!fieldContainer) return;
            const existingErrorMessageElement = fieldContainer.querySelector('.error');
            if (existingErrorMessageElement)
                existingErrorMessageElement.parentNode.removeChild(existingErrorMessageElement);
        }

        showErrorForInvalidField(field) {
            field.insertAdjacentHTML('afterend', this.buildFieldErrorHtml(field));
        }

        buildFieldErrorHtml(field) {
            return `<p class="error">${field.validationMessage}</p>`;
        }

        get formFields() {
            return Array.from(this.element.elements);
        }

        get firstInvalidField() {
            return this.formFields.find(field => !field.checkValidity());
        }

    }, _temp));
})();

function recaptchaClicked() {
    const response = grecaptcha.getResponse();
    const isValid = response.length !== 0;
    if(isValid) $('#g-recaptcha').find('.error').remove();
}