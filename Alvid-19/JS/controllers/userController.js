import userModel from '../models/userModel.js'

export default class userController {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.getItem("users")) : [];
        this.comments = localStorage.comments ? JSON.parse(localStorage.getItem("comments")) : [];
        this.avatars = localStorage.avatars ? JSON.parse(localStorage.getItem("avatars")) : [];
    }

    usersArray() {
        return this.users
    }

    usersAvatars() {
        return this.avatars
    }

    register(username, password, passwordConfirm, email, date) {
        if (!this.users.some(user => user.username === username)) {
            if (password == passwordConfirm) {
                const id = this.users.length + 1
                const type = 'user'
                const points = 0
                const photo = '/avatars/1.png'
                const favorites = []
                const games = 0
                const quizzes = 0
                this.users.push(new userModel(id,type,username,password,email,date,points,photo,favorites,games,quizzes));
                localStorage.setItem('users', JSON.stringify(this.users))
            } else {
                throw `As palavras-passe não coincidem!`
            }
            
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

    edit(newUsername, newPassword, newPasswordConfirm) {
        const id = sessionStorage.getItem('loggedUserId')
        const username = sessionStorage.getItem('loggedUser')

        if (newUsername == '' && newPassword == '' && newPasswordConfirm == '') {
            throw `Nada a mudar!`

        } else if (this.users.some(user => user.username === newUsername)) {
            throw `O utilizador "${newUsername}" já existe!`

        } else if (newUsername == '') {
            if (newPassword == newPasswordConfirm) {
                this.users[id-1].password = newPassword
                localStorage.setItem('users', JSON.stringify(this.users))
            } else {
                throw `As palavras-passe não coincidem!`
            }

        } else if (newPassword == '') {
            this.users[id-1].username = newUsername
            localStorage.setItem('users', JSON.stringify(this.users))
            sessionStorage.setItem('loggedUser', newUsername)

        } else {
            if (newPassword == newPasswordConfirm) {
                this.users[id-1].username = newUsername
                this.users[id-1].password = newPassword
                localStorage.setItem('users', JSON.stringify(this.users))
                sessionStorage.setItem('loggedUser', newUsername)
            } else {
                throw `As palavras-passe não coincidem!`
            }
        }
    }

    changeUserAvatars(idAvatar) {
        const id = sessionStorage.getItem('loggedUserId')
        this.users[id-1].photo = `/avatars/${idAvatar}.png`
        localStorage.setItem('users', JSON.stringify(this.users))
    }

    loggedUser() {
        return sessionStorage.getItem('loggedUser')
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

    userFromTable(username) {
        sessionStorage.setItem('userFromAdminTable', username)
    }

    /**
     * Função utilizada apenas por um admin: edita um utilizador. 
     */
    adminUserEdit(newUsername, newPassword, confirmNewPassword) {
        const username = sessionStorage.getItem('userFromAdminTable')
        const id = this.users.find(user => user.username === username).id

        if (newUsername == '' && newPassword == '') {
            throw `Nada a mudar!`

        } else if (this.users.some(user => user.username === newUsername)) {
            throw `O utilizador "${newUsername}" já existe!`

        } else if (newUsername == '') {
            if (confirmNewPassword == newPassword) {
                this.users[id-1].password = newPassword
                localStorage.setItem('users', JSON.stringify(this.users))
            } else {
                throw `As palavras-passe não coincidem`
            }

        } else if (newPassword == '') {
            this.users[id-1].username = newUsername
            localStorage.setItem('users', JSON.stringify(this.users))

        } else {
            if (confirmNewPassword == newPassword) {
                this.users[id-1].username = newUsername
                this.users[id-1].password = newPassword
                localStorage.setItem('users', JSON.stringify(this.users))
            } else {
                throw `As palavras-passe não coincidem`
            }
        }
    }

    /**
     * Função utilizada apenas por um admin: bloqueia um utilizador. 
     */
    blockUser(username) {
        const id = this.users.find(user => user.username === username).id
        this.users[id-1].type = 'blocked'
        localStorage.setItem('users', JSON.stringify(this.users))
    }

    /**
     * Função utilizada apenas por um admin: bloqueia um utilizador. 
     */
    makeAdmin() {
        const username = sessionStorage.getItem('userFromAdminTable')
        const id = this.users.find(user => user.username === username).id
        this.users[id-1].type = 'admin'
        localStorage.setItem('users', JSON.stringify(this.users))
    }

    /**
     * Função utilizada apenas por um admin: bloqueia um utilizador. 
     */
    makeUser() {
        const username = sessionStorage.getItem('userFromAdminTable')
        const id = this.users.find(user => user.username === username).id
        this.users[id-1].type = 'user'
        localStorage.setItem('users', JSON.stringify(this.users))
    }

    isUserType() {
        const username = sessionStorage.getItem('userFromAdminTable')

        if (this.users.find(user => user.username === username).type == 'user') {
            return 'user'
        } else if (this.users.find(user => user.username === username).type == 'admin') {
            return 'admin'
        } else {
            return 'blocked'
        }
    }

    isUserBlocked(username) {
        if (this.users.find(user => user.username === username).type == 'user') {
            return 'user'
        } else if (this.users.find(user => user.username === username).type == 'admin') {
            return 'admin'
        } else {
            return 'blocked'
        }
    }

    getUserFromTable() {
        return sessionStorage.getItem('userFromAdminTable')
    }

    /**
     * Função que adiciona aos favoritos do utilizador, o jogo/quiz que o mesmo favoritou. 
     */
    userFavorites(favorited) {
        const id = sessionStorage.getItem('loggedUserId')
        this.users[id-1].favorites.push(favorited)
        localStorage.setItem('users', JSON.stringify(this.users))
    }

    getFavorites() {
        const id = sessionStorage.getItem('loggedUserId')
        return this.users[id-1].favorites
    }
}

    