import userController from '../controllers/userController.js'

export default class profileView {
    constructor() {
        this.userController = new userController();

        this.logoutButton = document.querySelector('#btnLogOut');
        this.bindLogout();

        this.newUsername = document.querySelector('#txtNewUsername')
        this.newPassword = document.querySelector('#txtNewPassword')
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
                this.userController.edit(this.newUsername.value, this.newPassword.value);
                console.log('sucesso');
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => {location.reload()}, 1000);
            } catch (err) {
                this.displayMessage(err);
            }
        })
    }


    /**
     * Função que define uma mensagem de erro
     */
    displayMessage(text) {
        this.editMessage.innerHTML = text;
    }

}