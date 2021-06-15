import quizModel from '../models/quizModel.js'
import userModel from '../models/userModel.js';
import questionsModel from '../models/questionsModel.js';

export default class quizzesControler {
    constructor () {
        this.quizzes = localStorage.quizDetails ? JSON.parse(localStorage.getItem("quizDetails")) : [];
        this.users = localStorage.users ? JSON.parse(localStorage.getItem("users")) : [];
        this.questions = [];
    }

    quizzesArray() {
        return this.quizzes;
    }

    createQuestions(title, photo, answer1, answer2, answer3, answer4, correctAnswer) {
        const id = this.questions.length + 1;
        const answers = [answer1, answer2, answer3, answer4];
        this.questions.push(new questionsModel(id, title, photo, answers, correctAnswer));
    }

    createQuiz(name, image, description) {
        if (this.questions.length == 0) {
            alert('Não existem perguntas')
        } else {
            const id = this.quizzes.length + 1;
            this.quizzes.push(new quizModel(id, name, image, description, this.questions));
            
            localStorage.setItem('quizDetails', JSON.stringify(this.quizzes));
            alert('Quiz criado!')

            setTimeout(() => {
                location.reload()
            }, 1000);
        }
        
    }
}