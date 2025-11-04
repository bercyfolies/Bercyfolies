function openPopup() {
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}
function validateLogin() {
    const telephone = document.getElementById('telephone').value;
    const password = document.getElementById('password').value;

    // Requête AJAX pour vérifier le couple téléphone/mot de passe dans la base de données
    fetch('http://176.185.182.77/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telephone: telephone, password: password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.valid) {
            alert('Connexion réussie !');
            closePopup();
        } else {
            alert('Numéro de téléphone ou mot de passe incorrect.');
        }
    })
    .catch((error) => {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de la connexion.');
    });
}