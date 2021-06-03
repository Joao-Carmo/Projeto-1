import userModel from '../models/userModel.js'

export default class userController {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }

    register(username, password) {
        if (!this.users.some(user => user.username === username)) {
            const id = +(users.length + 1)
            const type = 'user'
            const points = 0
            this.users.push(new userModel(id,type,username,password,email,date,points));
            localStorage.setItem('users', JSON.stringify(this.users))
        } else {
            throw Error(`User with username "${username}" already exists!`);
        }
    }

    login(username, password) {
        if (this.users.some(user => user.username === username && user.password === password)) {
            const type = this.users.find(user => user.username === username).type
            console.log(type);
            sessionStorage.setItem('loggedUser', username)
            sessionStorage.setItem('typeUser', type)
        } else {
            throw Error('Invalid login!');
        }
    }

    logout() {
        sessionStorage.removeItem('loggedUser')
    }

    isLogged() {
        return sessionStorage.getItem('loggedUser') ? true : false
    }
}