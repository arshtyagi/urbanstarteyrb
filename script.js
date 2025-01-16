function verifyFast() {
  const email = document.getElementById("fast-email").value;
  if (email) {
    alert(`Fast verification for ${email} completed instantly!`);
  } else {
    alert("Please enter a valid email address.");
  }
}

function verifyStandard() {
  const email = document.getElementById("standard-email").value;
  if (email) {
    alert(`Standard verification for ${email} will take up to 24 hours.`);
  } else {
    alert("Please enter a valid email address.");
  }
}
