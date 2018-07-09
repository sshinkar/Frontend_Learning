
var Counter = function(){
    var value = 0;
    var arr = [];
    function addTarget(tar)
    {
        arr.push(tar);
    }
    return {
        getValue : function(){
            return value;
        },
        increment : function(currTarget){
            console.log("sdsdsd");
            value++;
            for(var i=0;i<arr.length;i++)
            {
                console.log("in for");
                arr[i].innerHTML = "Click me " + value;
            }
            currTarget.innerHTML = "Click me " + value;
        },
        addTarget: addTarget
    }
};

$(document).ready(function(){

    $('.button_set_1').each(function(){
        var counter = new Counter();
        counter.addTarget(this);
        $(this).on("click",counter.increment);
    });

    var commonCounter = new Counter();

    $('.button_set_2').each(function(){
        var currTarget = this;
        $(this).on("click", function(){commonCounter.increment(currTarget);})
    });

    var commonCounter2 = new Counter();
    $('.button_set_3').each(function(){
        commonCounter2.addTarget(this);
        $(this).on("click",commonCounter2.increment);
    });

});

