import userController from '../controllers/userController.js'

export default class userView {
    constructor() {
        this userController = new.userController();


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

        // Gestão dos botões de submissão
        this.loginButton = document.querySelector('#btnLogin');
        this.registerButton = document.querySelector('#btnRegister');

        
        
        this.switchForms();

    }

     /**
     * Função que define um listener para o botão de registo
     */
      bindRegisterForm() {
        this.formRegister.addEventListener('submit', event => {
            event.preventDefault();
            try {
                this.userController.register(this.registerUsername.value, this.registerPassword.value, this.registerEmail, this.registerDate);
                this.displayMessage('register', 'User registered with success!', 'success');
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.reload() }, 1000);
            } catch (err) {
                this.displayMessage('register', err, 'danger');
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
                this.displayMessage('login', 'User logged in with success!', 'success');
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.reload() }, 1000);
            } catch (err) {
                this.displayMessage('login', err, 'danger');
            }
        });

    }

    switchForms() {


        /** 
         * //funções que transformam os fomulários quando os botões switch login e register são clicados
        this.switchRegister.addEventListener('click', () => {
            loginForm.style.transform = "translateX(-375px)"
            registerForm.style.transform = "translateX(-380px)"
            button.style.transform = "translateX(101px)"
            form.style.height = "420px"
        })

        this.switchLogin.addEventListener('click', () => {
            loginForm.style.transform = "translateX(0px)"
            registerForm.style.transform = "translateX(0px)"
            button.style.transform = "translateX(0px)"
            form.style.height = "320px"
        */
            // const button = document.querySelector('#button');
            // const loginForm = document.querySelector('#login');
            // const registerForm = document.querySelector('#register');
            // const form = document.querySelector('.form');
            // const switchLogin = document.querySelector('#btnLoginSwitch');
            // const switchRegister = document.querySelector('#btnRegSwitch');
    
            // //funções que transformam os fomulários quando os botões switch login e register são clicados
            // switchRegister.addEventListener('click', () => {
            //     loginForm.style.transform = "translateX(-375px)"
            //     registerForm.style.transform = "translateX(-380px)"
            //     button.style.transform = "translateX(102px)"
            //     form.style.height = "420px"
            // })
    
            // switchLogin.addEventListener('click', () => {
            //     loginForm.style.transform = "translateX(0px)"
            //     registerForm.style.transform = "translateX(0px)"
            //     button.style.transform = "translateX(0px)"
            //     form.style.height = "320px"
            // })
    }
    

    
}


        