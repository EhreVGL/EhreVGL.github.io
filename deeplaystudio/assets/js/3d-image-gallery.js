var radius = 345;
var autoRotate = true;
var rotateSpeed = -60;
var imgWidth = 280;
var imgHeight = 280;

setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid];

ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

var currentTransforms = [];

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    var transformValue = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transform = transformValue;
    currentTransforms[i] = transformValue;
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = (yes ? 'running' : 'paused');
}

var sX, sY, nX, nY, desX = 0,
  desY = 0,
  tX = 0,
  tY = 10;

if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

function isWithinFeatures(element) {
  while (element) {
    if (element.id === 'features') {
      return true;
    }
    element = element.parentElement;
  }
  return false;
}

document.onpointerdown = function(e) {
  if (!isWithinFeatures(e.target)) return;

  clearInterval(odrag.timer);
  e = e || window.event;
  sX = e.clientX;
  sY = e.clientY;

  this.onpointermove = function(e) {
    e = e || window.event;
    nX = e.clientX;
    nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function(e) {
    odrag.timer = setInterval(function() {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};

for (let i = 0; i < aEle.length; i++) {
  aEle[i].addEventListener('mouseover', function() {
    if (!isWithinFeatures(this)) return;

    playSpin(false); // Animasyonu durdur

    this.style.transition = "transform 0.5s"; 
    this.style.transform = currentTransforms[i] + " translateZ(20px) scale(1.8)"; 
  });

  aEle[i].addEventListener('mouseout', function() {
    if (!isWithinFeatures(this)) return;

    playSpin(true); // Animasyonu tekrar başlat

    this.style.transition = "transform 0.5s";
    this.style.transform = currentTransforms[i];
  });
}
