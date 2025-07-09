let clickCount = 0;
const MAX_CLICKS = 5;

// Disable form if already submitted
if (localStorage.getItem("submitted") === "true") {
  disableForm();
  document.getElementById("message").textContent = "🎉 You have already submitted. Thank you!";
}

function shareOnWhatsApp() {
  if (clickCount >= MAX_CLICKS) return;

  const websiteURL = " https://chanduravipati.github.io/tech_for_girls/";
  const message = encodeURIComponent(
    "👋 Hey Buddy!\nJoin the *Tech For Girls* Community 💫\n📩 Register now here:\n" + websiteURL
  );

  window.open(`https://wa.me/?text=${message}`, "_blank");

  clickCount++;
  document.getElementById("shareCount").textContent = `Click count: ${clickCount}/${MAX_CLICKS}`;

  if (clickCount === MAX_CLICKS) {
    alert("✅ Sharing complete. You may now submit the form.");
  }
}

document.getElementById("registrationForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  if (clickCount < MAX_CLICKS) {
    alert("⚠️ Please complete 5 WhatsApp shares before submitting.");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const fileInput = document.getElementById("screenshot");

  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);

  if (fileInput.files.length > 0) {
    formData.append("file", fileInput.files[0]);
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzLMVW0NFaqJ5nC7xevLiJfZVl9O_fmwjgQMbxYGoI2bhbIbzYhquNWjVL1QcipmQzfKQ/exec", {
      method: "POST",
      body: formData,
    });

    const resultText = await response.text();

    if (response.ok && resultText.includes("Success")) {
      document.getElementById("message").textContent =
        "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
      localStorage.setItem("submitted", "true");
      disableForm();
    } else {
      alert("❌ Submission failed. Server error. Please try again later.");
      console.error("Response:", resultText);
    }
  } catch (err) {
    alert("❌ Submission failed. Please check your internet or try again.");
    console.error("Error:", err);
  }
});

function disableForm() {
  const form = document.getElementById("registrationForm");
  Array.from(form.elements).forEach((el) => (el.disabled = true));
}
