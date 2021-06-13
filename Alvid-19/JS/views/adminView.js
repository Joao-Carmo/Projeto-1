import userController from '../controllers/userController.js'

export default class adminView {
    constructor() {
        this.userController = new userController();

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
            btnBlock.innerHTML = `<img src="../Images/bloquearVermelho.png">`
        } else {
            btnBlock.innerHTML = `<img src="../Images/bloquear.png">`
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
                this.changeBtnUserType();

                this.adminEditUser.innerHTML = `
                    <img src="../Images${photo}" class="col-lg-2 col-2" style="border-radius: 50px">
                    <p>${username}</p>`
                
                this.bindEditUser();
                // this.changeUserType();
                
                
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

    changeBtnUserType() {
        const type = this.userController.isUserType();

        if (type == 'admin') {
            this.btnAdmin.innerHTML = `<button id="btnAdmin" style="background-color: #38E169" type="button">Tornar user</button>`;
            this.btnBlock.innerHTML = `<img src="../Images/bloquear.png">`
        } else if (type == 'user') {
            this.btnAdmin.innerHTML = `<button id="btnAdmin" type="button">Tornar admin</button>`;
            this.btnBlock.innerHTML = `<img src="../Images/bloquear.png">`
        } else if (type == 'blocked') {
            alert('This user is blocked');
            this.btnBlock.innerHTML = `<img src="../Images/bloquearVermelho.png">`
            this.btnAdmin.innerHTML = `<button id="btnAdmin" style="background-color: #38E169" type="button">Tornar user</button>`;
        }
    }

    changeUserType() {
        this.btnAdmin.addEventListener('click', () => {
            const type = this.userController.isUserType();

                if (type == 'admin') {
                    this.btnAdmin.innerHTML = `<button id="btnAdmin" style="background-color: #38E169" type="button">Tornar user</button>`;
                    this.userController.makeUser();
                } else if (type == 'user') {
                    this.btnAdmin.innerHTML = `<button id="btnAdmin" type="button">Tornar admin</button>`;
                    this.userController.makeAdmin();
                } else if (type == 'blocked') {
                    alert('This user is blocked');
                    this.btnAdmin.innerHTML = `<button id="btnAdmin" style="background-color: #38E169" type="button">Tornar user</button>`;
                    this.userController.makeUser();
                }

                this.changeBtnUserType()
                // setTimeout(() => {
                //     location.reload()
                // }, 1000);
        })
    }

    bindSearch() {
        //const users = this.userController.usersArray()
        this.searchForm.addEventListener('submit', event => {
            event.preventDefault();
            //alert(this.usernameSearch.value)
            //alert(this.usertypeSearch.options[this.usertypeSearch.selectedIndex].value)
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
     * Função que define uma mensagem de erro
     */
    displayMessage(text) {
        this.errorMessage.innerHTML = text;
    }
}