$(document).ready(function(){
    if (window.innerWidth <= 1400) {
        // Ekran genişliği 768px veya daha küçükse bu kod çalışır
        $(".team-container").owlCarousel({
            items: 2, // Aynı anda kaç öğenin görüntüleneceğini ayarlayın
            autoplay: true,  // Otomatik kaydırma
            autoplayTimeout: 3000,  // 3 saniyede bir kaydır
            autoplaySpeed: 1000,  // Animasyon hızı
            nav: false, // Navigasyon okları
            loop: true, // Slaytların döngüde olup olmadığı
            autoHeight: false,  // Otomatik yükseklik ayarını kapatır
    
        });    
    } else {
        // Ekran genişliği 768px'den büyükse bu kod çalışır
        $(".team-container").owlCarousel({
            items: 3, // Aynı anda kaç öğenin görüntüleneceğini ayarlayın
            autoplay: true,  // Otomatik kaydırma
            autoplayTimeout: 3000,  // 3 saniyede bir kaydır
            autoplaySpeed: 1000,  // Animasyon hızı
            nav: false, // Navigasyon okları
            loop: true, // Slaytların döngüde olup olmadığı
            autoHeight: false,  // Otomatik yükseklik ayarını kapatır
        });    
    }
});