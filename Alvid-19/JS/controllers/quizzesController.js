import quizModel from '../models/quizModel.js'
import userModel from '../models/userModel.js';
import questionsModel from '../models/questionsModel.js';

export default class quizzesControler {
    constructor () {
        this.quizzes = localStorage.quizDetails ? JSON.parse(localStorage.getItem("quizDetails")) : [];
        this.users = localStorage.users ? JSON.parse(localStorage.getItem("users")) : [];
        // this.questions = [];
        const questions = []
        sessionStorage.setItem('questions', JSON.stringify(questions));
    }

    quizzesArray() {
        return this.quizzes;
    }

    createQuestions(title, photo, answer1, answer2, answer3, answer4, correctAnswer) {
        const questions = JSON.parse(sessionStorage.getItem('questions'));
        const id = questions.length + 1;
        const answers = [answer1, answer2, answer3, answer4];
        alert(questions)
        questions.push(new questionsModel(id, title, photo, answers, correctAnswer));
        sessionStorage.setItem('questions', JSON.stringify(questions));
        alert(questions)
    }

    createQuiz(name, image, description) {
        const questions = JSON.parse(sessionStorage.getItem('questions'));
        alert(questions);
        if (questions.length == 0) {
            alert('Não existem perguntas')
        } else {
            const id = this.quizzes.length + 1;
            // const questions = JSON.parse(sessionStorage.getItem('questions'));
            alert(questions);
            this.quizzes.push(new quizModel(id, name, image, description, questions));
            // this.questions = [];
            
            localStorage.setItem('quizDetails', JSON.stringify(this.quizzes));
            questions.length = 0;
            sessionStorage.setItem('questions', JSON.stringify(questions));
            alert(questions)
        }
        
    }
}