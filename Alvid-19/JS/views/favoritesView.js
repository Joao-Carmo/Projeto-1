import userController from '../controllers/userController.js'
import quizzesControler from '../controllers/quizzesController.js';

export default class favoritesView {
    constructor() {
        this.userController = new userController();
        this.quizzesControler = new quizzesControler();

        this.index = document.querySelector('#index')

        this.alvidTalk = document.querySelector('#alvidTalk')
        this.alvidAnimated = document.querySelector('#alvidAnimated')
        this.alvidTalking();

        this.helpButton = document.querySelector('#helpButton')
        this.btnAdminManagement();

        this.btnMenuMobile = document.querySelector('#btnMenuMobile')
        this.btnMenuMobileMinus = document.querySelector('#btnMenuMobileMinus')
        this.divMenuMobile = document.querySelector('#divMenuMobile')
        this.btnLogo = document.querySelector('#btnLogo')
        this.divLoginProfile = document.querySelector('#divLoginProfile')
        this.menuMobile()

        this.hangmanGame = document.querySelector('#hangmanGame')
        this.memoryGame = document.querySelector('#memoryGame')
        this.iconRanking = document.querySelector('#iconRanking')
        this.iconRankingMobile = document.querySelector('#iconRankingMobile')
        this.updatePermissions();

        
        this.thumbnailQuizzes = document.querySelector('#thumbnailQuizzes');
        this.displayQuizzesImages();
        

        this.profileIcon = document.querySelector('#profileIcon');
        this.updateStatusUI();

        this.modalFavorites = document.querySelector('#modalFavorites')
        this.btnFavorites = document.querySelectorAll('#btnFavorites')
        this.btnModalFavoritesClose = document.querySelectorAll('#btnModalFavoritesClose')
        this.btnAddFavorites = document.querySelector('#btnAddFavorites')
        this.modalBodyFavorites = document.querySelector('#modalBodyFavorites')
        this.favoritesModalContent();
        this.favoritesModal();

        this.getID();
    }

    alvidTalking() {
      if (this.isIndex()) {
        this.alvidTalk.addEventListener('click', () => {
          const id = +(this.alvidTalk.children[0].id)
          if (id <= 4) {
            this.alvidAnimated.innerHTML = `
              <img src="Images/alvid_talking.gif" alt="Personagem Alvid-19" id="caracterAlvid">
            `
            this.alvidTalk.innerHTML = `
              <img src="Images/balao${id+1}.png" id="${id+1}" height="50%">
            `
          } else {
            const id = 0
            this.alvidAnimated.innerHTML = `
              <img src="Images/alvid_blinking_gif.gif" alt="Personagem Alvid-19" id="caracterAlvid">
            `
            this.alvidTalk.innerHTML = `
              <img src="Images/balao${id+1}.png" id="${id+1}" height="50%">
            `
          }
        })
      }
    }

    /**
     * Fun????o que verifica se a p??gina atualmente aberta ?? a index.html ou n??o. 
     */
    isIndex() {
      if (this.index.innerHTML == 'index') {
        console.log('index')
        return true
      } else {
        console.log('n??o index')
        return false
      }
    }

    isGameQuiz() {
      if (this.index.innerHTML == 'gamifica????o') {
        return true
      } else {
        return false
      }
    }

