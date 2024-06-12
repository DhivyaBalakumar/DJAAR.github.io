document.querySelector('.sign-in-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
  
    fetch('http://localhost:3004/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Logged in!') {
        window.location.href = '/startform.html';
      } else {
        document.querySelector('.error-message').textContent = data.message;
      }
    })
    .catch(error => {
      document.querySelector('.error-message').textContent = 'Network error: ' + error;
    });
  });
  