
import quizzesControler from "../controllers/quizzesController.js"

export default class quizzesView {
    constructor () {
        this.quizzesControler = new quizzesControler();

        this.quizTitle = document.querySelector('#quizTitle');
        this.quizCarousel = document.querySelector('#quizCarousel');
        this.descricaoJogo = document.querySelector('#descricaoJogo');
        this.quizQuestion = document.querySelector('#quizQuestion');
        this.imgQuiz = document.querySelector('#imgQuiz');
        this.btnNext = document.querySelector('#btnNext');
        this.quizContainer = document.querySelector('#quizContainer');
        this.bindQuiz()
    }

    bindQuiz(){
        const id = sessionStorage.getItem('idQuiz'); //este ID é uma string
        const quizzes = this.quizzesControler.quizzesArray();
        const name = quizzes.find(quizzes => quizzes.id == id).name;
        const image = quizzes.find(quizzes => quizzes.id == id).image;
        const description = quizzes.find(quizzes => quizzes.id == id).description;
    
        this.quizTitle.innerHTML = `<p id="titleSection">${name}</p>`;
        this.quizCarousel.src = `../${image}`;
        this.descricaoJogo.innerHTML = `${description}`;


        this.questions = quizzes.find(quizzes => quizzes.id == id).questions;
        
        // let idQuestion = 1;
        
        this.idQuestion = 0;
        this.pepe()
    }

    pepe() {
        this.btnNext.addEventListener('click', () => {
            this.idQuestion += 1;
            const title = this.questions[this.idQuestion -1].title;
            alert(title);
            const photo = this.questions[this.idQuestion -1].photo;
            const answers = this.questions[this.idQuestion -1].answers;
                // const correctAnswer = question.correctAnswer;

            let html = "";
            html += `
                <div class="row d-flex justify-content-center text-center mt-4" id="quizQuestion">
                    <p class="question">${this.idQuestion}. ${title}</p>
                </div>
    
                <div class="row d-flex justify-content-center mt-4">
                    <div class="col-sm-5  my-1 mb-4" id="imgQuiz">
                        <img src="${photo}" width="100%" >
                    </div>
                </div>
    
                <div class="row d-flex justify-content-center text-center mt-4">
                    <div class="col-6">
                        <button class="btn btn-primary mb-1 col-6" id="answer1">1) ${answers[0]}</button>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-primary mb-1 col-6" id="answer2">2) ${answers[1]}</button>
                    </div>
                </div>
                <div class="row d-flex justify-content-center text-center mt-4">
                    <div class="col-6">
                        <button class="btn btn-primary mb-1 col-6" id="answer3">3) ${answers[2]}</button>
                    </div>
                <div class="col-6">
                    <button class="btn btn-primary mb-1 col-6" id="answer4">4) ${answers[3]}</button>                            </div>
                </div>
                `
            this.quizContainer.innerHTML = html;
            // }
            // const photo = question.find(question => question.id === idQuestion).photo;
            // const answers = question.find(question => question.id === idQuestion).answers;
            // alert(answers);
            // idQuestion += 1;

        })   
        
        if (idQuestion < questions.length) {
            this.bindQuiz();
            this.pepe()
        }
        
    }
             
}
