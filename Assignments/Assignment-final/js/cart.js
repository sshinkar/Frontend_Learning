$(document).ready(function(){

    populateCart();

});

function populateCart(){

    if(localStorage.userCart === ""){

        var emptyAlert = document.createElement("div");
        $(emptyAlert).text("NO ITEMS IN CART!!");
        $(".cart-container").appendChild(emptyAlert);
        return;
    }

    var cartItems = localStorage.userCart.split(",");
    var uniqueItems = [];
    var cartTotal = 0;

    $.each(cartItems, function(index, cartItem){

        if(!uniqueItems.includes(cartItem)){

            getProductById(cartItem, function(product){
                console.log(product.id);
                var cart = $(".cart")[0];
    
                var cartRow = document.createElement("tr");
                cart.appendChild(cartRow);
    
                var ciImageHolder = document.createElement("td");
                var ciDetailHolder = document.createElement("td");
                var ciQuantityHolder = document.createElement("td");
                var ciTotalHolder = document.createElement("td");
                cartRow.appendChild(ciImageHolder);
                cartRow.appendChild(ciDetailHolder);
                cartRow.appendChild(ciQuantityHolder);
                cartRow.appendChild(ciTotalHolder);
                
                var ciImage = document.createElement("img");
                $(ciImage).attr("class", "ci-image");
                $(ciImage).attr("src", product.primaryFullImageURL);
                ciImageHolder.appendChild(ciImage);
    
                $(ciDetailHolder).attr("class", "ci-details");
                var ul =  document.createElement("ul");
                $(ul).attr("class", "nav flex-column");
                ciDetailHolder.appendChild(ul);
    
                var ciName = document.createElement("li");
                $(ciName).attr("class", "nav-item ci-name");
                $(ciName).text(product.displayName);
                ul.appendChild(ciName);
    
                var ciPrice = document.createElement("li");
                var salePrice = product.salePrice != null ? product.salePrice.toFixed(2) : 0.00;
                $(ciPrice).attr("class", "nav-item ci-price");
                $(ciPrice).text(localStorage.currencySymbol + " " + salePrice);
                ul.appendChild(ciPrice);
    
                $(ciQuantityHolder).text(getQuantity(cartItem));
                
                $(ciTotalHolder).text(localStorage.currencySymbol + " " +(salePrice * getQuantity(cartItem)).toFixed(2));

                cartTotal = cartTotal + (salePrice * getQuantity(cartItem));
                console.log("cartTotal -- " + cartTotal);
                $(".cart-price").text( localStorage.currencySymbol + " " + cartTotal.toFixed(2));
           });

        }

       uniqueItems.push(cartItem);

    });

    $(".cart-count").text(cartItems.length);
    
    
}

function getQuantity(cartItem){
    var cartItems = localStorage.userCart.split(",");
    var count = 0;
    $.each(cartItems, function(index, item){
        if(cartItem === item){
            count++;
        }
    });
    return count;
}

function getProductById(productId, cb){

    $.ajax({
        url: "https://oe-final.herokuapp.com/products/" + productId,
        headers : {
            "Authorization" : "Bearer " + localStorage.occToken
        }, 
        success: function(product){
            console.log("getProductById " + product.displayName)
            cb(product);
        },
        error: function(error){
            console.log("ERROR on PDP "+ error);
            return null;
        }
    });
}