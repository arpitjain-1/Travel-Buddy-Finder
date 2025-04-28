// Authentication Pages JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Function to handle login form submission
    const loginForm = document.querySelector('.auth-form');
    if (loginForm && window.location.pathname.includes('login')) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const email = document.getElementById('email')?.value;
        const password = document.getElementById('password')?.value;
  
        if (!email || !password) {
          showAlert('Please fill in all required fields', 'error');
          return;
        }
  
        try {
          const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
  
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || 'Login failed');
          }
  
          // Store token if needed (e.g., in localStorage)
          localStorage.setItem('token', data.token);
  
          showAlert('Login successful! Redirecting...', 'success');
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
          const token = localStorage.getItem('token');
          if (token) {
            fetch('/', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
            })
            .catch(error => {
              console.error('Error:', error);
            });
          }
        } catch (error) {
          console.error('Login error:', error);
          showAlert(error.message || 'Login failed', 'error');
        }
      });
    }
  
    // Toggle password visibility
    document.querySelectorAll('input[type="password"]').forEach((input) => {
      const parent = input.parentElement;
      const toggleBtn = document.createElement('i');
      toggleBtn.className = 'bx bx-hide password-toggle';
      Object.assign(toggleBtn.style, {
        position: 'absolute',
        right: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: '#aaa',
      });
  
      parent.appendChild(toggleBtn);
  
      toggleBtn.addEventListener('click', () => {
        input.type = input.type === 'password' ? 'text' : 'password';
        toggleBtn.className = `bx bx-${input.type === 'password' ? 'hide' : 'show'} password-toggle`;
      });
    });
  });
  
  // Alert function
  function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    Object.assign(alertDiv.style, {
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '12px 24px',
      borderRadius: '4px',
      zIndex: '9999',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    });
  
    const styles = {
      success: { bg: '#2ecc71', icon: 'bx-check-circle' },
      error: { bg: '#e74c3c', icon: 'bx-error-circle' },
      info: { bg: '#3498db', icon: 'bx-info-circle' },
    };
  
    const { bg, icon } = styles[type] || styles.info;
    Object.assign(alertDiv.style, {
      backgroundColor: bg,
      color: 'white',
    });
  
    alertDiv.innerHTML = `<i class='bx ${icon}'></i> ${message}`;
    document.body.appendChild(alertDiv);
  
    setTimeout(() => {
      alertDiv.style.opacity = '0';
      alertDiv.style.transition = 'opacity 0.5s ease';
      setTimeout(() => alertDiv.remove(), 500);
    }, 3000);
  }