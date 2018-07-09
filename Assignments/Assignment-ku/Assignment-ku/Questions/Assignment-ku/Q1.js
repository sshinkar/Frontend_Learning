
var Counter = function(){
    var value = 0;
    return {
        getValue : function(){
            return value;
        },
        increment : function(){
            value++;
        }
    }
};

$(document).ready(function(){
    //document.getElementById("div_1-btn_1").addEventListener("click", incrementPrivateCounter.bind(new Counter()));
    //document.getElementById("div_1-btn_2").addEventListener("click", incrementPrivateCounter.bind(new Counter()));
    //document.getElementById("div_1-btn_3").addEventListener("click", incrementPrivateCounter.bind(new Counter())); 

    $('.button_set_1').each(function(){
        $(this).on("click",incrementPrivateCounter.bind(new Counter()));
    });

    var commonCounter = new Counter();
    $(".button_set_2").on("click",  incrementCommonCounter.bind(commonCounter));

    var commonCounter2 = new Counter();
    $(".button_set_3").on("click",  incrementCommonCounter.bind(commonCounter2, true));
});

function incrementPrivateCounter(event){
    //console.log("before increment " + this.getValue());
    this.increment();
    console.log("after increment " + this.getValue());
    //console.log("event.target " + event.target);
   $(event.target).text("click me " + this.getValue());
}

function incrementCommonCounter(event, changeTxtForAll){
    //console.log("before increment " + this.getValue());
    this.increment();
    console.log("after increment " + this.getValue());
    //console.log("event.target " + event.target);
   
   if(changeTxtForAll){
    $(".button_set_3").text("click me " + this.getValue());
   }else{
    $(event.target).text("click me " + this.getValue());
   }
}