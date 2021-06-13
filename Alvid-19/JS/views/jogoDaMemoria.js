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



// Evento para o botão (mistura as imagens)

document.querySelector('#btnStart').addEventListener('click', function () {
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
                    setTimeout( ()=>{
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