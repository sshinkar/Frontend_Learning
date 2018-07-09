$(document).ready(function(){

    $.ajax({
        url: "https://api.github.com/users", 
        success: function(users){
                var containers = $(".row");

                $.each(users, function(index, user){
                    //console.log("index " + index + " id " + user.id + " " + user.login);
                    var cardHolder = document.createElement("div");
                    $(cardHolder).attr("class", "col-sm-1 col-lg-3 col-md-6");

                    var card = document.createElement("div");
                    $(card).attr("class", "card");

                    var image = document.createElement("img");
                    $(image).attr("class", "card-img-top circle");
                    $(image).attr("src", user.avatar_url);
                    $(image).attr("alt", "Card image cap")

                    var cardBody = document.createElement("div");
                    $(cardBody).attr("class", "card-body center");

                    var cardTitle = document.createElement("h5");
                    $(cardTitle).attr("class", "card-title");
                    $(cardTitle).text(user.login);

                    cardBody.appendChild(cardTitle);

                    card.appendChild(image);
                    card.appendChild(cardBody);
                   
                    cardHolder.appendChild(card);
                    containers[0].appendChild(cardHolder);

                    $(card).on("click", getUserDetails.bind(user));
                    
                 })
        },
        error: function(error){
            console.log(error);
        }
    });
});

function getUserDetails(){
    console.log("requesting for user details of " + this.login + " --- " + this.id);
    window.open("user_details.html?login=" + this.login);
}
// var Card = function(){
//     var title;
//     var imgUrl;
//     var getTitle = function(){
//         return title;
//     }
//     var getImageUrl = function(){
//         return imgUrl;
//     }
//     var setTitle = function(t){
//         title = t; 
//     }
//     var setImgUrl = function(t){
//         imgUrl = t;
//     }

//     return {
//         getTitle : getTitle,
//         getImageUrl : getImageUrl,
//         setImgUrl : setImgUrl,
//         setTitle : setTitle
//     }
// }