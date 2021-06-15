export default class gameMemoryController {
    constructor() {
        this.images = localStorage.memoryCards ? JSON.parse(localStorage.getItem("memoryCards")) : [];
        this.cards = localStorage.memoryCardsPairs ? JSON.parse(localStorage.getItem("memoryCardsPairs")) : [];
        this.users = localStorage.users ? JSON.parse(localStorage.getItem("users")) : [];

        this.cantClick = false
        this.cardTurned = false
        this.cardPairNumber = -1
        this.cardBoardPosition = 0
        this.correct = 0
        this.points = 0
    }

    getCards() {
        return this.cards
    }

    getImages() {
        return this.images
    }

    getCantClick() {
        return this.cantClick
    }

    getCardPairNumber() {
        return this.cardPairNumber
    }

    getCardBoardPosition() {
        return this.cardBoardPosition
    }

    getCardTurned() {
        return this.cardTurned
    }

    updateCardTurnedTrue() {
        this.cardTurned = true
    }

    updateCardTurnedFalse() {
        this.cardTurned = false
    }

    updateCantClickTrue() {
        this.cantClick = true
    }

    updateCantClickFalse() {
        this.cantClick = false
    }

    resetAttributes() {
        this.cardTurned = false
        this.cardPairNumber = -1
        this.cardBoardPosition = 0
    }

    /**
    * Função que acumula os pares que o utilizador vai acertando à medida que joga.
    */
    correctPairs() {
        this.correct++
    }

    getCorrectPairs() {
        return this.correct
    }

    givePoints(givenPoints) {
        const username = sessionStorage.getItem('loggedUser')
        const id = sessionStorage.getItem('loggedUserId')

        let points = +(this.users.find(user => user.username === username).points)
        points += +givenPoints

        let games = +(this.users.find(user => user.username === username).games)
        games += 1

        this.users[id-1].points = points
        this.users[id-1].games = games
        localStorage.setItem('users', JSON.stringify(this.users))
    }

    startGame() {

        this.gameTimer = new Timer('#timer') // Inicia o temporizador HTML
        this.gameTimer.start()

        // Aleatoriza a ordem das posições das cartas
        for(let i=0; i< this.cards.length; i++){
            let p = Math.trunc(Math.random()*this.cards.length);
            let tool = this.cards[p];
            this.cards[p] = this.cards[i];
            this.cards[i] = tool;
        }
        
        console.log(this.cards);

        // Redefinir estado do jogo
        this.cantClick = false;
        this.cardTurned = false
        this.cardPairNumber = -1
        this.cardBoardPosition = 0
        this.correct = 0
    }

    timerStop() {
        this.gameTimer.stop()
    }
}


/**
* Class do temporizador 
*/
class Timer {
    constructor(element) {
        this.element = element;
        this.time = 0; // controla o tempo
        this.control = null;
        this.start = () => {
            this.time = 0; // zera o tempo assim que recomeçar
            this.control = setInterval(() => {
                this.time++;
                const minutes = Math.trunc(this.time / 60); // Converte o formato
                const seconds = this.time % 60;
                document.querySelector(this.element).innerHTML =
                    (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds; // Ajusta formatação, se for menor que 10 colocar um "0" a frente do número
            }, 1000);
        };

        this.stop = () => {
            clearInterval(this.control);
            this.control = null;
        };
    }
}
