"use strict";
const getElement = selector => document.querySelector(selector);
// Function to get the month name from the month index
const getMonthName = currentMonthIndex => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
    return monthNames[currentMonthIndex];
};
// Function to get the last day of the month
const getLastDayOfMonth = currentMonth => {
    const date = new Date();
    date.setMonth(currentMonth + 1);
    date.setDate(0);
    return date.getDate();
};
// Function to add empty cells before and after body
const addEmptyCells = (start, day, row) => {
    while(start < day){
        row.appendChild(document.createElement("td"));
        start++;
    }
};
// Function to add a day cell to the row
const addDayCell = (date, today, row) => {
    const cell = document.createElement("td");
    cell.appendChild(document.createTextNode(date));
    if(date === today.getDate()) {
        cell.classList.add("today");
    }
    row.appendChild(cell);
};

document.addEventListener("DOMContentLoaded", () => {
    const today = new Date();
    // Display the current month and year in calendar
    const currentMonth = getMonthName(today.getMonth());
    const currentYear = today.getFullYear();
    getElement("#month_year").textContent = `${currentMonth} ${currentYear}`;

    const date = new Date(); // Day of the week (0 - 6)
    let row = null;
    // Figure out the max number of days and go through all days
    const lastDayOfMonth = getLastDayOfMonth(today.getMonth());
    for(let d = 1; d <= lastDayOfMonth; d++) {
        date.setDate(d);

        const day = date.getDay();
        // Create a new row for the first day of the month or if it's Sunday
        if(day === 0 || d === 1) {
            row = document.createElement("tr");
        };
        if(d === 1) {
            // Add empty cells for days before the first day of the month
            addEmptyCells(0, day, row);
        };
        // Add the day cell
        addDayCell(d, today, row);
        if(d === lastDayOfMonth) {
            // Add empty cells for days after the last day of the month
            addEmptyCells(day, 6, row);
        }
        // Add row if end of month or if it's Saturday
        if(day === 6 || d === lastDayOfMonth) {
            calendar.appendChild(row);
        }
    }
});