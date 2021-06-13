let words = ["covid", "alvid", "aprender", "jogar", "mascara", "vacina", "alcool", "brincar", "quarentena", "distancia", "aplicativo", "quiz", "sabao", "crianca"];

let word = words[Math.floor(Math.random() * words.length)];

let chances = 6;
let right = 1;

let image = 0;


let position;



// Cria Span com os espaços das letters da word

for (position = 0; position < word.length; position++) {
    let span = document.createElement("span");
    span.setAttribute('id', position);                     

    let div = document.getElementById("word");
    div.appendChild(span);
}

// Cria botões do alphabet

let alphabet = "abcdefghijklmnopqrstuvwxyz";
let letters = alphabet.split("");

for (position = 0; position < letters.length; position++) {
    let button = document.createElement("button");
    let letter = document.createTextNode(letters[position]);
    
    button.appendChild(letter);
    button.setAttribute('onclick', 'chooseletter(\''+letters[position]+'\')');
    button.setAttribute('id', letters[position]);

    button.setAttribute('class', 'buttons')

    let section = document.getElementById("letters");
    section.appendChild(button);
}

function chooseletter(letter) {

    let correct = false;

    for (position = 0; position < word.length; position++) {
        if (letter === word[position]) {       // Se a letter for igual a uma letter da word, é add.
            right++;
            let span = document.getElementById(position);
            let getLetter = document.createTextNode(letter);

            span.appendChild(getLetter);

            let button = document.getElementById(letter);
            
            button.setAttribute('id', 'correct');  //Troca id para correct
            
            button.removeAttribute('onclick'); //Proibe image de ser clicada

            
            correct = true;
        }
    }

    if (correct === false) {
        image++;
        document.getElementById("forca").src = "../Images/jogo_da_forca/forca-"+image+".png"; //Troca image na forca

        let button = document.getElementById(letter);
        button.setAttribute('id', 'wrong'); //Troca id para wrong.
        button.removeAttribute('onclick');

        chances--;
    }

    // Fim de jogo

    //Perdeu

    if (chances === 0) {
        let message = document.createElement("p");
        let textLose = document.createTextNode("Você perdeu!"); // Esgotam-se as chances
        message.appendChild(textLose);

        let buttons = document.querySelectorAll('.buttons')

        for (const button of buttons) {
            button.removeAttribute('onclick')     // Impede de uma nova tentativa
        }

        

        let button = document.createElement("button");
        let textPlayAgain = document.createTextNode("jogar novamente");
        //right=1
        
        button.appendChild(textPlayAgain);
        button.setAttribute('class', 'btn btn-primary');
        button.setAttribute('onclick', 'window.location.reload()');

        let div = document.getElementById("new");
        div.appendChild(message);
        div.appendChild(button);
    }

    // Vencer

    if (right === word.length) {
        let message = document.createElement("p");
        let textLose = document.createTextNode("Você venceu!");
        message.appendChild(textLose);

        let buttons = document.querySelectorAll('.buttons')

        for (const button of buttons) {
            button.removeAttribute('onclick')
        }

        let button = document.createElement("button");
        let textPlayAgain = document.createTextNode("jogar novamente");
        
        button.appendChild(textPlayAgain);
        button.setAttribute('class', 'new-bt');
        button.setAttribute('onclick', 'window.location.reload()');

        let div = document.getElementById("new");
        div.appendChild(message);
        div.appendChild(button);
    }
}