const data = [
    {
        place:'HUJAM22',
        title:'SPACE',
        title2:'FRONTIER',
        description:"Space frontier is a casual arcade game that orginaly maded for HUJAM22. The result of HUJAM'22 is , our game become Overeall #7 and Compatibility With The Theme #1 among 75 other games by voting. In this Arcade game you traveling in Space! Launch your SpaceShip and travel among other Planets , Portals and Astreoids.",
        image:'img/1-1.png',
        color: '114, 156, 113',
        c_link: 'https://github.com/satas20/HUJAM22',
        y_link: 'https://www.youtube.com/watch?v=HHih8q1bd_k'
    },  
    {
        place:'Prototype v0.1.0',
        title:'LEVEL GENERATOR',
        title2:'FROM IMAGE',
        description:"I have to do a lot of level design in some of the games I make with Unity. I created this project to move this process faster and complete many level designs in a short time. I have created v0.1.0 in this project that I am still developing and I am presenting it to you.",
        image:'img/2.png',
        color: '249, 203, 128',
        c_link: 'https://github.com/EhreVGL/UnityLevelGeneratorFromImage',
        y_link: 'https://www.youtube.com/watch?v=CyaP6tf7Qhw'
    },
    {
        place:'2D top-down shooter Game',
        title:'JOURNEY OF',
        title2:'THE WHO',
        description:"This project is a 2D top-down shooter game trial project I made with Unity. It is also a mini clone of the game Journey of The Prairie King. The purpose of doing this project was to plan the process of making a 2D top-down shooter game with Unity and to experience the entire game development process by trying out mechanics that could be suitable for this game. As a result, I created a short 2D top-down shooter game demo.",
        image:'img/3.png',
        color: '188, 51, 74',
        c_link: 'https://github.com/EhreVGL/UnityGameJourneyofTheWho',
        y_link: 'https://www.youtube.com/watch?v=S3d-a2jfV0w'
    },
    {
        place:'3D Hyper-Casual Mobile',
        title:'2 DIFFERENT TYPES:',
        title2:'HYPER-CASUAL',
        description:'I developed two 3D Hyper-Casual Mobile Game prototypes using Unity to experience the full game development process. The first project is a Runner Hyper-Casual game with five continuously looping levels. The second project is an Arcade-Idle Hyper-Casual game with ten levels featuring transitions. Both projects helped me experiment with suitable mechanics and gain valuable experience in Unity game development.',
        image:'img/4.png',
        color: '205, 205, 205',
        c_link: 'https://github.com/EhreVGL?tab=repositories',
        y_link: 'https://www.youtube.com/@onuraltunisik/videos'
    },
    {
        place:'C# Form Application',
        title:'5 DIFFERENT',
        title2:'GAMES',
        description:'At the beginning of my game development journey, I created five different C# Form Application games. These games are "2048", "Rock/Paper/Scissors", "Snake", "Matching Puzzle", and "Top-Down Shooter". Each of these projects helped me learn and improve my programming skills, particularly in C#. Developing these games provided me with valuable experience in game mechanics, user interface design, and logic implementation.',
        image:'img/5.png',
        color: '192, 249, 255',
        c_link: 'https://github.com/EhreVGL?tab=repositories',
        y_link: 'https://www.youtube.com/@onuraltunisik/videos'
    },
]

const _ = (id)=>document.getElementById(id)
const cards = data.map((i, index)=>`<div class="card" id="card${index}" style="background-image: url(${i.image})"  ></div>`).join('')



const cardContents = data.map((i, index)=>`<div class="card-content" id="card-content-${index}">
<div class="content-start"></div>
<div class="content-place">${i.place}</div>
<div class="content-title-1">${i.title}</div>
<div class="content-title-2">${i.title2}</div>

</div>`).join('')


const slideNumbers = data.map((_, index)=>`<div class="item" id="slide-item-${index}" >${index+1}</div>`).join('')
const activeCardWall = `<div class="card-wall" id="card-wall"></div>`

