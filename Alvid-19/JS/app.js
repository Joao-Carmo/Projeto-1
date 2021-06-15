import favoritesView from './views/favoritesView.js'
import userAuthenticationView from './views/userAuthenticationView.js'
import profileView from './views/profileView.js'
import adminView from './views/adminView.js'
import rankingView from './views/rankingView.js'
import quizzesView from './views/quizzesView.js'
import commentView from './views/commentView.js'
import gameMemoryView from './views/gameMemoryView.js'

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
                userAuthenticationView,
                favoritesView
            ],
            'profile': [
                profileView,
                favoritesView
            ],
            'admin': [
                adminView,
                favoritesView
            ],
            'ranking': [
                rankingView,
                favoritesView
            ],
            'quizzes':[
                quizzesView,
                favoritesView
            ],
            'comments': [
                commentView,
                favoritesView
            ],
            'gameMemory': [
                gameMemoryView,
                favoritesView
            ]
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
                name: 'Como ser Herói!',
                image: 'Images/Como ser Herói!.png',
                description: 'No jogo "Como ser Herói!" aparecerá perguntas sobre Covid-19 e como se deve comportar em determinadas situações. Presta bastante atenção em cada pergunta pois poderá ter ratoeiras! A cada resposta acertada, ganharás pontos.',
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
                        photo:'../Images/como_ser_heroi/Pessoa sem máscara.gif',
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
                        photo:'../Images/como_ser_heroi/Onde sentas na escola.gif',
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
                points: 1000000,
                photo: '/avatars/6.png',
                favorites: [],
                games: 0,
                quizzes: 0
            },
            {
                id: 2,
                type: 'admin',
                username: 'João',
                password: '12345',
                email: 'admin@gmail.com',
                date: '14/07/2001',
                points: 1000000,
                photo: '/avatars/5.png',
                favorites: [],
                games: 0,
                quizzes: 0
            },
            {
                id: 3,
                type: 'admin',
                username: 'Viviana',
                password: '12345',
                email: 'admin@gmail.com',
                date: '27/04/2002',
                points: 1000000,
                photo: '/avatars/3.png',
                favorites: [],
                games: 0,
                quizzes: 0
            }
        ];

        const comments = [
            {
                id: '1',
                idUser: '3',
                username: 'Viviana',
                date: '26/5/2021',
                photo: '/avatars/3.png',
                comment: 'Estou a adorar a experiência do Alvid-19.'
            },
            {
                id: '2',
                idUser: '2',
                username: 'JoãoCarmo',
                date: '1/6/2021',
                photo: '/avatars/5.png',
                comment: 'Achei esta aplicação muito original :)'
            }
        ];

        const avatars = [
            {
                id: '1',
                photo: '/avatars/1.png',
                points: '0'
            },
            {
                id: '2',
                photo: '/avatars/2.png',
                points: '150'
            },
            {
                id: '3',
                photo: '/avatars/3.png',
                points: '300'
            },
            {
                id: '4',
                photo: '/avatars/4.png',
                points: '450'
            },
            {
                id: '5',
                photo: '/avatars/5.png',
                points: '600'
            },
            {
                id: '6',
                photo: '/avatars/6.png',
                points: '750'
            },
            {
                id: '7',
                photo: '/avatars/7.png',
                points: '900'
            },
            {
                id: '8',
                photo: '/avatars/8.png',
                points: '1050'
            },
            {
                id: '9',
                photo: '/avatars/9.png',
                points: '1200'
            },
            {
                id: '10',
                photo: '/avatars/10.png',
                points: '1350'
            },
            {
                id: '11',
                photo: '/avatars/11.png',
                points: '1500'
            }
        ];

        const memoryCards = [
            'meninadepé.png',
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

        const memoryCardsPairs = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];

        // Load the fixtures in case there is no data in the local storage
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
        }
        if (!localStorage.quizDetails) {
            localStorage.setItem('quizDetails', JSON.stringify(quizDetails));
        }
        if (!localStorage.comments) {
            localStorage.setItem('comments', JSON.stringify(comments));
        }
        if (!localStorage.avatars) {
            localStorage.setItem('avatars', JSON.stringify(avatars));
        }
        if (!localStorage.memoryCards) {
            localStorage.setItem('memoryCards', JSON.stringify(memoryCards));
        }
        if (!localStorage.memoryCardsPairs) {
            localStorage.setItem('memoryCardsPairs', JSON.stringify(memoryCardsPairs));
        }
    }
}

new App();