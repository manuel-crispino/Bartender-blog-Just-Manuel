
var clicked = 0;
var clickedCount = [];



$("#classics-cocktails-btn").click(() => {
    clicked++;
     clickedCount.push(clicked)

    $("#shaker-img-classics").addClass("shake-animation");

    $("#shaker-img-classics")
        .addClass("flip")
        .delay(2000);

    if (clickedCount.length % 2 === 0) {
        restoreHide()
    } else {
        playAudioShaker()
        setTimeout(() => {
            $("#div-cards-classics-1,#div-cards-classics-2").removeClass("hide")
        }, 500);
    }
})

function restoreHide() {
    $("#div-cards-classics-1,#div-cards-classics-2").addClass("hide");
    $("#shaker-img-classics").removeClass("shake-animation");
    $("#shaker-img-classics").removeClass("flip");

}

function playAudioShaker() {
    var myAudio = new Audio('sounds/shaker.mp3');
    myAudio.play();

    myAudio.playbackRate = 8.0;

}
