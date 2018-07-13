$(document).ready(function(){

    getProduct();
});

function getProduct(){

    $.ajax({
        url: "https://oe-final.herokuapp.com/products/" + decodeURIComponent($.urlParam('prodId')),
        headers : {
            "Authorization" : "Bearer " + localStorage.occToken
        }, 
        success: function(product){

            console.log("found product " + product.displayName);
            var img = $(".pdp-image");
            var name = $(".name");
            var description = $(".description");
            
            $(img).attr("src", product.primaryFullImageURL);
            $(name).text(product.displayName);
            $(description).text("Description : " + product.description);

            $(".btn-add-to-cart").on("click", addToCart.bind(product));

        },
        error: function(error){
            console.log("ERROR on PDP "+ error);
        }
    });
}