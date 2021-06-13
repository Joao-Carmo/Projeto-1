import quizModel from "../models/quizModel.js"

export default class quizzesControler {
    constructor (){
        this.quizzes= localStorage.quizDetails ? JSON.parse(localStorage.getItem("quizDetails")) : [];

    }

    quizzesArray(){
        return this.quizzes
                
    }
}