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

        this.logoutButton = document.querySelector('#btnLogOut')
        this.bindLogout();

        this.newUsername = document.querySelector('#txtNewUsername')
        this.newPassword = document.querySelector('#txtNewPassword')
        this.confirmNewPassword = document.querySelector('#txtConfirmNewPassword')
        this.editMessage = document.querySelector('#editMessage')
        this.bindEdit();

        this.pUsername = document.querySelector('#pUsername')
        this.pBirthDate = document.querySelector('#pBirthDate')
        this.pEmail = document.querySelector('#pEmail')
        this.pPoints = document.querySelector('#pPoints')
        this.pComments = document.querySelector('#pComments')
        this.profileInformation();

        this.modalBodyAvatars = document.querySelector('#modalBodyAvatars')
        this.bindModal();
        // this.modalEditAvatars();
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

    /**
     * Função que dispõe a informação do utilizador no profile.html. 
     */
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

    /**
     * Função que disponibiliza, conforme a pontuação do utilizador, as fotos de perfis disponíveis que o mesmo pode escolher. 
     */
    modalEditAvatars() {
        const avatars = this.userController.usersAvatars();
        const users = this.userController.usersArray();
        const username = this.userController.loggedUser();
        const points = users.find(user => user.username === username).points

        this.modalBody = `
            <button id="btnAvatarsImg" type="button" class="col">
                <img src="../Images/avatars/1.png" id="1" width="100%">
                <p>Desbloqueado!</p>
            </button>
        `

        for (let pos = 1; pos < avatars.length; pos++) {
            if (points >= avatars[pos].points) {
                this.modalBody += `
                    <button id="btnAvatarsImg" type="button" class="col">
                        <img src="../Images/avatars/${pos+1}.png" id="${pos+1}" width="100%">
                        <p>Desbloqueado!</p>
                    </button>
                `   
            } else {
                this.modalBody += `
                    <button id="btnAvatarsImg" class="col" disabled>
                        <div style="background-color: rgb(216, 216, 216); border-radius: 20px;">
                            <img src="../Images/avatars/${pos+1}.png" id="${pos+1}" width="100%" style="opacity: 25%;">
                        </div>
                        <p>${avatars[pos].points}XP</p>
                    </button>
                `
            }
        }

        this.modalBodyAvatars.innerHTML = this.modalBody
        this.modalChangeAvatars()
    }

    /**
     * Função que escuta o clique da nova foto escolhida e altera no perfil do utilizador. 
     */
    modalChangeAvatars() {
        const btnAvatarsImg = document.querySelectorAll('#btnAvatarsImg')

        for (const btnAvatar of btnAvatarsImg) {
            btnAvatar.addEventListener('click', () => {
                const id = btnAvatar.children[0].id
                this.userController.changeUserAvatars(id)

                setTimeout(() => {
                    location.reload()
                }, 500);
            })
        }
    }

    /**
     * Função que troca entre ver informações do perfil e editar perfil no profile.html. 
     */
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

    /**
     * Função da modal dos avatars. 
     */
    bindModal() {
        this.btnAvatars.addEventListener('click', () => {
            modalAvatars.style.display = "block";
            this.modalEditAvatars();
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