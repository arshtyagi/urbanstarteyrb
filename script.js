// Function to verify the email and show processing state
function verifyFast() {
  const email = document.getElementById("fast-email").value;
  const resultDiv = document.getElementById("fast-result");
  const button = document.getElementById("fast-button");

  if (email) {
    // Show "Processing..." message and disable the button
    resultDiv.innerHTML = '<p class="processing">Processing...</p>';
    resultDiv.classList.remove('valid', 'invalid', 'catch-all', 'maybe'); // Remove previous result classes
    button.disabled = true;

    // Construct the API URL with the entered email
    const url = `https://api.99verifier.com/webhook/verify?email=${encodeURIComponent(email)}`;

    // Make the fetch request to the API
    fetch(url)
      .then(response => response.json()) // Parse the response as JSON
      .then(data => {
        // Clear previous result
        resultDiv.innerHTML = '';

        // Check the 'status' field and show the result
        switch (data.status) {
          case "valid":
            resultDiv.innerHTML = `<p>The email ${email} is valid.</p>`;
            resultDiv.classList.add('valid'); // Add 'valid' class for styling
            break;
          case "invalid":
            resultDiv.innerHTML = `<p>The email ${email} is invalid.</p>`;
            resultDiv.classList.add('invalid'); // Add 'invalid' class for styling
            break;
          case "catch-all":
            resultDiv.innerHTML = `<p>The email ${email} is a catch-all.</p>`;
            resultDiv.classList.add('catch-all'); // Add 'catch-all' class for styling
            break;
          case "maybe":
            resultDiv.innerHTML = `<p>The email ${email} status is uncertain (maybe).</p>`;
            resultDiv.classList.add('maybe'); // Add 'maybe' class for styling
            break;
          default:
            resultDiv.innerHTML = `<p>There was an issue verifying the email ${email}.</p>`;
        }
      })
      .catch(error => {
        // Handle errors that occur during the fetch request
        console.error('Error verifying email:', error);
        resultDiv.innerHTML = '<p>There was an error with the email verification. Please try again later.</p>';
      })
      .finally(() => {
        // Re-enable the button after the request completes
        button.disabled = false;
      });
  } else {
    resultDiv.innerHTML = '<p>Please enter a valid email address.</p>';
  }
}

// Event listener to trigger verification when the Enter key is pressed
document.getElementById("fast-email").addEventListener("keydown", function(event) {
  // Check if Enter key (key code 13) is pressed
  if (event.key === "Enter") {
    event.preventDefault();  // Prevent form submission if inside a form
    verifyFast();  // Trigger the verification
  }
});

// Event listener to trigger verification when the button is clicked
document.getElementById("fast-button").addEventListener("click", function() {
  verifyFast();  // Trigger the verification when the button is clicked
});
