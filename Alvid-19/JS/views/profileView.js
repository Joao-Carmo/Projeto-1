import userController from '../controllers/userController.js'

export default class profileView {
    constructor() {
        this.userController = new userController();

        this.logoutButton = document.querySelector('#btnLogOut');
        this.bindLogout();


        this.editForm = document.querySelector('#edit');
        this.bindEdit();
        
    }





      /**
     * Função que define um listener para o botão de logout
     */
    bindLogout() {
        this.logoutButton.addEventListener('click', event => {
            event.preventDefault();
            this.userController.logout();
            setTimeout(() => { location.href = '../index.html' }, 1000);
        })

    }

    bindEdit() {
        this.editButton.addEventListener('submit', event => {
            event.preventDefault();
            
        })
    
    }

}