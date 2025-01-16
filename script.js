// Function to verify the email and show processing state
function verifyFast() {
  const email = document.getElementById("fast-email").value;
  const resultDiv = document.getElementById("fast-result");
  const button = document.getElementById("fast-button");

  if (email) {
    // Show "Processing..." message and disable the button
    resultDiv.innerHTML = '<p class="processing">Processing...</p>';
    button.disabled = true;

    // Construct the API URL with the entered email
    const url = `https://api.99verifier.com/webhook/verify?email=${encodeURIComponent(email)}`;

    // Make the fetch request to the API
    fetch(url)
      .then(response => response.json()) // Parse the response as JSON
      .then(data => {
        // Clear previous result
        resultDiv.innerHTML = '';

        // Check if 'is_valid' is true or false and show the result
        if (data.is_valid === "true") {
          resultDiv.innerHTML = `<p>The email ${email} is valid.</p>`;
        } else if (data.is_valid === "false") {
          resultDiv.innerHTML = `<p>The email ${email} is invalid.</p>`;
        } else {
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
