
import quizzesControler from "../controllers/quizzesController.js"

export default class quizzesView {
    constructor (){
        this.quizzesControler = new quizzesControler();

        this.quizTitle = document.querySelector('#quizTitle');
        this.quizCarousel = document.querySelector('#quizCarousel');
        this.descricaoJogo = document.querySelector('#descricaoJogo');
        this.quizQuestion = document.querySelector('#quizQuestion');
        this.imgQuiz = document.querySelector('#imgQuiz');
        this.btnStart = document.querySelector('#btnStart');
        this.bindQuiz()
    }

    bindQuiz(){

        let id = 1
        const quizzes = this.quizzesControler.quizzesArray()
        const name = quizzes.find (quizzes=> quizzes.id === id).name
        this.quizTitle.innerHTML = `<p id="titleSection">${name}</p>`
            
        
    }

    /* this.btnStart.addEventListener('click', () => {
                    
    }) */
}






/* document.querySelector('#btnStart').addEventListener('click', function () {
    
    //Desabilita o botão
    document.querySelector('#btnStart').disabled = true;

}) */