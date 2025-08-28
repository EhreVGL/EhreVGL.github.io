
$(document).ready(function() {
    $("header a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });
    $("footer a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });
    $(".flex-about a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var popUp = document.getElementById("openningPopUp");
    var closeBtn = document.getElementsByClassName("close")[0];

    // popUp pencereyi göster
    // popUp.style.display = "block";
    popUp.style.display = "none";

    // "x" butonuna tıklanırsa popUp pencereyi kapat
    closeBtn.onclick = function() {
        popUp.style.display = "none";
    }

    // popUp dışına tıklanırsa popUp pencereyi kapat
    window.onclick = function(event) {
        if (event.target == popUp) {
            popUp.style.display = "none";
        }
    }
});

document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const response = await fetch('https://us-central1-deeplaystudio.cloudfunctions.net/deeplaystudioFormSend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        alert('Mesaj gönderildi!');
    } else {
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
});

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        e.target.elements.name.value = '';
        e.target.elements.email.value = '';
        e.target.elements.message.value = '';
    });
}

function ayarlaMaksimumYukseklik() {
    // Belirtilen ID'ye sahip elemanı seç
    var container = document.getElementById('.header .menu');

    if(container) {
        // Alt elemanların sayısını bul
        var altElemanSayisi = container.children.length;

        // Maksimum yüksekliği hesapla (her bir alt eleman için 100px)
        var maksYukseklik = altElemanSayisi * 100;

        // Hesaplanan maksimum yüksekliği uygula
        container.style.maxHeight = maksYukseklik + 'px';
    }
}

// Örnek kullanım: 'myContainer' ID'li eleman için maksimum yüksekliği ayarla
ayarlaMaksimumYukseklik();

$(document).ready(function() {
 
    $("#owl-example").owlCarousel({
        nav: true, 
        items: 1,
        dots: false,
        smartSpeed: 300,
        autoplayTimeout: 400
    });

    });