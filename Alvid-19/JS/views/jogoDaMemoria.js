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

let fundo = ['atrasCarta.png']

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
})

// Coloca as imagens

function addCards(cards,images) {
    let cardHTML = '';
    cards.forEach((pos,i) =>{
    
    
        cardHTML+=`
            
            <div class='col'  id='memory-card' style="background-image: url('../Images/jogo da memoria/atrasCarta.png'); background-size: contain; background-repeat: no-repeat;">
               <a type='button' id='carta'><img class="front-face"  data-valor= '${i}' id='${pos}' width='100%' src="../Images/jogo da memoria/${images[pos-1]}" style="visibility:hidden"></a>
                
            </div>
        `
        
    })

    cardBoard.innerHTML = cardHTML;

    // Assim que o botão start for precionado, ele será desabilitado

    document.querySelector('#btnStart').disabled = true;

    const cartas = document.querySelectorAll('#carta')

    for (const carta of cartas) {

    carta.addEventListener('click', function (img) {
        if(cliquesTravados) return;
        carta.childNodes[0].style.visibility="visible" //Torna a carta visível após o click

        if(!temCartaVirada){
            temCartaVirada = true
            posicaoCartaVirada = img.id  /* problema com variável */
            alert(posicaoCartaVirada)
            valorCartaVirada = carta.childNode[0]  /* problema com variável */
            alert(valorCartaVirada)
        }else{
            if(valor == valorCartaVirada){
                pontos++                // Se o valor das cartas viradas forem iguais, ganha pontos.
            }else{
                cliquesTravados=true    // Se não, trava os cliques por 3s e desvira as duas imagens
                setTimeout( ()=>{
                    carta.childNodes[0].style.visibility="hidden"
                    let img = document.querySelector('#id') /* problema com variável */
                    cliquesTravados= false
                },3000)
            }
            
        }

        cliquesTravados = true

        setTimeout( ()=>{
            carta.childNodes[0].style.visibility="hidden"
            cliquesTravados= false
        },3000)

        if(pontos==10){     // Concluindo os 10 pares, o botão start abilita novamente
            document.querySelector('#btnStart').disabled = false
        }
        
})
}
}





    
    






