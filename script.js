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
       if (data.prenom) {
               // Fermer la première popup
                closePopup();
                // Afficher une popup de bienvenue avec le prénom
                showWelcomePopup(data.prenom, password, telephone);
            } else {
                alert('Prénom non trouvé.');
            }
        } else {
            alert('Numéro de téléphone ou mot de passe incorrect.');
        }
    })
    .catch((error) => {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de la connexion.');
    });
}

function showWelcomePopup(prenom, password, telephone) {
    // Créer une nouvelle popup de bienvenue
    const welcomePopup = document.createElement('div');
    welcomePopup.className = 'welcome-popup';

    let welcomeMessage = `Bienvenue ${prenom}`;
    if (password === '123456') {
        welcomeMessage += `<br><br>Première connexion ? Changer votre mot de passe.`;
    }

    welcomePopup.innerHTML = `
        <div class="welcome-popup-content">
            <span class="close" onclick="closeWelcomePopup()">&times;</span>
            <h2>${welcomeMessage}</h2>
            <p>Téléphone: ${telephone}</p>
            <p>Mot de passe: ${password}</p>
            <button onclick="closeWelcomePopup()">OK</button>
        </div>
    `;

    // Ajouter la popup de bienvenue au corps du document
    document.body.appendChild(welcomePopup);

      // Fonction pour fermer la popup de bienvenue
    window.closeWelcomePopup = function() {
        document.body.removeChild(welcomePopup);
        if (password === '123456') {
            // Ouvrir la popup pour modifier le mot de passe
            showChangePasswordPopup(telephone, currentPassword);
        } else {
            // Ouvrir la page web menu
            window.location.href = 'menu.html';
        }
    };
}
function showWelcomePopup(prenom, password, telephone) {
    // Créer une nouvelle popup de bienvenue
    const welcomePopup = document.createElement('div');
    welcomePopup.className = 'welcome-popup';

    let welcomeMessage = `Bienvenue ${prenom}`;
    let isFirstLogin = password === '123456';

    if (isFirstLogin) {
        welcomeMessage += `<br><br><strong>Première connexion ?</strong><br>Veuillez changer votre mot de passe.`;
    }

    welcomePopup.innerHTML = `
        <div class="welcome-popup-content">
            <span class="close" onclick="closeWelcomePopup(${isFirstLogin}, '${telephone}')">&times;</span>
            <h2>${welcomeMessage}</h2>
            <button onclick="closeWelcomePopup(${isFirstLogin}, '${telephone}')">OK</button>
        </div>
    `;

    document.body.appendChild(welcomePopup);
}

function closeWelcomePopup(isFirstLogin, telephone) {
    const popup = document.querySelector('.welcome-popup');
    if (popup) document.body.removeChild(popup);

    if (isFirstLogin) {
        showChangePasswordPopup(telephone);
    } else {
        window.location.href = 'menu.html';
    }
}

function showChangePasswordPopup(telephone) {
    // Vérifie si une popup est déjà ouverte
    if (document.querySelector('.change-password-popup')) return;

    const changePasswordPopup = document.createElement('div');
    changePasswordPopup.className = 'change-password-popup';

    changePasswordPopup.innerHTML = `
  <div class="change-password-popup-content">
    <span class="close" onclick="closeChangePasswordPopup()">&times;</span>
    <h2>Changer votre mot de passe</h2>
    <p style="color:#666; font-size:0.9em;">Mot de passe actuel : <strong>${currentPassword}</strong></p>
    <form id="changePasswordForm">
      <div class="form-group">
        <label for="newPassword">Nouveau mot de passe :</label>
        <input type="text" id="newPassword" name="newPassword" required>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirmer le mot de passe :</label>
        <input type="text" id="confirmPassword" name="confirmPassword" required>
      </div>
      <button type="button" onclick="changePassword('${telephone}')">Changer</button>
    </form>
  </div>
`;

    document.body.appendChild(changePasswordPopup);
}

function closeChangePasswordPopup() {
    const popup = document.querySelector('.change-password-popup');
    if (popup) document.body.removeChild(popup);
    window.location.href = 'menu.html';
}

function changePassword(telephone) {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas.');
        return;
    }

    fetch('http://176.185.182.77/change_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telephone, newPassword }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Mot de passe changé avec succès.');
            closeChangePasswordPopup();
        } else {
            alert('Erreur lors du changement de mot de passe.');
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur réseau ou serveur.');
    });
}

