const express = require('express');
const bodyParser = require('body-parser');

const blogControllers = require('./controllers/blogControllers');

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

app.post('/user', userValidation, blogControllers.createUser);
app.post('/login', loginValidation, blogControllers.login);

app.use(tokenValidation);

app.get('/user', blogControllers.getAllUsers);
app.get('/user/:id', blogControllers.getUser);