    /**
     * Fun????o que abre/fecha o menu mobile. 
     */
    menuMobile() {
        this.btnMenuMobile.addEventListener('click', () => {

          this.divMenuMobile.style.visibility = 'visible' 

          if (this.isIndex()) {
            this.helpButton.style.visibility = 'hidden'

            if (!this.userController.isLogged()) {
              this.divLoginProfile.innerHTML = `
                <a href="HTML/userAuthentication.html" class="col-sm-5 col-6 text-center" id="btnLoginRegister" style="background-color: #ffffff; background-size: contain; border-radius: 10px;">Fazer login/registar</a>
              `
            } else {
              const username = this.userController.loggedUser();
              const users = this.userController.usersArray();
              const photo = users.find(users => users.username === username).photo

              this.divLoginProfile.innerHTML = `
                <a class="col-sm-5 col-6 text-center" href="HTML/profile.html">
                  <img src="Images${photo}" width="100%" alt="??cone Perfil" id="iconPerfil" id="iconPerfil" style="filter: drop-shadow(0px 9px 3px #00000031); border-radius: 50px;">
                </a>
              `
            }
          } else {
            if (!this.userController.isLogged()) {
              this.divLoginProfile.innerHTML = `
                <a href="userAuthentication.html" class="col-sm-5 col-6 text-center" id="btnLoginRegister" style="background-color: #ffffff; background-size: contain; border-radius: 10px;">Fazer login/registar</a>
              `
            } else {
              const username = this.userController.loggedUser();
              const users = this.userController.usersArray();
              const photo = users.find(users => users.username === username).photo

              this.divLoginProfile.innerHTML = `
                <a class="col-sm-5 col-6 text-center" href="profile.html">
                  <img src="../Images${photo}" width="100%" alt="??cone Perfil" id="iconPerfil" id="iconPerfil" style="filter: drop-shadow(0px 9px 3px #00000031); border-radius: 50px;">
                </a>
              `
            }
          }

          this.btnMenuMobile.style.visibility = 'hidden'
          this.btnMenuMobileMinus.style.visibility = 'visible'
          this.btnLogo.style.position = 'fixed'
        })

        this.btnMenuMobileMinus.addEventListener('click', () => {
          this.divMenuMobile.style.visibility = 'hidden' 
          if (this.isIndex()) { this.helpButton.style.visibility = 'visible' }

          this.btnMenuMobile.style.visibility = 'visible'
          this.btnMenuMobileMinus.style.visibility = 'hidden'
          this.btnLogo.style.position = 'absolute'
        })
    }

    /**
     * Fun????o que faz aparecer a imagem de perfil do utilizador no lugar de ??cone de perfil. 
     */
    updateStatusUI() {
        if (this.userController.isLogged()) {
            const username = this.userController.loggedUser();
            const users = this.userController.usersArray();
            const photo = users.find(users => users.username === username).photo

            if (this.isIndex()) {
              this.profileIcon.innerHTML = `
                  <a class="nav-link" href="HTML/profile.html">
                      <img src="Images${photo}" width="84px" alt="??cone Perfil" id="iconPerfil" id="iconPerfil" style="filter: drop-shadow(0px 9px 3px #0a9cb6);border-radius: 50px">
                  </a>`
            } else {
              this.profileIcon.innerHTML = `
                  <a class="nav-link" href="profile.html">
                      <img src="../Images${photo}" width="84px" alt="??cone Perfil" id="iconPerfil" id="iconPerfil" style="filter: drop-shadow(0px 9px 3px #0a9cb6);border-radius: 50px">
                  </a>`
            }

        } else {
          if (this.isIndex()) {
            this.profileIcon.innerHTML = `
              <a class="nav-link" href="HTML/userAuthentication.html">
                  <img src="Images/perfil.png" width="84px" alt="??cone Perfil" id="iconPerfil" id="iconPerfil" style="filter: drop-shadow(0px 9px 3px #0a9cb6);border-radius: 50px">
              </a>            
            `
          } else {
            this.profileIcon.innerHTML = `
              <a class="nav-link" href="userAuthentication.html">
                <img src="../Images/perfil.png" width="84px" alt="??cone Perfil" id="iconPerfil" id="iconPerfil" style="filter: drop-shadow(0px 9px 3px #0a9cb6);border-radius: 50px">
              </a>
            ` 
          }
        }
    }

