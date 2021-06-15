import gameHangmanController from "../controllers/gameHangmanController.js";

export default class gameHangmanView {
    constructor() {
        this.gameHangmanController = new gameHangmanController();

        this.div = document.getElementById("word")
        this.generateBoardSpans();
        
        this.section = document.getElementById("letters")
        this.generateBoardButtons();
    }

    /**
     * Acrescenta os spans da palavra selecionada
     */
    generateBoardSpans() {
        const word = this.gameHangmanController.getWord();
        for (let position = 0; position < word.length; position++) {
            let span = document.createElement("span")
            span.setAttribute('id', position);
            this.div.appendChild(span);
        }
    }

    /**
     * Acrescenta os botões com todas as letras do abcedário
     */
    generateBoardButtons() {
        const letters = this.gameHangmanController.getLetters();

        for (let position = 0; position < letters.length; position++) {
            let button = document.createElement("button")
            let letter = document.createTextNode(letters[position])

            button.appendChild(letter);
            // button.setAttribute('onclick', 'chooseletter(\''+letters[position]+'\')');
            button.setAttribute('class', 'btnLetters');
            button.setAttribute('id', letters[position]);
        
            this.section.appendChild(button);
        }
        this.chooseletter();
    }

    /**
     * Função que conforme os botões das letras clicados verifica se acertou na letra da palavra ou não.
     * @param {letter} letter letra foi clicada pelo botão 
     */
    chooseletter() {
        const btnLetters = document.querySelectorAll('.btnLetters')
        for (const btnLetter of btnLetters) {
            btnLetter.addEventListener('click', () => {
                const letter = btnLetter.getAttribute('id')

                let correct = false;

                // Percorre todas as letras da palavra aleatória escolhida e vê se alguma corresponde à escolhida
                const word = this.gameHangmanController.getWord();
                for (let position = 0; position < word.length; position++) {

                    //Se acertar numa letra:
                    if (letter === word[position]) {
                        this.gameHangmanController.updateRight();
                        
                        let span = document.getElementById(position);
                        let getLetter = document.createTextNode(letter);

                        span.appendChild(getLetter);

                        btnLetter.setAttribute('id', 'correct'); //Troca id para 'correct'
                        btnLetter.disabled = true

                        correct = true;
                    }
                }

                if (correct === false) {
                    this.gameHangmanController.updateImage();
                    const image = this.gameHangmanController.getImage();

                    document.getElementById("forca").src = "../Images/jogo_da_forca/forca-"+image+".png"; //Troca image na forca

                    let button = document.getElementById(letter);
                    button.setAttribute('id', 'wrong'); //Troca id para wrong.
                    btnLetter.disabled = true

                    this.gameHangmanController.updateChances();
                }

                // Fim de jogo

                //Perdeu
                const chances = this.gameHangmanController.getChances();
                if (chances === 0) {
                    let message = document.createElement("p");
                    let textLose = document.createTextNode("Perdeste!"); // Esgotam-se as chances
                    message.appendChild(textLose);

                    // Disabilita o click de todos os botões
                    let buttons = document.querySelectorAll('.btnLetters')
                    for (const button of buttons) {
                        button.disabled = true
                    }

                    let button = document.createElement("button");
                    let textPlayAgain = document.createTextNode("Jogar novamente");
                    //right=1
                    
                    button.appendChild(textPlayAgain);
                    button.setAttribute('class', 'btn btn-primary');
                    button.setAttribute('onclick', 'window.location.reload()');

                    let div = document.getElementById("new");
                    div.appendChild(message);
                    div.appendChild(button);
                }

                // Vencer

                const right = this.gameHangmanController.getRight();
                if (right === word.length) {
                    this.gameHangmanController.updatePoints();

                    let message = document.createElement("p");
                    let textLose = document.createTextNode("Venceste!");
                    message.appendChild(textLose);

                    // Disabilita o click de todos os botões
                    let buttons = document.querySelectorAll('.btnLetters')
                    for (const button of buttons) {
                        button.disabled = true
                    }

                    let button = document.createElement("button");
                    let textPlayAgain = document.createTextNode("jogar novamente");
                    
                    button.appendChild(textPlayAgain);
                    button.setAttribute('class', 'btn btn-primary');
                    button.setAttribute('onclick', 'window.location.reload()');

                    let div = document.getElementById("new");
                    div.appendChild(message);
                    div.appendChild(button);
                }
            })
        }
    }
}