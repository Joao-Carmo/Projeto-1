
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
        this.divBtnNext = document.querySelector('#divBtnNext')
        this.btnFinish = document.querySelector('#btnFinish')
        this.bindQuiz()
        this.generateQuestions();
    }

    bindQuiz(){
        const id = sessionStorage.getItem('idQuiz'); //este ID é uma string
        const quizzes = this.quizzesControler.quizzesArray();
        const name = quizzes.find(quizzes => quizzes.id == id).name;
        const image = quizzes.find(quizzes => quizzes.id == id).image;
        const description = quizzes.find(quizzes => quizzes.id == id).description;
    
        this.quizTitle.innerHTML = `<p id="titleSection">${name}</p>`;

        if (id == '1') {
            this.quizCarousel.src = `../${image}`
        } else {
            this.quizCarousel.src = image
        }

        this.quizCarousel.id = id
        this.descricaoJogo.innerHTML = `${description}`;


        this.questions = quizzes.find(quizzes => quizzes.id == id).questions;
        this.final = this.questions.length
        
        // let idQuestion = 1;
        
        this.idQuestion = 0;
    }

    generateQuestions() {
        this.btnNext.addEventListener('click', () => {
            this.idQuestion += 1;

            if (this.idQuestion == this.questions.length) {
                this.btnNext.innerHTML = 'Finalizar'
            }
            
            if (this.idQuestion == this.questions.length+1) {

                const points = this.quizzesControler.getPoints();
                this.quizzesControler.updateUserPoints()
                
                alert('Fizeste '+points+' pontos!')
            }

            const title = this.questions[this.idQuestion -1].title;
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
                    <div class="col-6" id="1">
                        <button class="btn btn-primary mb-1 col-6" id="answer" style="font-family: 'FonteSite'; src: url("../Fonts/MouseMemoirs-Regular.ttf"); font-size: 150%; background-color: #08a4ff;border: none;">
                            ${answers[0]}
                        </button>
                    </div>
                    <div class="col-6" id="2">
                        <button class="btn btn-primary mb-1 col-6" id="answer" style="font-family: 'FonteSite'; src: url("../Fonts/MouseMemoirs-Regular.ttf"); font-size: 150%; background-color: #08a4ff;border: none;">
                            ${answers[1]}
                        </button>
                    </div>
                </div>
                <div class="row d-flex justify-content-center text-center mt-4">
                    <div class="col-6" id="3">
                        <button class="btn btn-primary mb-1 col-6" id="answer" style="font-family: 'FonteSite'; src: url("../Fonts/MouseMemoirs-Regular.ttf"); font-size: 150%; background-color: #08a4ff;border: none;">
                            ${answers[2]}
                        </button>
                    </div>
                <div class="col-6" id="4">
                    <button class="btn btn-primary mb-1 col-6" id="answer" style="font-family: 'FonteSite'; src: url("../Fonts/MouseMemoirs-Regular.ttf"); font-size: 150%; background-color: #08a4ff;border: none;">
                        ${answers[3]}
                    </button>
                </div>
                `
 
            this.quizContainer.innerHTML = html;

            const btnAnswers = document.querySelectorAll('#answer')
            for (const answer of btnAnswers) {
                answer.addEventListener('click', () => {

                    if (answer.parentNode.id == this.questions[this.idQuestion-1].correctAnswer) {
                        
                        this.quizzesControler.updateRight();

                        answer.style.backgroundColor = '#5bcf2c'    
                        for (const btnAnswer of btnAnswers) {
                            btnAnswer.disabled = true
                        }
                    } else {
                        answer.style.backgroundColor = 'red'
                        for (const btnAnswer of btnAnswers) {
                            btnAnswer.disabled = true 
                        }
                    }
                })
            }
        })   
    }  
}
             

