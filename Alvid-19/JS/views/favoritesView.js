import userController from '../controllers/userController.js'

export default class favoritesView {
    constructor() {
        this.userController = new userController();

        this.helpButton = document.querySelector('#helpButton')
        this.btnAdminManagement();

        this.hangmanGame = document.querySelector('#hangmanGame')
        this.memoryGame = document.querySelector('#memoryGame')
        this.iconRanking = document.querySelector('#iconRanking')
        this.updatePermissions();

        this.thumbnailQuizzes = document.querySelector('#thumbnailQuizzes')
        this.quizzesImages();

        this.profileIcon = document.querySelector('#profileIcon');
        this.updateStatusUI();


        this.modalFavorites = document.querySelector('#modalFavorites')
        this.btnFavorites = document.querySelector('#btnFavorites')
        this.btnModalFavoritesClose = document.querySelector('#btnModalFavoritesClose')
        this.favoritesModal();
        

    }

    updateStatusUI() {
        if (this.userController.isLogged()) {
            const username = this.userController.loggedUser();
            const users = this.userController.usersArray();
            const photo = users.find(users => users.username === username).photo
            this.profileIcon.innerHTML = `
                <a class="nav-link" href="HTML/profile.html">
                    <img src="Images${photo}" width="84px" alt="Ícone Perfil" id="iconPerfil" id="iconPerfil" style="filter: drop-shadow(0px 9px 3px #0a9cb6);border-radius: 50px">
                </a>`
        }
        else {
            this.profileIcon.innerHTML = `
                <a class="nav-link" href="HTML/userAuthentication.html">
                    <img src="Images/perfil.png" width="84px" alt="Ícone Perfil" id="iconPerfil" id="iconPerfil" style="filter: drop-shadow(0px 9px 3px #0a9cb6);border-radius: 50px">
                </a>` 
        }
    }

    /**
     * Função que verifica se, conforme o tipo de utilizador logado(se logado), poderá ter permissão para jogos/quizzes/ranking. 
     */
    updatePermissions() {
      if (!this.userController.isLogged() || this.userController.isBlocked()) {
        this.memoryGame.innerHTML = `
          <a href="HTML/userAuthentication.html">
            <img src="Images/Jogo da Memoria.png" alt="Responsive image" class="img-fluid" id="gameCarousel">
          </a>`

        this.hangmanGame.innerHTML = `
          <a href="HTML/userAuthentication.html">
            <img src="Images/Jogo da f rca.png" alt="Responsive image" class="img-fluid" id="gameCarousel">
          </a>`

        this.iconRanking.parentNode.href = 'HTML/userAuthentication.html'

      } else {
        this.memoryGame.innerHTML = `
          <a href="HTML/jogoDaMemoria.html">
            <img src="Images/Jogo da Memoria.png" alt="Responsive image" class="img-fluid" id="gameCarousel">
          </a>`

        this.hangmanGame.innerHTML = `
          <a href="HTML/jogoDaForca.html">
            <img src="Images/Jogo da f rca.png" alt="Responsive image" class="img-fluid" id="gameCarousel">
          </a>`

        this.iconRanking.parentNode.href = 'HTML/ranking.html'
      }
    }

    quizzesImages() {
      this.thumbnailQuizzes.innerHTML += `
        <a class="mt-2 col-lg-4 col-6" href="HTML/quizzes.html">
          <img src="Images" id="quizCarrossel" class="mt-5 col-sm-7 ml-4 mb-5" alt="Responsive image">
        </a>`
    }

    btnAdminManagement() {
      if (this.userController.isAdmin()) {
        this.helpButton.innerHTML = `
          <a href="HTML/admin.html">
            <img src="Images/admButton.png" id="imgHelpButton" class="button-image " alt="Responsive image">
          </a>`
      }
    }

    favoritesModal() {
      this.btnFavorites.addEventListener('click', () => {
        // btnFavorites.focus()
        this.modalFavorites.style.display = "block";
      })

      this.btnModalFavoritesClose.addEventListener('click', () => {
        this.modalFavorites.style.display = ""
      })
    }
}

