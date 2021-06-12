import userController from '../controllers/userController.js'

export default class rankingView {
    constructor() {
        this.userController = new userController();

        this.pRankingCongratulator = document.querySelector('#pRankingCongratulator');
        this.divRankingCongratulator = document.querySelector('#divRankingCongratulator')
        this.congralutator();

        // this.generateTable();
    }

    congralutator() {
        const loggedUser = this.userController.loggedUser();
        const photo = users.find(users => users.username === username).photo

        this.divRankingCongratulator.innerHTML = `<img src="${photo}" width="100px" alt="Ícone perfil">`
        this.pRankingCongratulator.innerHTML = `Parabéns ${loggedUser}! Estás a fazer progresso!`

    }

    generateTable() {
        const users = this.userController.usersArray();

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