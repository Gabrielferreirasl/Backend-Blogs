const express = require('express');
const bodyParser = require('body-parser');

const usersControllers = require('./controllers/usersControllers');
const categoriesControllers = require('./controllers/categoriesControllers');

const userValidation = require('./middlewares/userValidation');
const loginValidation = require('./middlewares/loginValidation');
const tokenValidation = require('./middlewares/tokenValidation');

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
app.get('/user/:id', usersControllers.getUser);

app.post('/categories', categoriesControllers.createCategory);
