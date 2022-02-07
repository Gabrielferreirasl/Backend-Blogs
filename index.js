const express = require('express');
const bodyParser = require('body-parser');

const usersControllers = require('./controllers/usersControllers');
const categoriesControllers = require('./controllers/categoriesControllers');
const blogPostsControllers = require('./controllers/blogPostsControllers');

const userValidation = require('./middlewares/userValidation');
const loginValidation = require('./middlewares/loginValidation');
const tokenValidation = require('./middlewares/tokenValidation');
const postValidation = require('./middlewares/postValidation');
const editPostValidation = require('./middlewares/editPostValidation');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/user', userValidation, usersControllers.createUser);
app.post('/login', loginValidation, usersControllers.login);

app.use(tokenValidation);

app.get('/user', usersControllers.getAllUsers);
app.post('/categories', categoriesControllers.createCategory);
app.get('/categories', categoriesControllers.getAllCategories);
app.post('/post', postValidation, blogPostsControllers.createPost);
app.get('/post', blogPostsControllers.getAllPosts);
app.get('/post/search', blogPostsControllers.search);

app.put('/post/:id', editPostValidation, blogPostsControllers.editPost);
app.delete('/post/:id', blogPostsControllers.deletePost);
app.delete('/user/me', usersControllers.deleteUser);
app.get('/post/:id', blogPostsControllers.getPost);
app.get('/user/:id', usersControllers.getUser);
