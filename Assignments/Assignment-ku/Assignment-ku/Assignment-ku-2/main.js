    
var Registrations = function(){
   var performers = [];
   return {
       addPerformer : function(performer){performers.push(performer);},
       getAllPerformers : function(){return performers;},
       getPerformerByName : function(name){
           var per = null;
           $.each(performers, function(key, performer){
                if(performer.getName() === name){
                    console.log("performer with name " + name + " found.");
                    per = performer;
                }
           });
           if(per === null){ console.log("performer with name " + name + " NOT found."); }
           return per;
        },
       getPerformersByAct : function(act){
           //return performers whoes act[] contains act.
           var performersByAct = [];
           $.each(performers, function(key, performer){
                if(performer.getActs().includes(act)){
                    console.log("performer with act " + act + " found.");
                    performersByAct.push(performer);
                }
           });
            return performersByAct;
        }
   }
}

//create new registrations to store all performers.
var registrations = new Registrations();

var Performer = function(name){
    var name;
    var acts = []; 
    return {
        getName : function (){ return name;},
        getActs : function (){ return acts;},
        addAct : function (act){
            console.log("adding act " + act + " for performer "+ name)
            if(acts.includes(act) === false){ acts.push(act); }
        }
        
    }
}

$(document).ready(function(){

    $('.candidate').each(function(){
       $(this.children[2]).on("click", registerPerformance.bind(this));
    });

    $('.mainstage').children().each(function(){
        $(this.children[2]).on("click", start.bind(this));
     });
});

function start(){
    var target = this;
    this.children[3].innerHTML = "";
    var stageName = this.children[0].innerHTML;
    var performerAct = this.children[1].value;
    var performers = registrations.getPerformersByAct(performerAct);

    $.each(performers, function(index, performer){
        var performerName = performer.getName();
        
        comeToStage.call(target.children[3],stageName, performerAct, function perform(performerName,performerAct){
                                                                    return " & " + performerName + " is ready to do " + performerAct;
                                                                }.bind(this, performerName, performerAct));
    }) 
    console.log("called by " + $(this).attr('class'));
}
function comeToStage(stageName,activityName,perform){
    //console.log("-----in comeToStage-----");
    //console.log("stageName "+ stageName + " activityName "+ activityName + " perform " + perform);
    this.innerHTML = this.innerHTML + "<br>" +stageName + " is reserved for activity " + activityName + perform(); 
}

function registerPerformance(){
    var performer;
    var name = this.children[0].innerHTML;
    var act = this.children[1].value;

    if(registrations.getPerformerByName(name) === null){
        performer = new Performer(name);
        registrations.addPerformer(performer);
    }else{
        performer = registrations.getPerformerByName(name);
    }
    performer.addAct(act);
    console.log("new performer/act added.");
}

