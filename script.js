const answers = {}; // Store selected values for each question

// Add event listeners to all radio inputs
document.querySelectorAll('input[type="radio"]').forEach(input => {
  input.addEventListener('change', () => {
    const name = input.name; // e.g. "q1", "q2"
    const value = parseInt(input.value);
    answers[name] = value;
  });
});

// When user clicks "Get Score"
function getFinalScore() {
  let totalScore = 0;
  const numQuestions = document.querySelectorAll('.question').length;

  for (let i = 1; i <= numQuestions; i++) {
    totalScore += answers[`q${i}`] || 0; // 0 if not answered
  }

  document.getElementById("final-score").innerText = `Ваш загальний бал: ${totalScore}`;

  // return total score
}

function sendResult() {
    const name = document.getElementById("name").value.trim();
    if (!name) {
      alert("Будь ласка, введіть ваше ім’я.");
      return;
    }
  
    // Reuse the score or recalculate (you can skip this part if score already saved)
    let totalScore = 0;
    const numQuestions = document.querySelectorAll('.question').length;
    for (let i = 1; i <= numQuestions; i++) {
      totalScore += answers[`q${i}`] || 0;
    }
  
    const message = `Привіт! Я пройшов(ла) тест!\nІм’я: ${name}\nМій результат: ${totalScore}`;
    const encodedMessage = encodeURIComponent(message);
    
    // Replace with your WhatsApp number if you want to direct it to specific chat:
    // e.g. `https://wa.me/380XXXXXXXXX?text=${encodedMessage}`
    const whatsappLink = `https://wa.me/380673120040?text=${encodedMessage}`;
  
    window.open(whatsappLink, "_blank");
  }
  

