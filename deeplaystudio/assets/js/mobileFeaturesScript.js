let slider ;
let angleOffset = 0 ;
let unitAngle ;
let lastMousePosition ;
let curMousePosition ;
let deltaMouse ;
let clock ;
let lastFrameTime = NaN ;
let velocity = 0;
let meanPosition = 0 ;
let position = 0;
const springConstant = 80 ;
const sliderMass = 1 ;
const dampingForce = 10 ;
const acceleration = -60 ;
const mouseSensitivity = 0.2 ;
const touchSensitivity = 0.25 ;
const MAX_VELOCITY = 1000 ;


window.onload = () => {
  // Mevcut başlangıç kodları
  let cards = [...document.querySelectorAll(".mobile-features-card")];
  slider = document.querySelector(".mobile-features-circular-slider");
  mobile_features_distribute(cards);
  document.querySelector('.mobile-features-wrapper').addEventListener("mousedown",mobile_features_handleMouseDown);
  document.querySelector('.mobile-features-wrapper').addEventListener("touchstart",mobile_features_handleTouchStart);
  document.querySelector('.mobile-features-wrapper').addEventListener("touchmove",mobile_features_handleTouchMove);
  document.querySelector('.mobile-features-wrapper').addEventListener("touchend",mobile_features_handleTouchEnd);
  document.querySelector('.mobile-features-wrapper').addEventListener("wheel",mobile_features_throttle(mobile_features_handleWheel,300));

  // Add click event listener to each card
  document.querySelectorAll('.mobile-features-card').forEach(card => {
    card.addEventListener('click', function(event) {
        // Stop the event from propagating to the document
        event.stopPropagation();

        // Remove 'enlarged-card' class from all cards
        mobile_features_removeEnlargedClassFromAll();
        
        // Get current transform style and append scale(1.6)
        let currentTransform = window.getComputedStyle(this).transform;

        console.log(currentTransform);
        this.style.transform = currentTransform + ' scale(1.3)';

        // Toggle 'enlarged-card' class on clicked card
        this.classList.add('mobile-features-enlarged-card');        
    });
  });
};

// Function to remove 'enlarged-card' class from all cards
function mobile_features_removeEnlargedClassFromAll() {
  // Select all elements with the 'enlarged-card' class
  let enlargedCards = document.querySelectorAll('.mobile-features-card');
  console.log(enlargedCards);
  mobile_features_distribute(enlargedCards);
  enlargedCards.forEach(element => {

    // Remove the 'enlarged-card' class
    element.classList.remove('mobile-features-enlarged-card');
  });
}
// Add click event listener to the document
document.addEventListener('click', function() {
  // Remove 'enlarged-card' class from all cards when clicking outside
  mobile_features_removeEnlargedClassFromAll();
});

function mobile_features_handleMouseDown(event){
    mobile_features_cancelAnimation();
    lastMousePosition = event.clientX ;
    curMousePosition = event.clientX ;
    deltaMouse = 0 ;
    window.addEventListener("mousemove",mobile_features_handleMouseMove);
    window.addEventListener("mouseup",mobile_features_handleMouseUp);
}

function mobile_features_handleMouseMove(event){
    curMousePosition = event.clientX ;
    let delta = lastMousePosition - curMousePosition;
    deltaMouse = curMousePosition - lastMousePosition ;
    lastMousePosition = curMousePosition ;
    angleOffset += delta * mouseSensitivity ;
    lastMouseMoveTime = Date.now();
    setAngleOffset(angleOffset);
}

function mobile_features_handleMouseUp(){
    window.removeEventListener("mousemove",mobile_features_handleMouseMove);
    window.removeEventListener("mouseup",mobile_features_handleMouseUp);
    meanPosition = roundToFactor(angleOffset,unitAngle) ;
    velocity = - deltaMouse * 50 * mouseSensitivity ;
    position = angleOffset ;
    clock = requestAnimationFrame(mobile_features_spin);
}

