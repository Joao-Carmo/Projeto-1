import userController from '../controllers/userController.js'

export default class favoritesView {
    constructor() {
        this.userController = new userController();

        this.profileIcon = document.querySelector('#profileIcon');
        this.updateStatusUI();

        this.thumbnailQuizzes= document.querySelector('#thumbnailQuizzes')
        this.thumbnailQuizzes()
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

    thumbnailQuizzes(){
        this.thumbnailQuizzes.innerHTML= `
        <div class="mt-5 row">
        <div class="col-lg-4 col-6">
          <div class="hero" >
            <a href="../Alvid-19/HTML/quizzes.html">
              <img src="Images/Como ser Herói!.png" id="quizCarrossel" class="mt-5 col-sm-7 ml-4 mb-5" alt="Responsive image">
            </a>
          </div>
        </div>
      </div>`
    }
}