_('demo').innerHTML =  cards + cardContents + activeCardWall
_('slide-numbers').innerHTML =  slideNumbers


gsap.set(`#card-wall`, {
  position: 'absolute',
  opacity: 0,
  x: 0,
  y: 0,
  width: window.outerWidth,
  height: window.outerHeight,
  zIndex: 20,
});


const range = (n) =>
  Array(n)
    .fill(0)
    .map((i, j) => i + j);
const set = gsap.set;

function getCard(index) {
  return `#card${index}`;
}
function getCardContent(index) {
  return `#card-content-${index}`;
}
function getSliderItem(index) {
  return `#slide-item-${index}`;
}

function animate(target, duration, properties) {
  return new Promise((resolve) => {
    gsap.to(target, {
      ...properties,
      duration: duration,
      onComplete: resolve,
    });
  });
}

let order = [0, 1, 2, 3, 4];
let detailsEven = true;

let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let numberSize = 50;
const ease = "sine.inOut";
const mobileDeviceWidth = 431;
const { outerHeight: height, outerWidth: width } = window;

if(width <= mobileDeviceWidth) {
  cardWidth = (width / 11) * 5;
  cardHeight = height / 3;
  gap = (width - (cardWidth * 2));
}

function init() {
  const [active, ...rest] = order;
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

  if(width <= mobileDeviceWidth) {
    offsetTop = height - 300;
    offsetLeft = 0;
  }
  else{
    offsetTop = height - 430;
    offsetLeft = width - 830;
  }

  gsap.set("#pagination", {
    top: offsetTop - 100,
    left: offsetLeft,
    y: 200,
    opacity: 0,
    zIndex: 60,
  });
  gsap.set("nav", { y: -200, opacity: 0 });

  gsap.set(getCard(active), {
    x: 0,
    y: 0,
    width: window.outerWidth,
    height: window.outerHeight,
  });

  gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
  gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200, y: -100 });
  gsap.set(detailsInactive, { opacity: 0, zIndex: 12, y: -100 });
  gsap.set(`${detailsInactive} .text`, { y: 100 });
  gsap.set(`${detailsInactive} .title-1`, { y: 100 });
  gsap.set(`${detailsInactive} .title-2`, { y: 100 });
  gsap.set(`${detailsInactive} .desc`, { y: 50 });
  gsap.set(`${detailsInactive} .cta`, { y: 60 });

  gsap.set(".progress-sub-foreground", {
    width: 500 * (1 / order.length) * (active + 1),
  });

  if(width <= mobileDeviceWidth) {
    rest.forEach((i, index) => {
      if(i <= 2) {
        
        gsap.set(getCard(i), {
          x: offsetLeft + index * (cardWidth + gap),
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
          display: 'block',
        });
        gsap.set(getCardContent(i), {
          x: offsetLeft + index * (cardWidth + gap),
          zIndex: 40,
          y: offsetTop + cardHeight - 100,
          display: 'block',
        });
        gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
      }
      else {
        gsap.set(getCard(i), {
          x: offsetLeft + 400 + index * (cardWidth + gap),
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
          display: 'none',
        });
        gsap.set(getCardContent(i), {
          x: offsetLeft + 400 + index * (cardWidth + gap),
          zIndex: 40,
          y: offsetTop + cardHeight - 100,
          display: 'none',
        });
        gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
      }
    });
  } else {
    rest.forEach((i, index) => {
      gsap.set(getCard(i), {
        x: offsetLeft + 400 + index * (cardWidth + gap),
        y: offsetTop,
        width: cardWidth,
        height: cardHeight,
        zIndex: 30,
        borderRadius: 10,
      });
      gsap.set(getCardContent(i), {
        x: offsetLeft + 400 + index * (cardWidth + gap),
        zIndex: 40,
        y: offsetTop + cardHeight - 100,
      });
      gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
    });
  }

  gsap.set(".indicator", { x: -window.outerWidth });

  const startDelay = 0.6;

  gsap.to(".cover", {
    x: width + 400,
    delay: 0.5,
    ease,
    onComplete: () => {
      setTimeout(() => {
        loop();
      }, 500);
    },
  });
  rest.forEach((i, index) => {
    gsap.to(getCard(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 30,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
    gsap.to(getCardContent(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 40,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
  });
  if(width <= mobileDeviceWidth) {
    gsap.set("#pagination", { display:'none' });
    gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
    gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay, left: 30, top: 180, width: width - 100});
  }
  else {
    gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
    gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
    gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
  }
}

let clicks = 0;

function step() {
  return new Promise((resolve) => {
    if(isClickBack) {
        order.unshift(order.pop());
        isClickBack = false;
    } 
    else {order.push(order.shift());}

    detailsEven = !detailsEven;

    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

    document.querySelector(`${detailsActive} .place-box .text`).textContent =
      data[order[0]].place;
    document.querySelector(`${detailsActive} .title-1`).textContent =
      data[order[0]].title;
    document.querySelector(`${detailsActive} .title-2`).textContent =
      data[order[0]].title2;
    document.querySelector(`${detailsActive} .desc`).textContent =
      data[order[0]].description;
    document.querySelector(`${detailsActive} .cta .discover`).href =
      data[order[0]].c_link;
      document.querySelector(`${detailsActive} .cta .bookmark`).href =
        data[order[0]].y_link;
    document.documentElement.style.setProperty('--primary-color', data[order[0]].color);
    if(width<=mobileDeviceWidth) {
      gsap.set(detailsActive, { zIndex: 22, left: 30, top: 180, width: width - 100});
    }
    else {
      gsap.set(detailsActive, { zIndex: 22});
    }
    gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
    gsap.to(`${detailsActive} .text`, {
      y: 0,
      delay: 0.1,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-1`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-2`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .desc`, {
      y: 0,
      delay: 0.3,
      duration: 0.4,
      ease,
    });
    gsap.to(`${detailsActive} .cta`, {
      y: 0,
      delay: 0.35,
      duration: 0.4,
      onComplete: resolve,
      ease,
    });
    gsap.set(detailsInactive, { zIndex: 12 });

    const [active, ...rest] = order;
    const prv = rest[rest.length - 1];

    gsap.set(getCard(prv), { zIndex: 10 });
    gsap.set(getCard(active), { zIndex: 20 });
    gsap.to(getCard(prv), { scale: 1.5, ease });

    gsap.to(getCardContent(active), {
      y: offsetTop + cardHeight - 10,
      opacity: 0,
      duration: 0.3,
      ease,
    });
    gsap.to(getSliderItem(active), { x: 0, ease });
    gsap.to(getSliderItem(prv), { x: -numberSize, ease });
    gsap.to(".progress-sub-foreground", {
      width: 500 * (1 / order.length) * (active + 1),
      ease,
    });

    gsap.to(getCard(active), {
      x: 0,
      y: 0,
      ease,
      width: window.outerWidth,
      height: window.outerHeight,
      borderRadius: 0,
      onComplete: () => {
        const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
        gsap.set(getCard(prv), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
          scale: 1,
        });

        gsap.set(getCardContent(prv), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
        });
        gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

        gsap.set(detailsInactive, { opacity: 0 });
        gsap.set(`${detailsInactive} .text`, { y: 100 });
        gsap.set(`${detailsInactive} .title-1`, { y: 100 });
        gsap.set(`${detailsInactive} .title-2`, { y: 100 });
        gsap.set(`${detailsInactive} .desc`, { y: 50 });
        gsap.set(`${detailsInactive} .cta`, { y: 60 });
        clicks -= 1;
        if (clicks > 0) {
          step();
        }
      },
    });
    /* 
      Ekrana 2 tane kart sığdığı için diğer kartların display'ini none yapmaya çalıştım.
    */
    if(width <= mobileDeviceWidth) {
      rest.forEach((i, index) => {
        if (index < 2) {
          if (i !== prv) {
            const xNew = offsetLeft + index * (cardWidth + gap);
            gsap.set(getCard(i), { zIndex: 30 });
            gsap.to(getCard(i), {
              x: xNew,
              y: offsetTop,
              width: cardWidth,
              height: cardHeight,
              ease,
              delay: 0.1 * (index + 1),
              display: 'block',
            });

            gsap.to(getCardContent(i), {
              x: xNew,
              y: offsetTop + cardHeight - 100,
              opacity: 1,
              zIndex: 40,
              ease,
              delay: 0.1 * (index + 1),
              display: 'block',
            });
            gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
          }
        } 
        else {
          const xNew = offsetLeft + index * (cardWidth + gap);
          gsap.set(getCard(i), { zIndex: 30 });
          gsap.to(getCard(i), {
            x: xNew,
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            ease,
            delay: 0.1 * (index + 1),
            display: 'none',
          });

          gsap.to(getCardContent(i), {
            x: xNew,
            y: offsetTop + cardHeight - 100,
            opacity: 1,
            zIndex: 40,
            ease,
            delay: 0.1 * (index + 1),
            display: 'none',
          });
          gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
          
        }
      });
    } else {  
      rest.forEach((i, index) => {
        if (i !== prv) {
          const xNew = offsetLeft + index * (cardWidth + gap);
          gsap.set(getCard(i), { zIndex: 30 });
          gsap.to(getCard(i), {
            x: xNew,
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            ease,
            delay: 0.1 * (index + 1),
          });

          gsap.to(getCardContent(i), {
            x: xNew,
            y: offsetTop + cardHeight - 100,
            opacity: 1,
            zIndex: 40,
            ease,
            delay: 0.1 * (index + 1),
          });
          gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
        }
      });
    }
  });
}

let clickEnable;
let isClickBack;
let indicator = document.querySelector('.indicator');

async function loop() {
  await animate(".indicator", 6, { x: 0 });
  await animate(".indicator", 0.8, { x: -window.outerWidth, delay: 0.3 });
  if(clickEnable) {
    clickEnable = false
    indicator.style.left = -window.outerWidth;
    loop();
    return;
  }
  await step();
  loop();
}

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function loadImages() {
  const promises = data.map(({ image }) => loadImage(image));
  return Promise.all(promises);
}

async function start() {
  try {
    await loadImages();
    init();
  } catch (error) {
    console.error("One or more images failed to load", error);
  }
}

// İlk Adımı Başlat
start()

// İleri ve Geri butonlarına basıldığında çalışacak fonksiyonlar
document.getElementById('left-btn').addEventListener('click', ()=>{
  clickEnable = true;
  isClickBack = true;
  step();
});
document.getElementById('right-btn').addEventListener('click', ()=>{
  clickEnable = true;
  isClickBack = false;
  step();
});

// Kartlara tıklandığında o karta gitmesini sağlayan fonksiyon.
document.getElementById('demo').addEventListener('click', ()=> {
  const targetId = event.target.id;

  // tıklanan şeyin kart olduğu sorgulanıyor.
  if(targetId.startsWith("card") && targetId != "card-wall") {
    const idSuffix = targetId.substring('card'.length); // kartın numarası alınıyor.

    let counter = 0;

    // kart sırası en öne getirilene kadar order öne çekiliyor.
    while (order[0] !== parseInt(idSuffix)) {
      
      counter++;
      if(counter > 10) {break;}
      order.push(order.shift());
    }
    order.push(order.shift());
    
    //animasyon tekrarlanıyor.
    clickEnable = true;
    isClickBack = true;
    step();
  }

})

document.addEventListener('DOMContentLoaded', function() {
  const discoverButton = document.querySelector(`.cta .discover`);
  if (discoverButton) {
      discoverButton.addEventListener('click', function() {
          console.log('Discover button clicked');
      });
  } else {
      console.error('Discover button not found');
  }
});