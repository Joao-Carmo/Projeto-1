import userController from '../controllers/userController.js'
import commentController from '../controllers/commentController.js'

export default class profileView {
    constructor() {
        this.userController = new userController();
        this.commentController = new commentController();

        this.profileIcon = document.querySelector('#profileIcon');
        this.editProfileImage = document.querySelector('#editProfileImage');
        this.updateStatusUI();


        this.switchEdit = document.querySelector('#switchEdit');
        this.switchProfile = document.querySelector('#switchProfile');
        this.profileForm = document.querySelector('#profile');
        this.editForm = document.querySelector('#edit');
        this.bindSwitchForms();

        
        this.modalAvatars = document.querySelector('#modalAvatars')
        this.btnAvatars = document.querySelector('#btnAvatars')
        this.btnModalAvatarsClose = document.querySelector('#btnModalAvatarsClose')
        this.bindModal();

        this.logoutButton = document.querySelector('#btnLogOut');
        this.bindLogout();

        this.newUsername = document.querySelector('#txtNewUsername');
        this.newPassword = document.querySelector('#txtNewPassword');
        this.confirmNewPassword = document.querySelector('#txtConfirmNewPassword');
        this.editMessage = document.querySelector('#editMessage');
        this.bindEdit();

        this.pUsername = document.querySelector('#pUsername')
        this.pBirthDate = document.querySelector('#pBirthDate')
        this.pEmail = document.querySelector('#pEmail')
        this.pPoints = document.querySelector('#pPoints')
        this.pComments = document.querySelector('#pComments')
        this.profileInformation();
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
            }, 500);
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
                }, 500);
            } catch (err) {
                this.displayMessage(err);
            }
        })
    }


    updateStatusUI() {
        const username = this.userController.loggedUser();
        const users = this.userController.usersArray();
        const photo = users.find(users => users.username === username).photo
        this.profileIcon.innerHTML = `
            <a class="nav-link" href="HTML/profile.html">
                <img src="../Images${photo}" width="84px" alt="Ícone Perfil" id="iconPerfil" id="iconPerfil" style="filter: drop-shadow(0px 9px 3px #0a9cb6);border-radius: 50px">
            </a>`
        this.editProfileImage.style = `
            background-image: url('../Images${photo}'); background-size: contain; opacity: 100%; position: relative; left: -8px; border-radius: 50px
        `
    }

    profileInformation() {
        const username = this.userController.loggedUser();
        const users = this.userController.usersArray();
        const comments = this.commentController.commentsArray();

        const date = users.find(users => users.username === username).date
        const points = users.find(users => users.username === username).points
        const email = users.find(users => users.username === username).email
        const comment = comments.filter(comment => comment.username === username).length

        this.pUsername.innerHTML = `Nome de utilizador: ${username}`
        this.pBirthDate.innerHTML = `Data de nascimento: ${date}`
        this.pEmail.innerHTML = `E-mail: ${email}`
        this.pPoints.innerHTML = `Pontuação total: ${points}`
        this.pComments.innerHTML = `Nº de comentários: ${comment}`
    }


    bindSwitchForms() {
        this.switchEdit.addEventListener('click', () => {
            this.profileForm.style.transform = "translateX(-375px)"
            this.editForm.style.transform = "translateX(-410px)"
        })
        this.switchProfile.addEventListener('click', () => {
            this.profileForm.style.transform = "translateX(0px)"
            this.editForm.style.transform = "translateX(0px)"
        })
    }

    bindModal() {
        this.btnAvatars.addEventListener('click', () => {
            modalAvatars.style.display = "block";
        })
    
        this.btnModalAvatarsClose.addEventListener('click', () => {
            modalAvatars.style.display = ""
        })
    }
    
    /**
     * Função que define uma mensagem de erro
     */
    displayMessage(text) {
        this.editMessage.innerHTML = text;
    }
}