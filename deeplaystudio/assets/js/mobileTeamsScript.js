let slider2 ;
let angleOffset2 = 0 ;
let unitAngle2 ;
let lastMousePosition2 ;
let curMousePosition2 ;
let deltaMouse2 ;
let clock2 ;
let lastFrameTime2 = NaN ;
let velocity2 = 0;
let meanPosition2 = 0 ;
let position2 = 0;
const springConstant2 = 80 ;
const sliderMass2 = 1 ;
const dampingForce2 = 10 ;
const acceleration2 = -60 ;
const mouseSensitivity2 = 0.2 ;
const touchSensitivity2 = 0.25 ;
const MAX_velocity2 = 1000 ;


window.onload = () => {
  // Mevcut başlangıç kodları
  let cards2 = [...document.querySelectorAll(".mobile-teams-card")];
  slider2 = document.querySelector(".mobile-teams-circular-slider");
  mobile_teams_distribute(cards2);
  document.querySelector('.mobile-teams-wrapper').addEventListener("mousedown",mobile_teams_handleMouseDown);
  document.querySelector('.mobile-teams-wrapper').addEventListener("touchstart",mobile_teams_handleTouchStart);
  document.querySelector('.mobile-teams-wrapper').addEventListener("touchmove",mobile_teams_handleTouchMove);
  document.querySelector('.mobile-teams-wrapper').addEventListener("touchend",mobile_teams_handleTouchEnd);
  document.querySelector('.mobile-teams-wrapper').addEventListener("wheel",mobile_teams_throttle(mobile_teams_handleWheel,300));

  // Add click event listener to each card
  document.querySelectorAll('.mobile-teams-card').forEach(card => {
    card.addEventListener('click', function(event) {
        // Stop the event from propagating to the document
        event.stopPropagation();

        // Remove 'enlarged-card' class from all cards
        mobile_teams_removeEnlargedClassFromAll();
        
        // Get current transform style and append scale(1.6)
        let currentTransform = window.getComputedStyle(this).transform;

        console.log(currentTransform);
        this.style.transform = currentTransform + ' scale(1.3)';

        // Toggle 'enlarged-card' class on clicked card
        this.classList.add('mobile-teams-enlarged-card');        
    });
  });
};

// Function to remove 'enlarged-card' class from all cards
function mobile_teams_removeEnlargedClassFromAll() {
  // Select all elements with the 'enlarged-card' class
  let enlargedCards = document.querySelectorAll('.mobile-teams-card');
  mobile_teams_distribute(enlargedCards);
  enlargedCards.forEach(element => {

    // Remove the 'enlarged-card' class
    element.classList.remove('mobile-teams-enlarged-card');
  });
}
// Add click event listener to the document
document.addEventListener('click', function() {
  // Remove 'enlarged-card' class from all cards when clicking outside
  mobile_teams_removeEnlargedClassFromAll();
});

function mobile_teams_handleMouseDown(event){
    mobile_teams_cancelAnimation();
    lastMousePosition2 = event.clientX ;
    curMousePosition2 = event.clientX ;
    deltaMouse2 = 0 ;
    window.addEventListener("mousemove",mobile_teams_handleMouseMove);
    window.addEventListener("mouseup",mobile_teams_handleMouseUp);
}

function mobile_teams_handleMouseMove(event){
    curMousePosition2 = event.clientX ;
    let delta = lastMousePosition2 - curMousePosition2;
    deltaMouse2 = curMousePosition2 - lastMousePosition2 ;
    lastMousePosition2 = curMousePosition2 ;
    angleOffset2 += delta * mouseSensitivity2 ;
    lastMouseMoveTime = Date.now();
    setAngleOffset(angleOffset2);
}

function mobile_teams_handleMouseUp(){
    window.removeEventListener("mousemove",mobile_teams_handleMouseMove);
    window.removeEventListener("mouseup",mobile_teams_handleMouseUp);
    meanPosition2 = roundToFactor2(angleOffset2,unitAngle2) ;
    velocity2 = - deltaMouse2 * 50 * mouseSensitivity2 ;
    position2 = angleOffset2 ;
    clock2 = requestAnimationFrame(mobile_teams_spin);
}

function mobile_teams_handleTouchStart(event){
    mobile_teams_cancelAnimation();
    lastMousePosition2 = event.touches[0].clientX ;
    curMousePosition2 = event.touches[0].clientX ;
    deltaMouse2 = 0 ;
}

function mobile_teams_handleTouchMove(event){
    curMousePosition2 = event.touches[0].clientX ;
    let delta = lastMousePosition2 - curMousePosition2;
    deltaMouse2 = curMousePosition2 - lastMousePosition2 ;
    lastMousePosition2 = curMousePosition2 ;
    angleOffset2 += delta * touchSensitivity2 ;
    setAngleOffset(angleOffset2);
}

