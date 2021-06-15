import quizModel from '../models/quizModel.js'
import userModel from '../models/userModel.js';
import questionsModel from '../models/questionsModel.js';

export default class quizzesControler {
    constructor () {
        this.quizzes = localStorage.quizDetails ? JSON.parse(localStorage.getItem("quizDetails")) : [];
        this.users = localStorage.users ? JSON.parse(localStorage.getItem("users")) : [];
    }

    quizzesArray() {
        return this.quizzes
    }

    createQuestions(title, photo, answers, correctAnswer) {
        const questions = []
        const id = questions.length + 1
        questions.push(new questionsModel(id, title, photo, answers, correctAnswer));
    }

    createQuiz(name, image, description, questions) {
        const id = this.quizzes.length + 1
        this.quizzes.push(new quizModel(id, name, image, description, questions))
        localStorage.setItem('quizDetails', JSON.stringify(this.quizzes))
    }
}