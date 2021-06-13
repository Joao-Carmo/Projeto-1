import commentModel from '../models/commentModel.js'
export default class commentController {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.getItem("users")) : [];
        this.comments = localStorage.comments ? JSON.parse(localStorage.getItem("comments")) : [];
    }

    commentsArray() {
        return this.comments
    }

    addComment(comment) {
        const username = sessionStorage.getItem('loggedUser')
        alert(username)
        alert(this.users);
        const idUser = this.users.find(user => user.username === username).id
        const photo = this.users.find(user => user.username === username).photo
        const date = new Date().getFullYear()
        const id = +this.comments.length + 1
    
        this.comments.push(new commentModel(id,idUser,username,date,photo,comment));
        localStorage.setItem('comments', JSON.stringify(this.comments));
    }

    /**
     * Função que atualiza o username do utilizador nos comentários que o mesmo fez. 
     */
     userCommentUpdate(username,newUsername) {
        this.comments.filter(comment => comment.username == username).map(comment => comment.username == newUsername)
        // this.comments.find(comment => comment.username === username)
    }
}