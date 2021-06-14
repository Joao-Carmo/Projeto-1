import commentController from '../controllers/commentController.js'
import userController from '../controllers/userController.js';

export default class commentView {
    constructor() {
        this.commentController = new commentController();
        this.userController = new userController();


        this.btnDiv = document.querySelector('#btnDiv');
        this.isLogged()
        this.btnSendComment = document.querySelector('#btnSendComment');
        this.userComment = document.querySelector('#floatingTextarea2');
        
        this.commentsBox = document.querySelector('#commentsBox');
        
        this.bindCommentsList()
        this.addComment()
    }
    
    addComment() {
        this.btnSendComment.addEventListener('click', event => {
            const username = this.userController.loggedUser();
            const users = this.userController.usersArray();
            const photo = users.find(user => user.username === username).photo;
            const comment = this.userComment.value;
            const date = this.commentController.getDate();

            this.commentController.addComment(comment);
               
            this.commentsBox.innerHTML += `
                <div class="col-md-3 ml-5 mt-3 mb-5" id="cards">
                    <div class="card" id="backgroundCommentCard">
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <img src="../Images${photo}" width="100px" alt="Ícone Perfil" id="" id="iconPerfil" style="filter: drop-shadow(2px 2px 3px #606464); border-radius: 50px">
                            </div>
                            <p class="card-title text-center">${username}</p>
                            <p class="card-text" style="color: #5e5e5e;">${comment}</p>
                            <hr>
                            <h6 class="card-subtitle mb-2 text-mutedv text-center" style="color: #6064649c;">${date}</h6>
                        </div>
                    </div>
                </div>
            `
            event.preventDefault();
        })
    }

    bindCommentsList() {
        this.generateList(this.commentController.commentsArray());
    }

    generateList(comments) {
        let html = ""
        for (let pos = 0; pos < comments.length; pos++) {
            html += `
                <div class="col-md-3 ml-5 mt-3 mb-5" id="cards">
                    <div class="card" id="backgroundCommentCard">
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <img src="../Images${comments[pos].photo}" width="100px" alt="Ícone Perfil" id="" id="iconPerfil" style="filter: drop-shadow(2px 2px 3px #606464); border-radius: 50px">
                            </div>
                            <p class="card-title text-center">${comments[pos].username}</p>
                            <p class="card-text" style="color: #5e5e5e;">${comments[pos].comment}</p>
                            <hr>
                            <h6 class="card-subtitle mb-2 text-mutedv text-center" style="color: #6064649c;">${comments[pos].date}</h6>
                        </div>
                    </div>
                </div>
            `
        }
        this.commentsBox.innerHTML = html
    }

    isLogged() {
        if (this.userController.isLogged()) {
            this.btnDiv.innerHTML = ' <button type="button" class="efeito efeito-1" id="btnSendComment">Enviar Cometário</button>'
            
        } else {
            this.btnDiv.innerHTML = ' <button type="button" id="btnSendComment" disabled>Enviar Cometário</button>'
        }
    }
}