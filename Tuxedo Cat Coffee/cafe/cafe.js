"use strict";
const getElement = selector => document.querySelector(selector);

const getSelectedProduct = src => {
    // Figure which product was selected and return relevant information
    if(src.endsWith("biscotti.jpg")){
        return ["Biscotti", 1.95]
    }else if(src.endsWith("cappuccino.jpg")){
        return ["Cappuccino", 3.45]
    }else if(src.endsWith("coffee.jpg")){
        return ["Coffee", 1.75]
    }else if(src.endsWith("espresso.jpg")){
        return ["Espresso", 1.95]
    }else if(src.endsWith("latte.jpg")){
        return ["Latte", 2.95]
    }else if(src.endsWith("scone.jpg")){
        return ["Scone", 2.95]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    let total = 0;
    // Obtain all images in the menu list
    const allImages = document.querySelectorAll("#menu-list img");
    // Iterate through all images
    for(let img of allImages){
        const infoImage = new Image();
        // Remember Info image
        infoImage.src = img.id;
        // Remember the original image
        const originalImage = img.src;
        // Add event listeners for mouseover and mouseout
        img.addEventListener("mouseover", () => img.src = infoImage.src);
        img.addEventListener("mouseout", () => img.src = originalImage);
        // Add event listener for click to select the product
        img.addEventListener("click", event => {
            event.preventDefault();
            const productInfo = getSelectedProduct(originalImage);  // Get production info
            // Target specific "order" element
            const orderList = getElement("#order");
            // Create option tag and fill it
            const option = document.createElement("option");
            option.setAttribute("value", productInfo[0].toLocaleLowerCase());
            const text = `$${productInfo[1]} - ${productInfo[0]}`;
            option.appendChild(document.createTextNode(text));
            // Add to order list
            orderList.appendChild(option);
            // Update total and display
            total += productInfo[1];
            getElement("#total").textContent = `Total: $${total.toFixed(2)}`;
        });
        // Place order
        getElement("#place_order").addEventListener("click", () => {
            getElement("#order_form").submit();
        });
        // Clear order
        getElement("#clear_order").addEventListener("click", () => {
            total = 0;
            getElement("#order").textContent = "";
            getElement("#total").textContent = "";
        });
    }
}); 