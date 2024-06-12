document.querySelector('.signup-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const phone = formData.get('phone');
  const cpass = formData.get('cpass');

  if (password !== cpass) {
      // Passwords don't match, show an error message
      document.querySelector('.error-message').textContent = 'Passwords do not match. Please re-enter the confirmation password.';
      return; // Stop further execution
  }

  fetch('http://localhost:3005/signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, phone })
  })
  .then(response => response.json())
  .then(data => {
      if (data.message === 'Account created!') {
          window.location.href = '/login2.html';
      } else {
          document.querySelector('.error-message').textContent = data.message;
      }
  })
  .catch(error => {
      document.querySelector('.error-message').textContent = 'Network error: ' + error;
  });
});
