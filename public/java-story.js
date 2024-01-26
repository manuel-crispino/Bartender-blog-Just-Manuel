var clicked=0;
var clickedCount=[];

$("#classics-cocktails-stories-btn").click(()=>{
    clicked++
    clickedCount.push(clicked)
   
$("#div-cards-classics-story-1,#div-cards-classics-story-2").removeClass("hide");


if(clickedCount.length%2==0){
    restoreHide()
    }
    
})

function restoreHide(){
    $("#div-cards-classics-story-1,#div-cards-classics-story-2").addClass("hide");
   
}