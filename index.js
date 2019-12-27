const express = require('express')
//var cors = require('cors')
//init bodyParser
const bodyParser = require('body-parser')
require('express-group-routes')

const app = express()
const port = process.env.PORT || 4000

//allow this app to receive incoming json request
app.use(bodyParser.json())

//enable CORS 
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//import controller
const { authenticated } = require('./middleware')
const AuthController = require('./controllers/auth')
const CategoryController = require('./controllers/categories')
const ArticleController = require('./controllers/articles')
const CommentController = require('./controllers/comment')
const FollowController = require('./controllers/follow')
const UsersController = require('./controllers/users')



app.group("/api/v1", (router) => {

    //auth API
    router.post('/login', AuthController.login)

    // CATEGORY ROUTER
    router.get('/categories', CategoryController.index) //get all
    router.get('/category/:name', CategoryController.show) // get by name

    router.post('/category', authenticated, CategoryController.store) // add category
    router.patch('/category/:id', authenticated, CategoryController.update) //update category
    router.delete('/category/:id', authenticated, CategoryController.delete) //delete category

    //ARTICLE ROUTER
    router.get('/articles', ArticleController.index) //get all
    router.get('/articles/:populer', ArticleController.showLatest) //get latest article limit 10
    router.get('/category/:id/articles', ArticleController.showByCategoryId) //get by category
    router.get('/article/:id', ArticleController.showByArticleId) //get by id article
    router.post('/article', authenticated, ArticleController.store) //add article
    router.patch('/article/:id', authenticated, ArticleController.update) //update article
    router.delete('/article/:id', authenticated, ArticleController.delete) //delete article

    //ROUTER COMMENT
    router.post('/article/:id/comment', authenticated, CommentController.add) //add comment pada detail artikel
    router.put('/article/:id/comment', authenticated, CommentController.update) //update comment pada detail artikel
    router.delete('/article/:id/comment', authenticated, CommentController.delete) //delete comment pada detail artikel
    router.get('/article/:id/comments', authenticated, CommentController.show) //show all comment pada detail artikel

    //ROUTER FOLLOW
    router.post('/follow', authenticated, FollowController.add) //add follow

    //ROUTER ARTICLE BY USER
    router.get('/user/:id/articles', authenticated, UsersController.showArticleByUser)
    router.delete('/user/:id/articles', authenticated, UsersController.delete)


})
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(port, () => console.log(`Listening on port ${port}!`))