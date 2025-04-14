let dict = {}; // Global dictionary to store results per data-question

// Add event listeners to all radio buttons
document.querySelectorAll('input[type="radio"]').forEach(input => {
  input.addEventListener('change', () => {
    const questionDiv = input.closest('.question');
    const questionKey = questionDiv.getAttribute('data-question');
    const score = parseInt(input.value);

    dict[questionKey] = score;
  });
});

function getFinalScore() {
    document.getElementById("final-score").innerText = "Результат отримано. Введіть своє ім’я і натисніть «Надіслати в WhatsApp»";
  }
  

function sendResult() {
    const name = document.getElementById("name").value.trim();
    if (!name) {
      alert("Будь ласка, введіть ваше ім’я.");
      return;
    }
  
    const message = `Привіт! Я пройшов(ла) тест!\nІм’я: ${name}\nМій результат: ${JSON.stringify(dict)}`;
    const encodedMessage = encodeURIComponent(message);
    
    // Replace with your WhatsApp number if you want to direct it to specific chat:
    // e.g. `https://wa.me/380XXXXXXXXX?text=${encodedMessage}`
    const whatsappLink = `https://wa.me/380673120040?text=${encodedMessage}`;
  
    window.open(whatsappLink);
  }
