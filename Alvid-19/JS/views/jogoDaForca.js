let palavras = ["covid", "alvid", "aprender", "jogar", "mascara", "vacina", "alcool", "brincar", "quarentena", "distancia", "aplicativo", "quiz", "sabao", "crianca"];

let palavra = palavras[Math.floor(Math.random() * palavras.length)];

let chances = 6;
let acertos = 1;

let imagem = 0;


let posicao;


// Cria Span com os espaços das letras da palavra

for (posicao = 0; posicao < palavra.length; posicao++) {
    let span = document.createElement("span");
    span.setAttribute('id', posicao);                     

    let div = document.getElementById("palavra");
    div.appendChild(span);
}

// Cria botões do alfabeto

let alfabeto = "abcdefghijklmnopqrstuvwxyz";
let letras = alfabeto.split("");

for (posicao = 0; posicao < letras.length; posicao++) {
    let botao = document.createElement("button");
    let letra = document.createTextNode(letras[posicao]);
    
    botao.appendChild(letra);
    botao.setAttribute('onclick', 'escolheLetra(\''+letras[posicao]+'\')');
    botao.setAttribute('id', letras[posicao]);

    botao.setAttribute('class', 'buttons')

    let section = document.getElementById("letras");
    section.appendChild(botao);
}

function escolheLetra(letra) {

    let acertou = false;

    for (posicao = 0; posicao < palavra.length; posicao++) {
        if (letra === palavra[posicao]) {       // Se a letra for igual a uma letra da palavra, é add.
            acertos++;
            let span = document.getElementById(posicao);
            let l = document.createTextNode(letra);

            span.appendChild(l);

            let botao = document.getElementById(letra);
            
            botao.setAttribute('id', 'certa');  //Troca id para certa
            
            botao.removeAttribute('onclick'); //Proibe imagem de ser clicada

            
            acertou = true;
        }
    }

    if (acertou === false) {
        imagem++;
        document.getElementById("forca").src = "../Images/jogo_da_forca/forca-"+imagem+".png"; //Troca imagem na forca

        let botao = document.getElementById(letra);
        botao.setAttribute('id', 'errada'); //Troca id para errada.
        botao.removeAttribute('onclick');

        chances--;
    }

    // Fim de jogo

    //Perdeu

    if (chances === 0) {
        let mensagem = document.createElement("p");
        let t1 = document.createTextNode("Você perdeu!"); // Esgotam-se as chances
        mensagem.appendChild(t1);

        let buttons = document.querySelectorAll('.buttons')

        for (const button of buttons) {
            button.removeAttribute('onclick')     // Impede de uma nova tentativa
        }

        

        let botao = document.createElement("button");
        let t2 = document.createTextNode("jogar novamente");
        //acertos=1
        
        botao.appendChild(t2);
        botao.setAttribute('class', 'btn btn-primary');
        botao.setAttribute('onclick', 'window.location.reload()');

        let div = document.getElementById("novo");
        div.appendChild(mensagem);
        div.appendChild(botao);
    }

    // Vencer

    if (acertos === palavra.length) {
        let mensagem = document.createElement("p");
        let t1 = document.createTextNode("Você venceu!");
        mensagem.appendChild(t1);

        let buttons = document.querySelectorAll('.buttons')

        for (const button of buttons) {
            button.removeAttribute('onclick')
        }

        let botao = document.createElement("button");
        let t2 = document.createTextNode("jogar novamente");
        
        botao.appendChild(t2);
        botao.setAttribute('class', 'novo-bt');
        botao.setAttribute('onclick', 'window.location.reload()');

        let div = document.getElementById("novo");
        div.appendChild(mensagem);
        div.appendChild(botao);
    }
}