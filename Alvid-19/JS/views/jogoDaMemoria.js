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
let cardHTML = '';
let fundo = ['atrasCarta.png']
images.forEach((img,i) =>{
    
    
    cardHTML+=`
        
        <div class='col'  id='memory-card' style="background-image: url('../Images/jogo da memoria/atrasCarta.png'); background-size: contain; background-repeat: no-repeat;">
           <a type='button' id='carta'><img class="front-face"  data-valor= '${i}' width='100%' src="../Images/jogo da memoria/${img}" style="visibility:hidden"></a>
            
        </div>

        
        <div class='col' id='memory-card' style="background-image: url('../Images/jogo da memoria/atrasCarta.png');background-size: contain; background-repeat: no-repeat;">
            <a type='button' id='carta'><img class="front-face" data-valor= '${i}' width='100%' src="../Images/jogo da memoria/${img}" style="visibility:hidden"></a>
        </div>
    `
    /* clickCartinha() */
    /* a.onclick = alert('cu2') */
    const cartas = document.querySelectorAll('#carta')
    for (const carta of cartas) {
    carta.onclick = alert('cu2')
}})

// evento para o botão

document.querySelector('#btnStart').addEventListener('click', function () {
    for(let i=0; i<cards.length; i++){
        let p = Math.trunc(Math.random()*cards.length);
        let aux = cards[p];
        cards[p]= cards[i];
        cards[i] = aux;
    }
    console.log(cards);
})

/* function clickCartinha() {
    const cartas = document.querySelectorAll('#carta')
    for (const carta of cartas) {
    carta.addEventListener('onclick', function (event) {
        alert('cu')
        event.preventDefault()
})
}
} */




cardBoard.innerHTML = cardHTML;