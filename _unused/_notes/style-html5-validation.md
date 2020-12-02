---
layout: note
title: Style HTML5 Validation via JavaScript API
date: 1994-01-01
excerpt: >
  In the modern world of responsive web design we have devices ranging from watches to televisions, and as more devices with varying screen sizes appear on the market, specifying a font size for each 'breakpoint' isn't a feasible approach going forward... introducing Fluid Typography!
---

You can check if a field is valid with the: `checkValidity()` method on a field.

Validation messages are easily retrieved with the: `validationMessage` attribute on a field.

### Recaptcha

If you use Recaptcha to protect your forms from bots and spammers you can also validate that the user has ticked the box before allowing the form to be submitted.

```html
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
<div class="g-recaptcha" data-callback="validateRecaptcha" data-sitekey="SITE_KEY"></div>
```

```javascript
function validateRecaptcha() {
    // get the response from the recaptcha
    const response = grecaptcha.getResponse();
    // check if the response is valid
    const isValid = response.length !== 0;
    // get the recaptcha field element
    const field = document.querySelector('.g-recaptcha');
    // define the error
    const error = 'Please verify you\'re human.';
    // if the response is not valid append an error message to the field
    if(!isValid) {
        field.insertAdjacentHTML('afterend', `<p class="error">${error}</p>`);
    // if the response is valid remove the error message from the field
    } else {
        removeExistingErrorMessage(field);
    }
    // return if valid or not
    return isValid;
}
```