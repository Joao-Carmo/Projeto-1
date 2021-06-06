import userController from "../controllers/userController.js"

export default class userView {
    constructor() {
        this.userController = new userController();


        //gestão do formulário de login
        this.formLogin = document.querySelector('#login');
        this.loginUsername = document.querySelector('#txtUsername');
        this.loginPassword = document.querySelector('#txtPassword');
        this.loginMessage = document.querySelector('#loginMessage');
        this.bindLoginForm()

        //gestão do formulário de registo
        this.formRegister = document.querySelector('#register');
        this.registerUsername = document.querySelector('#txtUsernameRegister');
        this.registerEmail = document.querySelector('#txtUserEmail')
        this.registerPassword = document.querySelector('#txtPasswordRegister');
        this.registerDate = document.querySelector('#dateBirth');
        this.registerMessage = document.querySelector('#registerMessage');
        this.bindRegisterForm();

    }

     /**
     * Função que define um listener para o botão de registo
     */
      bindRegisterForm() {
        this.formRegister.addEventListener('submit', event => {
            event.preventDefault();
            try {
                this.userController.register(this.registerUsername.value, this.registerPassword.value, this.registerEmail.value, this.registerDate.value);
                console.log('sucesso');
                
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.reload() }, 1000);
            } catch (err) {
                this.displayMessage('register', err);
                console.log('erro');
            }
        })
    }

    /**
     * Função que define um listener para o botão de login
     */
    bindLoginForm() {
        this.formLogin.addEventListener('submit', event => {
            event.preventDefault();
            try {
                this.userController.login(this.loginUsername.value, this.loginPassword.value);
                console.log('sucesso');
                
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.href = '../index.html' }, 1000);
            } catch (err) {
                this.displayMessage('login', err);
            }
        });

    }

    /**
     * Função que define uma mennsagem de erro
     */
    displayMessage(event, text) {
        event == 'login' ? this.loginMessage.innerHTML = text : this.registerMessage.innerHTML = text
    }
}


        