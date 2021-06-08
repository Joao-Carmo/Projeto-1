import userController from '../controllers/userController.js'

export default class adminView {
    constructor() {
        this.userController = new userController();

        //Gerar lista de utilizadores na tabela
        this.usersList = document.querySelector('#usersTable') 
        this.generateList();

        //Editar utilizador
        this.btnEdit = document.querySelectorAll('#btnEdit');
        this.bindEdit();

        //Bloquear utilizador
        this.btnBlock = document.querySelectorAll('#btnBlock');
        this.bindBlock();

        this.btnSearch = document.querySelector('#btnSearch');
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
                this.userController.adminUserEdit(username);
            })
        }
    }


    /*renderList() {
        // Gerir o catálogo
        let result = '<tr><td></td><tr>'
        for (const band of bands) {
            result += this.generateBandCard(band)
        }
        result += '</div>'
        this.catalog.innerHTML = result
        }
    */

    generateList() {
        const users = this.userController.usersArray();
        console.log(users);
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