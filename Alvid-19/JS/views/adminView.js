import userController from '../controllers/userController.js'
import quizzesControler from '../controllers/quizzesController.js'

export default class adminView {
    constructor() {
        this.userController = new userController();
        this.quizzesControler = new quizzesControler();

        //Gerar lista de utilizadores na tabela
        this.usersList = document.querySelector('#usersTable');
        this.bindUsersList();

        //Editar utilizador
        this.adminEditUser = document.querySelector('#adminEditUser');

        //Filtrar a lista de utilizadores (por admin, user ou blocked)
        this.usernameSearch = document.querySelector('#txtUsernameSearch');
        this.usertypeSearch = document.querySelector('#userTypeSearch');
        this.searchForm = document.querySelector('#searchForm');
        this.bindSearch();
        

        //Bloquear utilizador
        this.btnBlock = document.querySelectorAll('#btnBlock');
        this.bindBlock();

        //Alterar o perfil do utilizador (palavra-passe e nome)
        this.formEditAdmin = document.querySelector('#formEditAdmin');
        this.newUsername = document.querySelector('#txtUsernameEdit');
        this.newPassword = document.querySelector('#txtPasswordEdit');
        this.confirmNewPassword = document.querySelector('#txtPasswordEditConfirm');
        this.errorMessage = document.querySelector('#errorMessage');
        this.bindEditButton();

        //Alterar o tipo de utilizador
        this.btnAdmin = document.querySelector('#changeUserType');
        this.changeUserType();


        //Criar novo quiz
        this.txtQuizName = document.querySelector('#txtQuizName');
        this.imgQuiz = document.querySelector('#imgQuiz');
        this.txtQuizDescription = document.querySelector('#txtQuizDescription');
        this.imgQuestion = document.querySelector('#imgQuestion');
        this.question1 = document.querySelector('#question1');
        this.question1A = document.querySelector('#question1A');
        this.question1B = document.querySelector('#question1B');
        this.question1C = document.querySelector('#question1C');
        this.question1D = document.querySelector('#question1D');
        this.radAnswer = document.querySelector('input[name="rightAnswer"]:checked');
        this.formQuiz = document.querySelector('#formQuiz');
        this.btnCreateNewQuiz = document.querySelector('#btnCreateNewQuiz');
        this.createQuiz();
    }

    bindBlock() {
        for (const button of this.btnBlock) {
            button.addEventListener('click', event => {
                event.preventDefault();
                const username = button.parentNode.parentNode.cells[0].innerHTML;
                this.userController.blockUser(username);
                this.changeBtnBlock(username)
            })
        }
    }

    changeBtnBlock(username) {
        const btnBlock = document.querySelector(`.${username}`)

        const type = this.userController.isUserBlocked(username);


        if (type == 'blocked') {
            btnBlock.innerHTML = `<img class="${username}" src="../Images/bloquearVermelho.png">`
        } else {
            btnBlock.innerHTML = `<img class="${username}" src="../Images/bloquear.png">`
        }
    }

    bindEditButton() {
        const btnEdit = document.querySelectorAll('#btnEdit')
        for (const button of btnEdit) {
            button.addEventListener('click', event => {

                event.preventDefault();
                this.errorMessage.innerHTML = '';
                
                const username = button.parentNode.parentNode.cells[0].innerHTML;
                const users = this.userController.usersArray();
                const photo = users.find(users => users.username === username).photo

                this.userController.userFromTable(username);
                this.changeBtnUserType(username);

                this.adminEditUser.innerHTML = `
                    <img src="../Images${photo}" class="col-lg-2 col-2" style="border-radius: 50px">
                    <p>${username}</p>`
                
                this.bindEditUser();
            })
        }
    }

    bindEditUser() {
        this.formEditAdmin.addEventListener('submit', event => {
            event.preventDefault();
            try {
                this.userController.adminUserEdit(this.newUsername.value, this.newPassword.value, this.confirmNewPassword.value );
                console.log('sucesso');

                // Espera 1 seg. antes de fazer refresh à pagina
                setTimeout(() => {
                    location.reload()
                }, 1000);
            } catch (err) {
                this.displayMessage(err);
            }
        })
    }

