import userController from '../controllers/userController.js'

export default class adminView {
    constructor() {
        this.userController = new userController();

        //Gerar lista de utilizadores na tabela
        this.usersList = document.querySelector('#usersTable');
        this.bindUsersList();

        //Editar utilizador
        this.btnEdit = document.querySelectorAll('#btnEdit');
        this.adminEditUser = document.querySelector('#adminEditUser');

        //Bloquear utilizador
        this.btnBlock = document.querySelectorAll('#btnBlock');
        this.bindBlock();

        //Filtrar a lista de utilizadores (por admin, user ou blocked)
        this.usernameSearch = document.querySelector('#txtUsernameSearch');
        this.usertypeSearch = document.querySelector('#userTypeSearch');
        this.searchForm = document.querySelector('#searchForm');
        this.bindSearch();

        //Alterar o perfil do utilizador (palavra-passe e nome)
        this.formEditAdmin = document.querySelector('#formEditAdmin');
        this.newUsername = document.querySelector('#txtUsernameEdit');
        this.newPassword = document.querySelector('#txtPasswordEdit');
        this.confirmNewPassword = document.querySelector('#txtPasswordEditConfirm');
        this.errorMessage = document.querySelector('#errorMessage');
        this.bindEditButton();

        //Alterar o tipo de utilizador
        this.btnAdmin = document.querySelector('#btnAdmin');
        this.changeUserType();

    }

    bindBlock() {
        for (const button of this.btnBlock) {
            button.addEventListener('click', event => {
                event.preventDefault();
                const username = button.parentNode.parentNode.cells[0].innerHTML;
                this.userController.blockUser(username);
            })
        }
    }

    bindEditButton() {
        for (const button of this.btnEdit) {
            button.addEventListener('click', event => {
                event.preventDefault();
                const username = button.parentNode.parentNode.cells[0].innerHTML;
                const users = this.userController.usersArray();
                const photo = users.find(users => users.username === username).photo
                this.adminEditUser.innerHTML = `
                    <img src="${photo}" class="col-lg-2 col-2" style="border-radius: 50px">
                    <p>${username}</p>`
                this.bindEditUser(username);
                this.changeUserType(users);
            })
        }
    }

    bindEditUser(username) {
        this.formEditAdmin.addEventListener('submit', event => {
            event.preventDefault();
            try {
                this.userController.adminUserEdit(username, this.newUsername.value, this.newPassword.value /*, this.confirmNewPassword.value*/ );
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

    changeUserType(users) {
        this.btnAdmin.addEventListener('click', () => {

            if (this.users.type == 'admin') {
                alert(users)
                this.userController.makeUser(users);

            } else if (users.type == 'user') {
                this.userController.users.makeAdmin(users);
            }
        })
    }

    bindSearch() {
        //const users = this.userController.usersArray()
        this.searchForm.addEventListener('submit', event => {
            event.preventDefault();
            //alert(this.usernameSearch.value)
            //alert(this.usertypeSearch.options[this.usertypeSearch.selectedIndex].value)
            this.generateList(this.userController.usersList(this.usernameSearch.value, this.usertypeSearch.options[this.usertypeSearch.selectedIndex].value));
        })
    }

    bindUsersList() {
        this.generateList(this.userController.usersArray()) //devolve a lista de todos os utilizadores no LocalStorage
    }

    generateList(users) {
        let html = ""
        for (let pos = 0; pos < users.length; pos++) {
            html += `
            <tr>
                <td class="col-lg-9 col-md-9 col-sm-6 col-xs-6">${users[pos].username}</td>
                <td class="col-lg-1 col-md-1 col-sm-2 col-xs-2">
                    <a href="" id="btnEdit">
                        <img src="../Images/editar.png">
                    </a>
                </td>
                <td class="col-lg-1 col-md-1 col-sm-2 col-xs-2">
                    <a href="" id="btnBlock">
                        <img src="../Images/bloquear.png">
                    </a>
                </td>
            </tr>
            `
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