function mobile_features_handleTouchStart(event){
    mobile_features_cancelAnimation();
    lastMousePosition = event.touches[0].clientX ;
    curMousePosition = event.touches[0].clientX ;
    deltaMouse = 0 ;
}

function mobile_features_handleTouchMove(event){
    curMousePosition = event.touches[0].clientX ;
    let delta = lastMousePosition - curMousePosition;
    deltaMouse = curMousePosition - lastMousePosition ;
    lastMousePosition = curMousePosition ;
    angleOffset += delta * touchSensitivity ;
    setAngleOffset(angleOffset);
}

function mobile_features_handleTouchEnd(){
    meanPosition = roundToFactor(angleOffset,unitAngle) ;
    velocity = - deltaMouse * 50 * touchSensitivity ;
    position = angleOffset ;
    clock = requestAnimationFrame(mobile_features_spin);
}

let decayClock = 0;

function mobile_features_throttle(fn, wait) {
    var time = Date.now();
    return function(event) {
      if ((time + wait - Date.now()) < 0) {
        fn(event);
        time = Date.now();
      }
    }
}

function mobile_features_handleWheel(event){
    mobile_features_cancelAnimation();
    velocity += 100 * Math.sign(event.deltaY) ;
    clock = requestAnimationFrame(mobile_features_spin);
}


let roundToFactor = (value,factor) => Math.round(value/factor)*factor ;

function mobile_features_distribute(cards) {
    if(cards.length == 0) 
        return ;
    let angle = Math.PI*2/cards.length ;
    unitAngle = 360 / cards.length ;
    let radius = cards[0].offsetWidth/(2*Math.tan(angle/2)) + 16;
    
    slider.style.transformOrigin = `center center ${-radius}px` ;
    cards.forEach((card,index)=> {
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
    angleOffset = newOffset ;
    slider.style.transform = `rotateY(${-angleOffset}deg)` ;
}

function mobile_features_snap(currentFrameTime){
    lastFrameTime = lastFrameTime || (currentFrameTime ) ;
    let deltaTime = (currentFrameTime - lastFrameTime)/1000 ;

    let displacement = position - meanPosition ;
    let netForce = - displacement * springConstant - velocity*dampingForce ;
    let acceleration = netForce / sliderMass ;
    velocity += acceleration * deltaTime ;
    position += velocity * deltaTime ;
    angleOffset = position ;
    setAngleOffset(angleOffset);

    lastFrameTime = currentFrameTime ;
    if(Math.abs(acceleration) > 0.1 ){
        clock = requestAnimationFrame(mobile_features_snap);
    } else {
        meanPosition = roundToFactor(angleOffset,unitAngle);
        angleOffset = meanPosition ;
        lastFrameTime = NaN ;
        animating = false ;
    }
}

function mobile_features_cancelAnimation(){
    cancelAnimationFrame(clock);
    lastFrameTime = NaN ;
}

function mobile_features_spin(currentFrameTime){
    lastFrameTime = lastFrameTime || (currentFrameTime ) ;
    let deltaTime = (currentFrameTime - lastFrameTime)/1000 ;

    velocity += Math.sign(velocity) * acceleration * deltaTime ;
    angleOffset += velocity * deltaTime ;
    position = angleOffset ;
    setAngleOffset(angleOffset);

    animating = true ;

    lastFrameTime = currentFrameTime ;
    if(Math.abs(velocity) > 10){
        clock = requestAnimationFrame(mobile_features_spin);
    } else {
        meanPosition = roundToFactor(angleOffset,unitAngle);
        position = angleOffset ;
        lastFrameTime = NaN ;
        clock = requestAnimationFrame(mobile_features_snap);
    }
}

(()=>{
var word ;
var orignal;
var text="";
const rotationGap = 4;
var clock2 ;
var j;
var l;
var c;
var p;

window.addEventListener("load",() => {
    word = document.querySelector(".name");
    orignal = `itsGoodBits`;
    l=orignal.length;
    j=c=p=0;
    clock2 = setInterval(mobile_features_shuffle,30);
});

function mobile_features_shuffle(){
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


















