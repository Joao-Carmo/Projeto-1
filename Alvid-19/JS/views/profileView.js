import userController from '../controllers/userController.js'

export default class profileView {
    constructor() {
        this.userController = new userController();


        this.profileIcon = document.querySelector('#profileIcon');
        this.updateStatusUI();

        this.logoutButton = document.querySelector('#btnLogOut');
        this.bindLogout();

        this.newUsername = document.querySelector('#txtNewUsername');
        this.newPassword = document.querySelector('#txtNewPassword');
        this.confirmNewPassword = document.querySelector('#txtConfirmNewPassword');
        this.editForm = document.querySelector('#edit');
        this.editMessage = document.querySelector('#editMessage');
        this.bindEdit();
    }


    /**
     * Função que define um listener para o botão de logout
     */
    bindLogout() {
        this.logoutButton.addEventListener('click', event => {
            event.preventDefault();
            this.userController.logout();
            setTimeout(() => {
                location.href = '../index.html'
            }, 1000);
        })
    }

    /**
     * Função que define um listener para o botão de editar o perfil
     */
    bindEdit() {
        this.editForm.addEventListener('submit', event => {
            event.preventDefault();
            try {
                this.userController.edit(this.newUsername.value, this.newPassword.value, this.confirmNewPassword.value);
                console.log('sucesso');
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => {
                    location.reload()
                }, 1000);
            } catch (err) {
                this.displayMessage(err);
            }
        })
    }


    updateStatusUI() {
        const users = this.userController.usersArray();
        const photo = users.find(users => users.username === username).photo
        if (this.userController.loggedUser.isLogged()) {
            this.profileIcon.innerHTML =
                `<a class="nav-link" href="HTML/profile.html">
                    <img src="${photo}" width="84px" alt="Ícone Perfil" id="iconPerfil" id="iconPerfil" style="filter: drop-shadow(0px 9px 3px #0a9cb6);border-radius: 50px">
                </a>`
        } else {
            this.profileIcon.innerHTML =
                `<a class="nav-link" href="HTML/userAuthentication.html">
                    <img src="../Images/perfil.png" width="84px" alt="Ícone Perfil" id="iconPerfil" id="iconPerfil" style="filter: drop-shadow(0px 9px 3px #0a9cb6);">
                </a>`
        }
    }

    /**
     * Função que define uma mensagem de erro
     */
    displayMessage(text) {
        this.editMessage.innerHTML = text;
    }

}