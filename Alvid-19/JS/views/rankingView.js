import userController from '../controllers/userController.js'

export default class rankingView {
    constructor() {
        this.userController = new userController();

        this.pRankingCongratulator = document.querySelector('#pRankingCongratulator');
        this.divRankingCongratulator = document.querySelector('#divRankingCongratulator')
        this.congralutator();

        this.usersPointsTable = document.querySelector('#usersPointsTable')
        this.generateTable();
    }

    congralutator() {
        const username = this.userController.loggedUser();
        const users = this.userController.usersArray();
        const photo = users.find(users => users.username === username).photo

        this.divRankingCongratulator.innerHTML = `<img src="../Images${photo}" width="100px" alt="Ícone perfil" style="border-radius: 50px">`
        this.pRankingCongratulator.innerHTML = `Parabéns ${username}! Estás a fazer progresso!`
    }

    generateTable() {
        const users = this.userController.usersArray();

        let html = ""
        for (let pos = 0; pos < users.length; pos++) {
            html += `
                <tr>
                    <td class="col">${users[pos].username}</td>
                    <td class="col">${users[pos].points}</td>
                    <td class="col">Jogos</td>
                    <td class="col">Quiz</td>
                </tr>
            `
        }
        html = `
            <tr style="background-color: #F5E400;">
                <td class="col" style="color:black;">Utilizador</td>
                <td class="col" style="color:black;">Pontuação</td>
                <td class="col" style="color:black;">Jogos</td>
                <td class="col" style="color:black;">Quiz</td>
            </tr>
        ` + html

        this.usersPointsTable.innerHTML = html
    }
}