export default class gameHangmanController {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.getItem("users")) : [];

        this.words = ["covid", "alvid", "aprender", "jogar", "mascara", "vacina", "alcool", "brincar", "quarentena", "distancia", "aplicativo", "quiz", "sabao", "crianca"];

        this.word = this.words[Math.floor(Math.random() * this.words.length)]; //Escolhe uma palavra aleatória

        this.alphabet = "abcdefghijklmnopqrstuvwxyz";
        this.letters = this.alphabet.split("");

        this.chances = 6;
        this.right = 0;
        this.image = 0;
        this.position;
        this.points = 0;
    }

    getWords() {
        return this.words
    }

    getWord() {
        return this.word
    }

    getLetters() {
        return this.letters
    }

    updateRight() {
        this.right++
    }

    updateImage() {
        this.image++
    }

    getImage() {
        return this.image
    }

    updateChances() {
        this.chances--
    }

    getChances() {
        return this.chances
    }

    getRight() {
        return this.right
    }

    updatePoints() {
        this.points+=35
        alert('Ganhaste '+this.points+' pontos!')

        // Atribui os pontos ganhos ao user e atualiza no localStorage
        const username = sessionStorage.getItem('loggedUser')
        const id = sessionStorage.getItem('loggedUserId')

        let points = +(this.users.find(user => user.username === username).points)
        points += +this.points

        let games = +(this.users.find(user => user.username === username).games)
        games += 1

        this.users[id-1].points = points
        this.users[id-1].games = games
        localStorage.setItem('users', JSON.stringify(this.users))
    }

}