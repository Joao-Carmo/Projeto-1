export default class userModel {
    constructor(id, type, username, password, email, date, points, photo, favorites,games,quizzes) {
        this.id = id
        this.type = type
        this.username = username
        this.password = password
        this.email = email
        this.date = date
        this.points = points
        this.photo = photo
        this.favorites = favorites
        this.games = games
        this.quizzes = quizzes
    }
}