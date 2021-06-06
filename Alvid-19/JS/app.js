// import FavoritesView from '../views/FavoritesView.js'
import userAuthenticationView from './views/userAuthenticationView.js'
import profileView from './views/profileView.js'
// import commentsView from '../views/commentsView.js'

class App {
    constructor() {
        // Mapeamento entre os ficheiros HTML e as views que estes vão carregar
        this.routes = {
            '': [
                // FavoritesView
            ],
            'index': [
                // FavoritesView
            ],
            'userAuthentication': [
                userAuthenticationView
            ],
            'profile': [
                profileView
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
                        title: 'title',
                        answers: [
                            'resposta1','resposta2','resposta3','resposta4'
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
                points: '1000000'
            },
            {
                id: 2,
                type: 'admin',
                username: 'JoãoCarmo',
                password: '12345',
                email: 'admin@gmail.com',
                date: '14/07/2001',
                points: '1000000'
            },
            {
                id: 3,
                type: 'admin',
                username: 'Viviana',
                password: '12345',
                email: 'admin@gmail.com',
                date: '27/04/2002',
                points: '1000000'
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