    /**
     * Fun????o que verifica se, conforme o tipo de utilizador logado(se logado), poder?? ter permiss??o para jogos/quizzes/ranking. 
     */
    updatePermissions() {
      if (this.isIndex()) {
       
        if (!this.userController.isLogged() || this.userController.isBlocked()) {
          this.memoryGame.innerHTML = `
            <a href="HTML/userAuthentication.html">
              <img src="Images/Jogo da Memoria.png" alt="Responsive image" class="img-fluid" id="gameCarousel">
            </a>`

          this.hangmanGame.innerHTML = `
            <a href="HTML/gameHangman.html">
              <img src="Images/Jogo da f rca.png" alt="Responsive image" class="img-fluid" id="gameCarousel">
            </a>`

          this.iconRanking.parentNode.href = 'HTML/userAuthentication.html'
          this.iconRankingMobile.parentNode.href = 'HTML/userAuthentication.html'

        } else {
          this.memoryGame.innerHTML = `
            <a href="HTML/gameMemory.html">
              <img src="Images/Jogo da Memoria.png" alt="Responsive image" class="img-fluid" id="gameCarousel">
            </a>`

          this.hangmanGame.innerHTML = `
            <a href="HTML/gameHangman.html">
              <img src="Images/Jogo da f rca.png" alt="Responsive image" class="img-fluid" id="gameCarousel">
            </a>`

          this.iconRanking.parentNode.href = 'HTML/ranking.html'
          this.iconRankingMobile.parentNode.href = 'HTML/ranking.html'
        }  
      } else {
        if (!this.userController.isLogged() || this.userController.isBlocked()) {
          this.iconRanking.parentNode.href = 'userAuthentication.html'
          this.iconRankingMobile.parentNode.href = 'userAuthentication.html'

        } else {
          this.iconRanking.parentNode.href = 'ranking.html'
          this.iconRankingMobile.parentNode.href = 'ranking.html'
        }  
      }
    }

    displayQuizzesImages() {
      this.quizzesImages(this.quizzesControler.quizzesArray());
      
      const btnThumbnailQuiz = document.querySelectorAll('#btnThumbnailQuiz');
      if (!this.userController.isLogged() || this.userController.isBlocked()) {
        for (const btn of btnThumbnailQuiz) {
          btn.href = `HTML/userAuthentication.html`
        }
      }
    }


    getID() {
      const btnThumbnailQuiz = document.querySelectorAll('#btnThumbnailQuiz');
      for (const btn of btnThumbnailQuiz) {
        btn.addEventListener('click', () => {
          const id = btn.children[0].id
          this.quizzesControler.getId(id);
        })
      }
    }
    


    /**
     * Fun????o que acrescenta, atrav??s do array de quizDetails, os quizzes no index.html. 
     */
    quizzesImages(quizzes) {
      if (this.isIndex()) {
        let html = "";
        for (let pos = 0; pos < quizzes.length; pos++) {
          html += `
            <a class="mt-2 ml-3 col-lg-4 col-6" href="HTML/quizzes.html" id="btnThumbnailQuiz">
              <img src="${quizzes[pos].image}" id="${pos+1}" class="mt-5 col-sm-7 ml-4 mb-5" alt="Responsive image">
            </a>`
          
        }
        this.thumbnailQuizzes.innerHTML = html;
      }
    }
        

    

    /**
     * Fun????o que torna o bot??o de admin vis??vel quando o utilizador ?? administrador. 
     */
    btnAdminManagement() {
      if (this.isIndex()) {
        if (this.userController.isAdmin()) {
          this.helpButton.style.visibility = 'visible'
        }
      }
    }

    /**
     * Fun????o que abre/fecha a modal dos favoritos. 
     */
    favoritesModal() {
      for (const btnFavorite of this.btnFavorites) {
        btnFavorite.addEventListener('click', () => {
          this.modalFavorites.style.display = "block";
          this.favoritesModalPutContent()
        })
      }

      for (const btnModalClose of this.btnModalFavoritesClose) {
        btnModalClose.addEventListener('click', () => {
          this.modalFavorites.style.display = ""
        })
      }
    }

    favoritesModalContent() {
      if (this.isGameQuiz()) {
        this.btnAddFavorites.addEventListener('click', () => {
          this.userController.userFavorites(this.btnAddFavorites.parentNode.parentNode.children[0].id)
        })
      }
    }

    favoritesModalPutContent() {
      const favorites = this.userController.getFavorites()

      let HTML = ''
        for (const favorite of favorites) {
          const quizzes = this.quizzesControler.quizzesArray()

          if (this.isIndex()) {
            HTML = `
              <div class="col">
                  <img src="${quizzes[+favorite-1].image}" width="100%" style="border-radius: 15px">
              </div>
            `
          } else {
            HTML = `
              <div class="col">
                  <img src="../${quizzes[+favorite-1].image}" width="100%" style="border-radius: 15px">
              </div>
            `
          }

        }

        this.modalBodyFavorites.innerHTML = HTML
    }
}

