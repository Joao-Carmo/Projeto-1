import userModel from '../models/userModel.js'

export default class userController {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.getItem("users")) : [];
    }

    usersArray() {
        //const users = this.users;
        return this.users
    }

    register(username, password, email, date) {
        if (!this.users.some(user => user.username === username)) {
            const id = this.users.length + 1
            const type = 'user'
            const points = 0
            const photo = '../Images/avatars/1.png'
            this.users.push(new userModel(id,type,username,password,email,date,points,photo,favorites));
            localStorage.setItem('users', JSON.stringify(this.users))
        } else {
            throw `O utilizador "${username}" já existe!`
        }
    }

    login(username, password) {
        if (this.users.some(user => user.username === username && user.password === password)) {
            const type = this.users.find(user => user.username === username).type
            const id = this.users.find(user => user.username === username).id
            sessionStorage.setItem('loggedUser', username)
            sessionStorage.setItem('loggedUserId', id)
            sessionStorage.setItem('typeUser', type)
        } else {
            throw Error('Login inválido!');
        }
    }

    edit(newUsername, newPassword) {
        const id = sessionStorage.getItem('loggedUserId')

        if (newUsername == '' && newPassword == '') {
            throw `Nada a mudar!`

        } else if (this.users.some(user => user.username === newUsername)) {
            throw `O utilizador "${newUsername}" já existe!`

        } else if (newUsername == '') {
            this.users[id-1].password = newPassword
            localStorage.setItem('users', JSON.stringify(this.users))

        } else if (newPassword == '') {
            this.users[id-1].username = newUsername
            localStorage.setItem('users', JSON.stringify(this.users))
            sessionStorage.setItem('loggedUser', newUsername)

        } else {
            this.users[id-1].username = newUsername
            this.users[id-1].password = newPassword
            localStorage.setItem('users', JSON.stringify(this.users))
            sessionStorage.setItem('loggedUser', newUsername)
        }
    }

    logout() {
        sessionStorage.removeItem('loggedUser')
        sessionStorage.removeItem('loggedUserId')
        sessionStorage.removeItem('typeUser')
    }

    isLogged() {
        return sessionStorage.getItem('loggedUser') ? true : false
    }

    isAdmin() {
        return sessionStorage.getItem('typeUser') === 'admin' ? true : false
    }

    isUser() {
        return sessionStorage.getItem('typeUser') === 'user' ? true : false
    }

    isBlocked() {
        return sessionStorage.getItem('typeUser') === 'blocked' ? true : false
    }

    /**
     * Função utilizada apenas por um admin: filtra utilizadores numa tabela. 
     */
    usersList(filterUsername, userType) {
        let filteredUsers = this.users.filter(
            user =>
                (user.username.toLowerCase().includes(filterUsername.toLowerCase()) || filterUsername === '')
                &&
                (user.type == userType || userType === '')
        )
        return filteredUsers
    }

    /**
     * Função utilizada apenas por um admin: edita um utilizador. 
     */
    adminUserEdit(username, newUsername, newPassword) {
        const id = this.users.find(user => user.username === username).id

        if (newUsername == '' && newPassword == '') {
            throw `Nada a mudar!`

        } else if (this.users.some(user => user.username === newUsername)) {
            throw `O utilizador "${newUsername}" já existe!`

        } else if (newUsername == '') {
            this.users[id-1].password = newPassword
            localStorage.setItem('users', JSON.stringify(this.users))

        } else if (newPassword == '') {
            this.users[id-1].username = newUsername
            localStorage.setItem('users', JSON.stringify(this.users))

        } else {
            this.users[id-1].username = newUsername
            this.users[id-1].password = newPassword
            localStorage.setItem('users', JSON.stringify(this.users))
        }
    }

    /**
     * Função utilizada apenas por um admin: bloqueia um utilizador. 
     */
    blockUser(username) {
        const id = this.users.find(user => user.username === username).id
        this.users[id-1].type = blocked
        localStorage.setItem('users', JSON.stringify(this.users))
    }
}