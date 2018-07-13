$(document).ready(function(){

    getProducts();

});

function getProducts(){

    $.ajax({
        type: "GET",
        url: "https://oe-final.herokuapp.com/products",
        headers : {
            "Authorization" : "Bearer " + localStorage.occToken
        }, 
        success: function(res){
            var products = res.items;
            var product_list_div = $(".product-list")[0];
            localStorage.productNames = "";
            
            $.each(products, function(index, product){


                if(localStorage.productNames === ""){
                    localStorage.productNames = product.displayName;
                }else{
                    localStorage.productNames = localStorage.productNames + "," + product.displayName;
                }

                //console.log(index + " - " + product.id);

                var cardHolder = document.createElement("div");
                $(cardHolder).attr("class", "product-card-holder col-lg-3 col-md-6 col-sm-12");

                var card = document.createElement("div");
                $(card).attr("class", "card");
                $(card).attr("id", product.id);

                var image = document.createElement("img");
                $(image).attr("class", "card-img-top product-card-image");
                $(image).attr("src", product.primaryFullImageURL);
                $(image).attr("alt", product.primaryImageTitle);

                var cardBody = document.createElement("div");
                $(cardBody).attr("class", "card-body center");

                var cardTitle = document.createElement("h6");
                $(cardTitle).attr("class", "card-title");
                $(cardTitle).text(product.displayName);
                

                var cardText = document.createElement("p");
                $(cardText).attr("class", "card-text");
                var salePrice = product.salePrice != null ? product.salePrice.toFixed(2) : 0.00;
                $(cardText).text(localStorage.currencySymbol + " " + salePrice);

                var btnAddToCart = document.createElement("a");
                $(btnAddToCart).attr("class", "btn btn-success btn-add-to-cart");

                var addCartIcon = document.createElement("i");
                $(addCartIcon).attr("class", "fas fa-cart-plus");

                btnAddToCart.appendChild(addCartIcon);

                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardText);
                cardBody.appendChild(btnAddToCart);

                card.appendChild(image);
                card.appendChild(cardBody);
                
                cardHolder.appendChild(card);
                product_list_div.appendChild(cardHolder);

                $(image).on("click", showProduct.bind(product));
                $(btnAddToCart).on("click", addToCart.bind(product));
            });

            $("#searchProducts").autocomplete({
                source: localStorage.productNames.split(",")
            });
        },
        error: function(error){
            console.log("ERRORR-- " + error);
        }
    });
}

function showProduct(){
    console.log("Show PDP for " + this.id);
    window.location.href = "pdp.html?prodId=" + this.id;
}