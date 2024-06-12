const form = document.getElementById('startup-form');

form.addEventListener('submit', (event) => {
  const requiredFields = form.querySelectorAll('input[required], textarea[required]');
  let emptyField = false;

  for (const field of requiredFields) {
    if (field.value.trim() === '') {
      emptyField = true;
      field.classList.add('error'); // Add error class for styling
    } else {
      field.classList.remove('error'); // Remove error class if valid
    }
  }
  });
