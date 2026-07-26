// AmberPorter Contact Viewer
"use strict";

const contacts = [
    "1|Scott|scott@murach.com|1-559-555-5555",
    "2|Joel|joel@murach.com|1-409-555-5555",
    "3|Mike|mike@murach.com|1-363-555-5555"
];

const menuString = "COMMAND MENU\n" +
    "list - List all contacts\n" +
    "get # - Get contact with the specified number\n" +
    "exit - Exit program";

while (true) {
    const response = prompt(menuString)
    // For when the user enters "list"
    if (response.toLocaleLowerCase() === "list") {
        let results = ""
        for (let entry of contacts){
            const partsEntry = entry.split("|")
            results += `${partsEntry[0]} - ${partsEntry[1]}\n`
        }
        alert(results)
    }
    // For when the user enters "get" + #
    else if (response.includes("get")) {
        let id = parseInt(response.substring(3))
        let index = id - 1
        if(id > contacts.length){       // Ensure there's a message if user enters ID # that does not exist
            alert(`No contact found under ID #${id}`)
            continue;
        }
        const partsEntry = contacts[index].split("|")
        let results = `Contact info for ${partsEntry[1]}:\nEmail: ${partsEntry[2]}\nPhone: ${partsEntry[3]}`
        alert(results);
    }
    // For when the user enters "exit"
    else if (response.toLocaleLowerCase() === "exit") {
        alert("Goodbye");
        break;
    }
    // For when the user enters an invalid command
    else {
        alert("Invalid command");
    }
}