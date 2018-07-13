window.onpaint = function(){
    validateUser();
}();

$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
}

$(document).ready(
    function(){
        $('#logout').on("click",logout);
        
        if(localStorage.userCart == null || localStorage.userCart === "undefined" || localStorage.userCart === ""){
            console.log("localStorage.userCart 1------ " + localStorage.userCart);
            $(".badge-cart-count").text("0");
        }else{
            console.log("localStorage.userCart 2------ " + localStorage.userCart);
            $(".badge-cart-count").text(localStorage.userCart.split(",").length);
        }
        
        $("#searchProducts").autocomplete({
            source: localStorage.productNames.split(",")
        });
    }
);

function validateUser(){

    console.log("token-------- " + localStorage.occToken);

    if(localStorage.occToken == null || localStorage.occToken === "" || localStorage.occToken === "undefined"){
        console.log("user not logged in ");
        window.location.href = "login.html";
        return;
    }
}

function logout(){
    console.log("logout on process..");
    localStorage.clear();
    window.location.href = "login.html";
}

function addToCart(){
    console.log("adding product to cart " + this.id);
    if(localStorage.userCart != null && localStorage.userCart != undefined){
        if(localStorage.userCart == ""){
            localStorage.userCart = this.id;
        }
        else{
            localStorage.userCart = localStorage.userCart + "," + this.id;
        }
        $(".badge-cart-count").text(localStorage.userCart.split(",").length);
    }
}
