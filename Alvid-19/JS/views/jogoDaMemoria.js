const cardBoard = document.querySelector("#cardBoard");
const images = [
    "meninadepé.png",
    'meninaSentada.png',
    'molecula.png',
    'poteQuimico.png',
    'termometro.png',
    'vacina.png',
    'virus1.png',
    'virus2.png',
    'virus3.png',
    'mascara.png'

];
let cards= [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];

let cantClick = false; //cliquesTravados
let cardTurned = false //temCartaVirada
let cardPairNumber = -1 //posicaoCartaVirada
let cardBoardPosition = 0 //valorCartaVirada
let correct = 0 //pontos
const gameTimer = new Timer('#timer') // Temporizador HTML


// Evento para o botão (mistura as imagens)

document.querySelector('#btnStart').addEventListener('click', function () {
    document.querySelector('#timer').style.backgroundColor = 'rgb(106, 61, 219)' // Troca de cor do Timer quando começar
    gameTimer.start() // começa a função de iniciar o tempo


    for(let i=0; i<cards.length; i++){
        let p = Math.trunc(Math.random()*cards.length);
        let tool = cards[p];
        cards[p]= cards[i];
        cards[i] = tool;
    }
    console.log(cards);
    addCards(cards,images)

    // Redefinir estado do jogo

    cantClick = false;
    cardTurned = false
    cardPairNumber = -1
    cardBoardPosition = 0
    correct = 0
})

// Coloca as imagens

function addCards(cards,images) {
    let cardHTML = '';
    cards.forEach((pos,i) =>{
    
    
        cardHTML+=`
            <div class='col'  id='memory-card' style="background-image: url('../Images/jogo da memoria/atrasCarta.png'); background-size: contain; background-repeat: no-repeat;">
               <a type='button' id='card'><img class="front-face"  data-valor= '${pos}' id='${i}' width='100%' src="../Images/jogo da memoria/${images[pos-1]}" style="visibility:hidden"></a>
                
            </div>
        `
        
    })

    cardBoard.innerHTML = cardHTML;

    // Assim que o botão start for precionado, ele será desabilitado
    document.querySelector('#btnStart').disabled = true;

    const btnCards = document.querySelectorAll('#card') //btnCards -> cartas

    for (const btnCard of btnCards) {
        btnCard.addEventListener('click', function () {
            if(cantClick) return;
            btnCard.childNodes[0].style.visibility="visible" //Torna a carta visível após o click

            // btnCard.type = ''
            // removeClickTurnedCard(btnCard)
            //carta.removeAttribute('onclick')
            // btnCard.onclick = null

            //let valor = carta.childNodes[0].getAttribute('data-valor')
            //let valor = carta.childNodes[0].id
            let cardNowPairNumber = btnCard.childNodes[0].getAttribute('data-valor') //cardNowPairNumber -> valorCarta
        
        
            if(!cardTurned){   // Se não tiver carta virada, após o click na imagem, mantém ela virada
                cardTurned = true

                //cardPairNumber = carta.childNodes[0].id  /* problema com variável */
                cardPairNumber = btnCard.childNodes[0].getAttribute('data-valor')
            
                //valorCartaVirada = carta.childNodes[0].getAttribute('data-valor')  /* problema com variável */
                cardBoardPosition = btnCard.childNodes[0].id
                
            }else{  // Se ja tiver carta virada, compara valores
                if(cardNowPairNumber == cardPairNumber && btnCard.childNodes[0].id != cardBoardPosition){
                    correct++                // Se o valor das cartas viradas forem iguais, ganha pontos.
                }else{
                    const p0 = cardBoardPosition
                    // const p2 = cardPairNumber
                    cantClick=true    // Se não, trava os cliques por 1.3s e desvira as duas imagens
                    setTimeout( ()=>{  // Executa um bloco específico uma vez depois de um determinado tempo
                        btnCard.childNodes[0].style.visibility="hidden"
                        
                        let turnedCard = document.getElementById(p0)
                        
                        turnedCard.style.visibility="hidden" // Reestabelece o click na imagem novamente
                        
                        cantClick= false

                    },1300)

                    // btnCard.type = 'button'
                    // document.getElementById(p0).parentNode.type = 'button'
                    // giveClickCard(document.getElementById(p0).parentNode)
                    // giveClickCard(btnCard)
                }
                cardTurned = false
                cardPairNumber = -1
                cardBoardPosition = 0
                
            }

            //let valor = valorCartaVirada
            if(correct==10){     // Concluindo os 10 pares, o botão start abilita novamente
                document.querySelector('#btnStart').disabled = false
                document.querySelector('#timer').style.backgroundColor = 'rgb(7, 241, 18)'; //Muda de cor quando ele ganhar
                gameTimer.stop() // para a função de iniciar o tempo
            } 
    })}
}

function removeClickTurnedCard(btnCard) {
    btnCard.parentNode.innerHTML = `
    <a id='card'>
        ${btnCard.innerHTML}
    </a>`
}

function giveClickCard(btnCard) {
    btnCard.parentNode.innerHTML = `
    <a type='button' id='card'>
        ${btnCard.innerHTML}
    </a>`
}

//------------------------
// Timer
//------------------------

function Timer(element) {
    this.element = element
    this.time = 0 // controla o tempo
    this.control = null
    this.start = () => { // inicia o contador
        this.time = 0 // zera o tempo assim que recomeçar
        this.control = setInterval ( ()=>{ // Executa um bloco específico repetidamente a cada 1000
            this.time++;
            const minutes = Math.trunc(this.time / 60); // Converte o formato
            const seconds = this.time % 60
            document.querySelector(this.element).innerHTML = 
            (minutes < 10 ? '0':'') + minutes + ':'+(seconds < 10?'0': '') + seconds // Ajusta formatação, se for menor que 10 colocar um "0" a frente do número
        }, 1000)
    }
    this.stop = () => {
        clearInterval(this.control);
        this.control = null
    }
}