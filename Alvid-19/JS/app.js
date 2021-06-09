import favoritesView from './views/favoritesView.js'
import userAuthenticationView from './views/userAuthenticationView.js'
import profileView from './views/profileView.js'
import adminView from './views/adminView.js'
// import commentsView from '../views/commentsView.js'

class App {
    constructor() {
        // Mapeamento entre os ficheiros HTML e as views que estes vão carregar
        this.routes = {
            '': [
                favoritesView
            ],
            'index': [
                favoritesView
            ],
            'userAuthentication': [
                userAuthenticationView
            ],
            'profile': [
                profileView
            ],
            'admin': [
                adminView
            ]
            // 'comments': [
            //     commentsView
            // ]
        };

        // importa dados dummy para testes
        this.#importDataFixtures();

        // instancia as views mapeadas no objeto routes
        this.#instantiateViews();
    }

    #instantiateViews() {
        const path = window.location.pathname
        const file = path.substr(path.lastIndexOf('/') + 1);
        const route = file.split('.')[0];

        const views = this.#getViews(route);

        for (const view of views) {
            new view();
        }
    }

    #getViews(route) {
        return typeof this.routes[route] === 'undefined' ? [] : this.routes[route];
    }

    #importDataFixtures() {

        const quizDetails = [
            {
                id: 1,
                name: 'Como ser Herói',
                image: '../Images/Como ser Herói!.png',
                description: 'Neste quiz, serão apresentadas situações similares à vida real. Apartir daí, precisarás fazer algumas escolhas de acordo com estas. Quantas mais respostas certas, mais pontos recebes!',
                questions: [
                    {
                        id: 1,
                        title: 'Há apenas um lugar livre, no autocarro, ao lado de uma senhora. O que fazes?',
                        photo:'../Images/como_ser_heroi/Onde sentas.png',
                        answers: [
                            'Sentas ao lado da senhora.','Ficas em pé.','Pedes para a senhora levantar-se.','Sentas-te no chão.'
                        ],
                        correctAnswer: 2
                    },
                    {
                        id: 2,
                        title: 'Alguém está sem máscara perto de ti. O que fazes?',
                        photo:'../Images/como_ser_heroi/Pessoa sem máscara.png',
                        answers: [
                            'Afasta-te na mesma hora.','Aproximas-te, e pedes para a colocar.','Emprestas a tua para ela.','Ligas a polícia.'
                        ],
                        correctAnswer: 1
                    },
                    {
                        id: 3,
                        title: 'Ao chegar a casa após um longo dia na rua. O que fazes?',
                        photo:'../Images/como_ser_heroi/Ao chegar a casa.png',
                        answers: [
                            'Vais diretamente para a cama.','Cumprimentas teus familiares.','Vais a cozinha comer.','Vais tomar banho.'
                        ],
                        correctAnswer: 4
                    },
                    {
                        id: 4,
                        title: 'Ao entrar na sala de aula, Onde sentas?',
                        photo:'../Images/como_ser_heroi/Onde sentas na escola.png',
                        answers: [
                            '1 - Entre teus dois amigos.','2 - Ao lado de teus colegas.','3 - Um pouco mais afastado de teus colegas.','Nenhuma das anteriores.'
                        ],
                        correctAnswer: 3
                    },
                    {
                        id: 5,
                        title: 'Ao sentir sintomas de Covid-19, O que fazes?',
                        photo:'../Images/como_ser_heroi/sentir sintomas.png',
                        answers: [
                            'Ligas para o Serviço Nacional de Saúde.','Procuras respostas na internet.','Ficas deitado(a) até melhorar.','Vais ao hospital mais próximo.'
                        ],
                        correctAnswer: 1
                    }
                ]
            },
            {
                id: 2,
                name: 'Jogo da Forca',
                image: '../Images/Jogo da f rca.png',
                description: 'O jogo da forca é um jogo em que terás que acertar qual é a palavra proposta. Na tela terás toda a informação que precisas, o número de letras e uma frase que servirá de dica. A cada letra errada, é desenhado uma parte do corpo, se todas as partes do corpo forem desenhadas, perdes! Acerta na palavra e ganha pontos!'
            },
            {
                id: 3,
                name: 'Verdade ou Mentira',
                image: '../Images/Verdade ou mentira.png',
                description: '"Verdade ou Mentira" é um quiz onde vais ter que acertar se uma frase é verdade ou mentira! A frase será disposta no ecrã. A cada resposta certa, receberás pontos!'
            }
        ]

        const users = [
            {
                id: 1,
                type: 'admin',
                username: 'MariaEduarda',
                password: '12345',
                email: 'admin@gmail.com',
                date: '09/02/2000',
                points: '1000000',
                photo: '../Images/avatars/6.png',
                favorites: []
            },
            {
                id: 2,
                type: 'admin',
                username: 'JoãoCarmo',
                password: '12345',
                email: 'admin@gmail.com',
                date: '14/07/2001',
                points: '1000000',
                photo: '../Images/avatars/5.png',
                favorites: []
            },
            {
                id: 3,
                type: 'admin',
                username: 'Viviana',
                password: '12345',
                email: 'admin@gmail.com',
                date: '27/04/2002',
                points: '1000000',
                photo: '../Images/avatars/3.png',
                favorites: []
            }
        ];

        // Load the fixtures in case there is no data in the local storage
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
        }
        if (!localStorage.quizDetails) {
            localStorage.setItem('quizDetails', JSON.stringify(quizDetails));
        }
    }
}

new App();