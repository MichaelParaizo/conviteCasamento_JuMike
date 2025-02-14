document.addEventListener("DOMContentLoaded", function() {
  // --- ANIMAÇÃO DA IMAGEM ---
  const heroImage = document.querySelector("#hero img");
  
  if (heroImage) {
    window.addEventListener("scroll", function() {
      let scrollPos = window.scrollY;
      heroImage.style.transform = `translateY(${scrollPos * 0.1}px)`;
    });
  }
  
  // --- CONTADOR REGRESSIVO ---
  function getTimeRemaining() {
    const weddingDate = new Date("July 15, 2025 16:00:00").getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
      isExpired: distance <= 0
    };
  }

  function updateCountdown() {
    const timer = getTimeRemaining();
    const countdownTimer = document.getElementById("countdown-timer");

    if (countdownTimer) {
      if (timer.isExpired) {
        countdownTimer.innerHTML = "<span>O grande dia chegou!</span>";
        clearInterval(countdownInterval);
      } else {
        countdownTimer.innerHTML = `
          <span>${timer.days} Dias</span>
          <span>${timer.hours} Horas</span>
          <span>${timer.minutes} Minutos</span>
          <span>${timer.seconds} Segundos</span>
        `;
      }
    }
  }

  updateCountdown(); // Chamada inicial
  const countdownInterval = setInterval(updateCountdown, 1000);

  // --- CORAÇÕES FLUTUANTES ---
  let heartCount = 0; // Contador para limitar o número de corações

  function createHeart() {
    const maxHearts = 5; // Limite máximo de corações na tela ao mesmo tempo
    const hearts = document.querySelectorAll('.heart');
  
    if (hearts.length >= maxHearts) {
      return; // Não cria mais corações se o limite for atingido
    }
  
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = '8s'; // Animação fixa para evitar aceleração
    heart.style.setProperty('--random-x', Math.random() * 200 - 100 + 'px'); // Movimento horizontal aleatório
    document.querySelector('header').appendChild(heart);
  
    // Remove o coração após a animação
    heart.addEventListener('animationend', () => heart.remove());
  }
  
  // Criar corações a cada 3 segundos
  setInterval(createHeart, 3000);  

  // --- RSVP FORM ---
  const rsvpForm = document.getElementById("rsvp-form");
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const nome = document.getElementById("nome").value;
      const presenca = document.getElementById("presenca").value;
      alert(`Obrigado, ${nome}! Sua resposta (${presenca}) foi registrada.`);
      rsvpForm.reset();
    });
  }
});
