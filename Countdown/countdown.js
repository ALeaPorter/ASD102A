"use strict";
// Global variable
let timer = null;
const getElement = selector => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {

    getElement("#countdown").addEventListener("click", () => {
        // Clear any previous timer
        clearInterval(timer);
        const eventName = getElement("#event").value;
        const eventDateString = getElement("#date").value;  
        const messageLbl = getElement("#message");  

        // make sure user entered event and date 
        if (eventName == "" || eventDateString == "") {
            messageLbl.textContent = "Please enter both a name and a date.";
            return;
        }

        // convert event date string to Date object and check for validity
        const eventDate = new Date(eventDateString);
        if (eventDate.toString() == "Invalid Date") {
            messageLbl.textContent = "Please enter a valid date.";
            return;
        }

        // calculate days
        const today = new Date();
        let totalSecs = (eventDate.getTime() - today.getTime()) / 1000; 
        const secsForOneDay = 24 * 60 * 60; // hrs * mins * secs       
        const days = Math.floor(totalSecs / secsForOneDay);             
       
        // create and display message 
        const displayDate = eventDate.toDateString();
        let msg = "";
        if (days == 0) {
            msg = `Hooray! Today is ${eventName}! (${displayDate})`;
        } else if (days > 0) {
            timer = setInterval(() => {
                const today = new Date();
                let totalSecs = (eventDate.getTime() - today.getTime()) / 1000; // |
                const secsForOneDay = 24 * 60 * 60;                             // |
                const days = Math.floor(totalSecs / secsForOneDay);             // |
                totalSecs -= days * secsForOneDay;                              // |
                const hours = Math.floor(totalSecs / 3600);                     // | Reworked section to calculate hours, minutes, and seconds too
                totalSecs -= hours * 3600;                                      // |
                const minutes = Math.floor(totalSecs / 60);                     // |
                totalSecs -= minutes * 60;                                      // |
                const seconds = Math.floor(totalSecs);                          // |
                let msg = `${days} day(s) ${hours} hour(s) ${minutes} minute(s) ${seconds} second(s) until ${eventName}! (${displayDate})`;
                messageLbl.textContent = msg;
            }, 1000);
        } else if (days < 0) {
            msg = `${eventName} happened ${Math.abs(days)} 
                   day(s) ago. (${displayDate})`;
        }
        messageLbl.textContent = msg;
    });

    // set focus on first text box
    getElement("#event").focus();
});