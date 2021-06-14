import gameMemoryController from '../controllers/gameMemoryController.js'

export default class gameMemoryView {
    constructor() {
        this.gameMemoryController = new gameMemoryController();

        this.btnStart = document.querySelector('#btnStart')
        this.timer = document.querySelector('#timer')
        this.cardBoard = document.querySelector('#cardBoard')
        this.btnStartGame();

    }

    btnStartGame() {
        this.btnStart.addEventListener('click', () => {
            this.btnStart.disabled = true

            this.timer.style.backgroundColor = 'rgb(255, 136, 0)'
            this.gameMemoryController.startGame();
            this.addCards();
        })
    }

    addCards() {
        let boardHTML = ''
        const cards = this.gameMemoryController.getCards();
        this.images = this.gameMemoryController.getImages();
        
        cards.forEach((pos,i) => {
        
            boardHTML+=`
                <div class='col' id='div${i}' style="background-image: url('../Images/jogo da memoria/atrasCarta.png'); background-size: contain; background-repeat: no-repeat;">
                   <a type='button' id='card'><img class="front-face"  data-valor= '${pos}' id='${i}' width='100%' src="../Images/jogo da memoria/${this.images[pos-1]}" style="visibility:hidden"></a>
                </div>
            `
        })

        this.cardBoard.innerHTML = boardHTML
        this.startBoardGame();
    }

    startBoardGame() {
        let cardPairNumber = -1
        let cardBoardPosition = 0

        for (const btnCard of document.querySelectorAll('#card')) {
            btnCard.addEventListener('click', () => {
                
                if(this.gameMemoryController.getCantClick()) return;

                btnCard.childNodes[0].style.visibility="visible" //Torna a carta visível após o click
                let cardNowPairNumber = btnCard.childNodes[0].getAttribute('data-valor')

                // Se nesta jogada ainda não se virou nenhuma carta:
                if (!this.gameMemoryController.getCardTurned()) {
                    
                    this.gameMemoryController.updateCardTurnedTrue();

                    cardPairNumber = btnCard.childNodes[0].getAttribute('data-valor')
                    cardBoardPosition = btnCard.childNodes[0].id


                // Se já tiver uma carta virada nesta jogada:
                } else {
                    if(cardNowPairNumber == cardPairNumber && btnCard.childNodes[0].id != cardBoardPosition) {
                        this.gameMemoryController.correctPairs();

                        // Deixa o par descoberto "não clicável"
                        let btnCardBefore = document.getElementById(`div${cardBoardPosition}`)
                        btnCardBefore.innerHTML = `
                            <div id='card'><img class="front-face" id='${cardBoardPosition}' width='100%' src="../Images/jogo da memoria/${this.images[cardPairNumber-1]}" style="visibility:visible"></div>
                        `

                        let btnCardNow = document.getElementById(`div${btnCard.childNodes[0].id}`)
                        btnCardNow.innerHTML = `
                            <div id='card'><img class="front-face" id='${cardBoardPosition}' width='100%' src="../Images/jogo da memoria/${this.images[cardPairNumber-1]}" style="visibility:visible"></div>
                        `
                        
                    } else {
                        const p0 = cardBoardPosition
                        
                        // Trava os cliques por 1.3s e desvira as duas imagens
                        this.gameMemoryController.updateCantClickTrue();
                        setTimeout( () => {
                            btnCard.childNodes[0].style.visibility="hidden"
                            
                            let turnedCard = document.getElementById(p0)
                            
                            // Reestabelece o click na imagem novamente
                            turnedCard.style.visibility="hidden"
                            this.gameMemoryController.updateCantClickFalse();

                        },1300)
                    }
                    this.gameMemoryController.updateCardTurnedFalse();
                    cardPairNumber = -1
                    cardBoardPosition = 0
                }

                if(this.gameMemoryController.getCorrectPairs() == 10) {
                    this.btnStart.disabled = false
                    this.timer.style.backgroundColor = 'rgb(7, 241, 18)';
                    this.gameMemoryController.timerStop();

                    let endMinutes = this.timer.innerHTML.slice(0,2)

                    alert('Tempo de Jogo '+this.timer.innerHTML)

                    if (endMinutes == "00") {
                        alert('Ganhaste 75 Pontos!')
                        this.gameMemoryController.givePoints('75')
                    } else if(endMinutes == "01"){
                        alert('Ganhaste 65 Pontos!')
                        this.gameMemoryController.givePoints('65')
                    }else if(endMinutes == "02"){
                        alert('Ganhaste 55 Pontos!')
                        this.gameMemoryController.givePoints('55')
                    }else if(endMinutes == "03"){
                        alert('Ganhaste 45 Pontos!')
                        this.gameMemoryController.givePoints('45')
                    }else if(endMinutes >= "04"){
                        alert('Ganhaste 35 Pontos!')
                        this.gameMemoryController.givePoints('35')
                    }
                }
            })
        }
    }
}