    changeBtnUserType(username) {
        const type = this.userController.isUserType();
        const btnUserBlock = document.querySelector(`.${username}`)

        if (type == 'admin') {
            this.btnAdmin.innerHTML = `<button id="btnAdmin" style="background-color: #38E169" type="button">Tornar user</button>`;
            btnUserBlock.innerHTML = `<img src="../Images/bloquear.png">`
        } else if (type == 'user') {
            this.btnAdmin.innerHTML = `<button id="btnAdmin" type="button">Tornar admin</button>`;
            btnUserBlock.innerHTML = `<img src="../Images/bloquear.png">`
        } else if (type == 'blocked') {
            btnUserBlock.innerHTML = `<img src="../Images/bloquearVermelho.png">`
            this.btnAdmin.innerHTML = `<button id="btnAdmin" style="background-color: #38E169" type="button">Desbloquear</button>`;
        }
    }

    changeUserType() {
        this.btnAdmin.addEventListener('click', () => {
            const type = this.userController.isUserType();
            const username = this.userController.getUserFromTable();

                if (type == 'admin') {
                    this.btnAdmin.innerHTML = `<button id="btnAdmin" style="background-color: #38E169" type="button">Tornar user</button>`;
                    this.userController.makeUser();
                } else if (type == 'user') {
                    this.btnAdmin.innerHTML = `<button id="btnAdmin" type="button">Tornar admin</button>`;
                    this.userController.makeAdmin();
                } else if (type == 'blocked') {
                    this.btnAdmin.innerHTML = `<button id="btnAdmin" style="background-color: #38E169" type="button">Desbloquear</button>`;
                    this.userController.makeUser();
                }

                this.changeBtnUserType(username)
        })
    }

    bindSearch() {
        this.searchForm.addEventListener('submit', event => {
            event.preventDefault();
            this.generateList(this.userController.usersList(this.usernameSearch.value, this.usertypeSearch.options[this.usertypeSearch.selectedIndex].value));
            this.bindEditButton();
        })
    }

    bindUsersList() {
        this.generateList(this.userController.usersArray()) //devolve a lista de todos os utilizadores no LocalStorage
    }

    generateList(users) {
        let html = ""
        for (let pos = 0; pos < users.length; pos++) {
            if (users[pos].type == 'blocked') {
                html += `
                    <tr>
                        <td class="col-lg-9 col-md-9 col-sm-6 col-xs-6">${users[pos].username}</td>
                        <td class="col-lg-1 col-md-1 col-sm-2 col-xs-2">
                            <a type="button" id="btnEdit">
                                <img src="../Images/editar.png">
                            </a>
                        </td>
                        <td class="col-lg-1 col-md-1 col-sm-2 col-xs-2">
                            <a type="button" id="btnBlock" class="${users[pos].username}">
                                <img src="../Images/bloquearVermelho.png">
                            </a>
                        </td>
                    </tr>
                `
            } else {
                html += `
                    <tr>
                        <td class="col-lg-9 col-md-9 col-sm-6 col-xs-6">${users[pos].username}</td>
                        <td class="col-lg-1 col-md-1 col-sm-2 col-xs-2">
                            <a type="button" id="btnEdit">
                                <img src="../Images/editar.png">
                            </a>
                        </td>
                        <td class="col-lg-1 col-md-1 col-sm-2 col-xs-2">
                            <a type="button" id="btnBlock" class="${users[pos].username}">
                                <img src="../Images/bloquear.png">
                            </a>
                        </td>
                    </tr>
                `
            }
        }

        this.usersList.innerHTML = html
    }



    /**
     * Função de criar um quiz novo
     */
    createQuestions() {
        this.formQuiz.addEventListener('submit', event => {
            event.preventDefault();

            this.quizzesControler.createQuestions(this.question1.value, this.imgQuestion.value, this.question1A.value, this.question1B.value, this.question1C.value, this.question1D.value)
        })
    }






    /**
     * Função que define uma mensagem de erro
     */
    displayMessage(text) {
        this.errorMessage.innerHTML = text;

    }
}