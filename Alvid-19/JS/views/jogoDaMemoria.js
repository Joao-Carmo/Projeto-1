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

let cliquesTravados = false;
let temCartaVirada = false
let posicaoCartaVirada = -1
let valorCartaVirada = 0
let pontos = 0



// Evento para o botão (mistura as imagens)

document.querySelector('#btnStart').addEventListener('click', function () {
    for(let i=0; i<cards.length; i++){
        let p = Math.trunc(Math.random()*cards.length);
        let aux = cards[p];
        cards[p]= cards[i];
        cards[i] = aux;
    }
    console.log(cards);
    addCards(cards,images)

    // Redefinir estado do jogo

    cliquesTravados = false;
    temCartaVirada = false
    posicaoCartaVirada = -1
    valorCartaVirada = 0
    pontos = 0
})

// Coloca as imagens

function addCards(cards,images) {
    let cardHTML = '';
    cards.forEach((pos,i) =>{
    
    
        cardHTML+=`
            
            <div class='col'  id='memory-card' style="background-image: url('../Images/jogo da memoria/atrasCarta.png'); background-size: contain; background-repeat: no-repeat;">
               <a type='button' id='carta'><img class="front-face"  data-valor= '${pos}' id='${i}' width='100%' src="../Images/jogo da memoria/${images[pos-1]}" style="visibility:hidden"></a>
                
            </div>
        `
        
    })

    cardBoard.innerHTML = cardHTML;

    // Assim que o botão start for precionado, ele será desabilitado

    document.querySelector('#btnStart').disabled = true;

    const cartas = document.querySelectorAll('#carta')

    for (const carta of cartas) {

    carta.addEventListener('click', function () {
        if(cliquesTravados) return;
        carta.childNodes[0].style.visibility="visible" //Torna a carta visível após o click
        //carta.removeAttribute('onclick')
        carta.onclick = null

       //let valor = carta.childNodes[0].getAttribute('data-valor')
       let valor = carta.childNodes[0].id
       let valorCarta = carta.childNodes[0].getAttribute('data-valor')
       
       
        if(!temCartaVirada){   // Se não tiver carta virada, após o click na imagem, mantém ela virada
            temCartaVirada = true
            //posicaoCartaVirada = carta.childNodes[0].id  /* problema com variável */
            posicaoCartaVirada = carta.childNodes[0].getAttribute('data-valor')
           
            //valorCartaVirada = carta.childNodes[0].getAttribute('data-valor')  /* problema com variável */
            valorCartaVirada = carta.childNodes[0].id
            
        }else{  // Se ja tiver carta virada, compara valores
            if(valorCarta == posicaoCartaVirada){
                pontos++                // Se o valor das cartas viradas forem iguais, ganha pontos.
            }else{
                const p0 = valorCartaVirada
                const p2 = posicaoCartaVirada
                cliquesTravados=true    // Se não, trava os cliques por 3s e desvira as duas imagens
                setTimeout( ()=>{
                    carta.childNodes[0].style.visibility="hidden"
                    
                    let img = document.getElementById(p0) /* problema com variável, pega a imagem de dentro do jogo da memória + a posição dela ?? 48:49 */
                    
                    
                    img.style.visibility="hidden" // Reestabelece o click na imagem novamente
                    
                    cliquesTravados= false

                },1300)
            }
            temCartaVirada = false
            posicaoCartaVirada = -1
            valorCartaVirada = 0
            
        }

        //let valor = valorCartaVirada

        

        if(pontos==10){     // Concluindo os 10 pares, o botão start abilita novamente
            document.querySelector('#btnStart').disabled = false
        }
        
})
}
}





    
    






