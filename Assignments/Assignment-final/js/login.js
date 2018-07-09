$(document).ready(function(){

    $("#btnLogin").on("click", login);
});



function login(){
    
    var formData = JSON.stringify($("#loginForm").serializeArray());
    console.log("loging in to OCC store with " + formData);

    $.ajax({
        type: "POST",
        url: "https://ccstore-z1ma.oracleoutsourcing.com/ccstore/v1/login/",
        data: formData,
        header : {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Authorization" : "Basic YWRtaW46YWRtaW4=",
            "Access-Control-Allow-Headers" : "*" 
        },
        success: function(response){
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
      });
}