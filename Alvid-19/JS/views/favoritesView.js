import userController from '../controllers/userController.js'

export default class favoritesView {
    constructor() {
        this.userController = new userController();

        this.profileIcon = document.querySelector('#profileIcon');
        this.updateStatusUI();

    }

    updateStatusUI() {
        
        this.profileIcon.innerHTML =
            `<a class="nav-link" href="HTML/profile.html">
                <img src="Images/avatars/1.png" width="84px" alt="Ícone Perfil" id="iconPerfil" id="iconPerfil" style="filter: drop-shadow(0px 9px 3px #0a9cb6);border-radius: 50px">
            </a>`
    }
}