$(document).ready(function(){

    $("#btnLogin").on("click", login);
});



function login(){
    
    var formData = JSON.stringify($("#loginForm").serializeArray());
    var username = $("#username").val();
    var password = $("#password").val();
    var token = $("#token").val();
    console.log("loging in to OCC store with " + username + ':' + password + ':' + token);

    $.ajax({
        type: "POST",
        url: "https://oe-final.herokuapp.com/auth",
        data: {"access_token" : token},
        headers : {
            "Authorization" : "Basic " + btoa(username + ':' + password)
        },
        success: function(response){
            
            localStorage.occToken = response.token;
            console.log(localStorage.occToken);

            localStorage.userId = response.user.id;
            console.log(localStorage.userId);

            localStorage.userName = response.user.name;
            console.log(localStorage.userName);

            localStorage.userEmail = response.user.email;
            console.log(localStorage.userEmail);

            localStorage.userPicture = response.user.picture;
            console.log(localStorage.userPicture);

            localStorage.currencySymbol = "$";
            console.log(localStorage.currencySymbol);

            localStorage.userCart = "";
            console.log(localStorage.userCart);

            localStorage.productNames = "";
            console.log(localStorage.productNames);

            console.log("------ LOGIN SUCCESS -------");

            window.location.href = "index.html";
        },
        error: function(error){
            console.log(error);
        }
      });
}