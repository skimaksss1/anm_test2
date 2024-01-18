document.getElementById('genpage').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });

      loadAdminGen('ru','#genTextRu','#capTextRu');
  });

  document.getElementById('genproduct').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });

      loadAdminGenProduct('ru','#genProductTextRu');
      loadAdminGenProductName('ru','#genProductNameRu','1','+');
      
  });

  document.getElementById('atc').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });

      loadAdminGenAbout('ru','#genAboutTitleRu','#genAboutTextRu');
      loadAdminGenPlus('ru','#genCompanyPlusTitleRu','#genCompanyPlusDescriptionRu','1','+');
  });

  document.getElementById('history').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });
      loadHistoryAdmin('ru','#custom-nav-home2');
  });

  document.getElementById('partners').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });
      loadPartners('#custom-nav-home2');
  });

  function checkAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Пользователь авторизован
        console.log('Пользователь авторизован');
      } else {
        // Пользователь не авторизован
        console.log('Пользователь не авторизован');
        window.location.replace("auth/auth.html");
      }
    });
  }

  document.getElementById('contact').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });
      // loadPartners('#custom-nav-home2'); 
      loadContact('ru', '#cardPhoneRu','number');
      loadContact('ru', '#cardOtherRu','other');
      loadCardTitle('#TitleCardRu','#TitleCardEn','#TitleCardKz');
      loadCardAdres('#adressCardDownRu','#adressCardDownEn','#adressCardDownKz');
      loadCardSsil('#instaCard','#webCard');
  });
  document.getElementById('footer').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });
      loadRekvizidCardTitle('#RekvizidCardRu','#RekvizidCardEn','#RekvizidCardKz');
  });
  document.getElementById('certifacate').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });
      loadCert('#certCard');
      // loadRekvizidCardTitle('#RekvizidCardRu','#RekvizidCardEn','#RekvizidCardKz');
  });
  document.getElementById('news').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });
      loadNews('#fullNews');
      // loadCert('#certCard');
      // loadRekvizidCardTitle('#RekvizidCardRu','#RekvizidCardEn','#RekvizidCardKz');
  });

  document.getElementById('vacans').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });
      loadVacans('#fullVacan');
  });
  document.getElementById('product').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });
      loadFullProduct('#fullPrd');
      loadTypeProductSelect('#select');
      
      // loadNews('#fullNews');
      // loadCert('#certCard');
      // loadRekvizidCardTitle('#RekvizidCardRu','#RekvizidCardEn','#RekvizidCardKz');
  });
  document.getElementById('typeproduct').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });
      loadTypeProduct('#fullTypeProduct');
      // loadNews('#fullNews');
      // loadCert('#certCard');
      // loadRekvizidCardTitle('#RekvizidCardRu','#RekvizidCardEn','#RekvizidCardKz');
  });
  document.getElementById('type2product').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
        loadTypeProductSelect('#select');
      });
      
      loadPodType('#fullPodType');
  });
  document.getElementById('director').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });
      loadDirector('#certCard');
      // loadTypeProductSelect('#select');
      // loadNews('#fullNews');
      // loadCert('#certCard');
      // loadRekvizidCardTitle('#RekvizidCardRu','#RekvizidCardEn','#RekvizidCardKz');
  });
  document.getElementById('user').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });
      loadUser();
      // loadFullProduct('#fullPrd');
      // loadTypeProductSelect('#select');
      
      // loadNews('#fullNews');
      // loadCert('#certCard');
      // loadRekvizidCardTitle('#RekvizidCardRu','#RekvizidCardEn','#RekvizidCardKz');
  });
  window.addEventListener('load', function() {
    var element = document.getElementById('user');
    element.click();
  });