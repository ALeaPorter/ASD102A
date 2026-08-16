"use strict";
const getElement = selector => document.querySelector(selector);
// Clear all error messages.
const clearErrorMessages = () => {
    const inputs = document.querySelectorAll("input");
    for(let input of inputs) {
        const span = input.nextElementSibling;
        if(span) span.textContent = "";
    }
};
// Add event listener to the DOMContentLoaded event.
document.addEventListener("DOMContentLoaded", () => {
    const form = getElement("form");
    form.noValidate = true;
    // Attach invalid listeners to all inputs.
    for(let element of form.elements) {
        element.addEventListener("invalid", event => {
            const elem = event.currentTarget;
            const msg = elem.title ? elem.title : elem.validationMessage;
            const span = elem.nextElementSibling;
            if(span) span.textContent = msg;
        });
    }
    // Attach submit listener to the form.
    form.addEventListener("submit", event => {
        clearErrorMessages();
        // Validate if user entered either email or phone number.
        const email = getElement("#email");
        const phone = getElement("#phone");
        
        let msg = (email.value == "" && phone.value == "") ? "Please enter either an email or a phone number" : "";
        email.setCustomValidity(msg);
        // Validate date of birth
        const dob = getElement("#dob");
        const dobValue = new Date(dob.value + "T00:00:00");
        // Check if the date is valid and in the past.
        if(dobValue.toString() == "Invalid Date") {
            msg = "Please enter a valid date of birth";
        } else {
            let today = new Date();
            today = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // This sets time to 00:00:00.
            msg = (today <= dobValue) ? "Date of birth must be in the past" : "";
        }
        dob.setCustomValidity(msg);
        // Check to see if form is valid.
        if(!form.checkValidity()) {
            event.preventDefault();
        }
        // Clear error messages when the form is reset.
        form.addEventListener("reset", event => {
            clearErrorMessages();
        });
    });
});