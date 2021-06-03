import userController from "../controllers/userController.js"

export default class userView {
    constructor() {
        this.userController = new userController();


        //gestão do formulário de login
        this.formLogin = document.querySelector('#login');
        this.loginUsername = document.querySelector('#userName');
        this.loginPassword = document.querySelector('#userPw');
        this.bindLoginForm()

        //gestão do formulário de registo
        this.formRegister = document.querySelector('#register');
        this.registerUsername = document.querySelector('#userName');
        this.registerEmail = document.querySelector('#userEmail')
        this.registerPassword = document.querySelector('#userPw');
        this.registerDate = document.querySelector('#date');
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
                // this.displayMessage('register', 'User registered with success!', 'success');
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.reload() }, 1000);
            } catch (err) {
                // this.displayMessage('register', err, 'danger');
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
                // this.displayMessage('login', 'User logged in with success!', 'success');
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.href = '../index.html' }, 1000);
            } catch (err) {
                console.log('erro');
                // this.displayMessage('login', err, 'danger');
            }
        });

    }




    displayMessage(event, text, type) {
        const message = `<div class="alert alert-${type}" role="alert">${text}</div>`;
        event == 'login' ? this.loginMessage.innerHTML = message : this.registerMessage.innerHTML = message
    }
}


        