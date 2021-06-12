
import quizzesControler from "../controllers/quizzesController.js"

export default class quizzesView {
    constructor (){
        this.quizzesControler = new quizzesControler();

        this
    }
}





document.querySelector('#btnStart').addEventListener('click', function () {
    
    //Desabilita o botão
    document.querySelector('#btnStart').disabled = true;

})