function mobile_teams_handleTouchEnd(){
    meanPosition2 = roundToFactor2(angleOffset2,unitAngle2) ;
    velocity2 = - deltaMouse2 * 50 * touchSensitivity2 ;
    position2 = angleOffset2 ;
    clock2 = requestAnimationFrame(mobile_teams_spin);
}

let decayClock2 = 0;

function mobile_teams_throttle(fn, wait) {
    var time = Date.now();
    return function(event) {
      if ((time + wait - Date.now()) < 0) {
        fn(event);
        time = Date.now();
      }
    }
}

function mobile_teams_handleWheel(event){
    mobile_teams_cancelAnimation();
    velocity2 += 100 * Math.sign(event.deltaY) ;
    clock2 = requestAnimationFrame(mobile_teams_spin);
}


let roundToFactor2 = (value,factor) => Math.round(value/factor)*factor ;

function mobile_teams_distribute(cards2) {
    if(cards2.length == 0) 
        return ;
    let angle = Math.PI*2/cards2.length ;
    unitAngle2 = 360 / cards2.length ;
    let radius = cards2[0].offsetWidth/(2*Math.tan(angle/2)) + 16;
    slider2.style.transformOrigin = `center center ${-radius}px` ;
    cards2.forEach((card,index)=> {
        let tiltAngle = index*angle ;
        let deltaZ = radius * (1 - Math.cos(tiltAngle));
        let deltaY = radius * Math.sin(tiltAngle) ;
        card.style.transform = `
            translate3d(${deltaY}px,0px,${-deltaZ}px)
            rotateY(${tiltAngle*180/Math.PI}deg)
        ` ;
    });
}

function setAngleOffset(newOffset){
    angleOffset2 = newOffset ;
    slider2.style.transform = `rotateY(${-angleOffset2}deg)` ;
}

function mobile_teams_snap(currentFrameTime){
    lastFrameTime2 = lastFrameTime2 || (currentFrameTime ) ;
    let deltaTime = (currentFrameTime - lastFrameTime2)/1000 ;

    let displacement = position2 - meanPosition2 ;
    let netForce = - displacement * springConstant2 - velocity2*dampingForce2 ;
    let acceleration2 = netForce / sliderMass2 ;
    velocity2 += acceleration2 * deltaTime ;
    position2 += velocity2 * deltaTime ;
    angleOffset2 = position2 ;
    setAngleOffset(angleOffset2);

    lastFrameTime2 = currentFrameTime ;
    if(Math.abs(acceleration2) > 0.1 ){
        clock2 = requestAnimationFrame(mobile_teams_snap);
    } else {
        meanPosition2 = roundToFactor2(angleOffset2,unitAngle2);
        angleOffset2 = meanPosition2 ;
        lastFrameTime2 = NaN ;
        animating = false ;
    }
}

function mobile_teams_cancelAnimation(){
    cancelAnimationFrame(clock2);
    lastFrameTime2 = NaN ;
}

function mobile_teams_spin(currentFrameTime){
    lastFrameTime2 = lastFrameTime2 || (currentFrameTime ) ;
    let deltaTime = (currentFrameTime - lastFrameTime2)/1000 ;

    velocity2 += Math.sign(velocity2) * acceleration2 * deltaTime ;
    angleOffset2 += velocity2 * deltaTime ;
    position2 = angleOffset2 ;
    setAngleOffset(angleOffset2);

    animating = true ;

    lastFrameTime2 = currentFrameTime ;
    if(Math.abs(velocity2) > 10){
        clock2 = requestAnimationFrame(mobile_teams_spin);
    } else {
        meanPosition2 = roundToFactor2(angleOffset2,unitAngle2);
        position2 = angleOffset2 ;
        lastFrameTime2 = NaN ;
        clock2 = requestAnimationFrame(mobile_teams_snap);
    }
}

(()=>{
var word ;
var orignal;
var text="";
const rotationGap = 4;
var clock22 ;
var j;
var l;
var c;
var p;

window.addEventListener("load",() => {
    word = document.querySelector(".name");
    orignal = `itsGoodBits`;
    l=orignal.length;
    j=c=p=0;
    clock22 = setInterval(mobile_teams_shuffle,30);
});

function mobile_teams_shuffle(){
    if(p-->0) return;
    text="";
    for(var k=0;k<j;k++) text += orignal[k];
    for(var k=j;k<j+4 && k<l;k++){
        text += String.fromCharCode(
            (Math.random()>0.5)?
            (Math.floor(Math.random()*26) + 65):
            (Math.floor(Math.random()*26) + 97)
        );
    }
    c++;
    if(c==rotationGap){
        c=0;
        j += 1;
    }
}
})();
