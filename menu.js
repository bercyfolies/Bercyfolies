document.addEventListener('DOMContentLoaded', function() {
    // Récupérer le prénom depuis le stockage local
    const prenom = localStorage.getItem('Prénom');
    if (prenom) {
        document.getElementById('user-name').textContent = prenom;
    }
});