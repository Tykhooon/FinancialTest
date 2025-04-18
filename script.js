// Global object to store scores per category
let egoScores = {};
let answered = 0;

// Add event listeners to all radio inputs
document.querySelectorAll('input[type="radio"]').forEach(input => {
  input.addEventListener('change', () => {
    const questionDiv = input.closest('.question');
    const category = questionDiv.getAttribute('data-question');
    const value = parseInt(input.value);

    // If category not set, initialize
    if (!egoScores[category]) {
      egoScores[category] = 0;
    }

    // Remove previous value for the same question if already selected
    const name = input.name;
    const previousInput = document.querySelector(`input[name="${name}"]:checked`);
    if (previousInput && previousInput !== input) {
      const previousValue = parseInt(previousInput.value);
      egoScores[category] -= previousValue;
    }

    // Add the new score
    egoScores[category] += value;
    answered++;
  });
});

function getFinalScore() {
  if (answered < 10) {
    // Show a message that not all questions have been answered
    document.getElementById("final-score").innerText = "Дайте відповідь на всі питання!";
    
    // Change the text color to red to highlight the error
    document.getElementById("final-score").style.color = "red";
    
    return; // Exit the function to prevent showing the score
  }

  let maxResult = 0;
  let maxCategory = "";

  for (let key in egoScores) {
    if (egoScores[key] > maxResult) {
      maxResult = egoScores[key];
      maxCategory = key;
    }
  }

  document.getElementById("final-score").innerText = 
    "Ваш максимальний результат: " + maxCategory + " – " + maxResult + "\n Введіть своє імʼя і натисніть Надіслати на WhatsApp";
  document.getElementById("final-score").style.color = "green";

}

function sendResult() {
  const name = document.getElementById("name").value.trim();
  if (!name) {
    alert("Please enter your name.");
    return;
  }

  let message = `привіт, ${name} завершив(ла) Его тест, \nРезультати: \n`;
  for (const [category, score] of Object.entries(egoScores)) {
    message += `${category}: ${score}\n`;
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/380673120040?text=${encodedMessage}`;
  window.location.href = whatsappLink;
}
