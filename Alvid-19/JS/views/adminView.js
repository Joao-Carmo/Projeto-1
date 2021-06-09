import userController from '../controllers/userController.js'

export default class adminView {
    constructor() {
        this.userController = new userController();

        //Gerar lista de utilizadores na tabela
        this.usersList = document.querySelector('#usersTable')
        this.bindUsersList();

        //Editar utilizador
        this.btnEdit = document.querySelectorAll('#btnEdit');
        this.adminEditUser = document.querySelector('#adminEditUser');
        this.bindEdit();

        //Bloquear utilizador
        this.btnBlock = document.querySelectorAll('#btnBlock');
        this.bindBlock();

        //Filtrar a lista de utilizadores (por admin, user ou blocked)
        this.usernameSearch = document.querySelector('#txtUsernameSearch');
        this.usertypeSearch = document.querySelector('#userTypeSearch');
        this.searchForm = document.querySelector('#searchForm');
        this.bindSearch();
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

    bindEdit() {
        for (const button of this.btnEdit) {
            button.addEventListener('click', event => {
                event.preventDefault();
                const username = button.parentNode.parentNode.cells[0].innerHTML;
                const users = this.userController.usersArray();
                const photo = users.find(users => users.username === username).photo
                this.adminEditUser.innerHTML = `
                    <img src="${photo}" class="col-lg-2 col-2">
                    <p>${username}</p>
                    <div class="col-7 text-center" id="errorMessage"></div>`
            }
        )}
    }
    /*bindEdit() {
        for (const button of this.btnEdit) {
            button.addEventListener('click', event => {
                event.preventDefault();
                const username = button.parentNode.parentNode.cells[0].innerHTML;
                this.userController.adminUserEdit(username);
            })
        }
    }*/

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

    
}