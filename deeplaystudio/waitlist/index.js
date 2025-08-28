function validateAndSubmitForm(sectionId) {
  var form = document.querySelector('form'); // Form seçicinizi buraya yazın
  var emailInput = form.querySelector('input[type="email"]'); // E-posta input seçicinizi buraya yazın
  var nextSection = document.getElementById(sectionId);

  form.onsubmit = function(event) {
    // Form gönderme işlemini durdur
    event.preventDefault();

    // E-posta adresi geçerli mi kontrol et
    if(emailInput.checkValidity()) {
      // E-posta adresi geçerli ise formu gönder
      // Burada form verilerini işleyebilir veya AJAX ile sunucuya gönderebilirsiniz

      // Form gönderildikten sonra bir sonraki bölüme geç
      showSection(sectionId);
    } else {
      // E-posta adresi geçerli değilse kullanıcıyı uyar
      emailInput.focus(); // Kullanıcıyı inputa odakla
    }
  };

  // Form gönder butonuna basıldığında formu gönder
  form.querySelector('button[type="submit"]').click();
}


