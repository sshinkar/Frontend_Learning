$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
}

$(document).ready(function(){

    $.ajax({
        url: "https://api.github.com/users/" + decodeURIComponent($.urlParam('login')),
        success: function(user){
                console.log("got user details for " +   user.login + " "
                                                    +    user.name + " "
                                                    +    user.company + " "
                                                    +   user.location + " "
                                                    +    user.email + " "
                                                    +    user.followers + " "
                                                    +    user.following);

                $(".card-img-top").attr("src", user.avatar_url);
                $(".user-name").text(validate(user.name));
                $(".user-email").text(validate(user.email));
                $(".user-company").text(validate(user.company));
                $(".user-location").text(validate(user.location));
                $(".user-followers").text(validate(user.followers));
                $(".user-following").text(validate(user.following));
        },
        error: function(error){
            console.log(error);
        }
    });

});

function validate(text){
    if(text === null){
        return "NA";
    }
    return text;
}