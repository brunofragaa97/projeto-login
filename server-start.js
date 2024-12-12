const express = require('express'); // Framework principal para o servidor
const bodyParser = require('body-parser');// Middleware para processar o corpo das requisições
const cors = require('cors');
const jwt = require('jsonwebtoken');  // Biblioteca para manipular JWT
const bcrypt = require('bcryptjs'); // Biblioteca para hashing de senhas
require('dotenv').config({ path: 'secretjwt.env' }); // Carrega variáveis de ambiente do arquivo .env
const morgan = require('morgan');


//CONFIGURAÇÕES DO SERVIDOR
const PORT = 5000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

// Simulação de banco de dados (apenas para exemplo)
const users = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('123456', 8), // Senha '123456' criptografada
    primeiroNome: 'Admin',
    segundoNome: 'User',
  },
  {
    id: 2,
    username: 'brunofraga',
    password: bcrypt.hashSync('abcdefg', 8),
    primeiroNome: 'Bruno',
    segundoNome: 'Fraga',
  },
];

const token = "ToKenDeDeUs"





// Endpoint de login - Aqui Autentica o usuario
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  // Procura o usuário no "banco de dados"

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  // Compara a senha enviada com a senha armazenada
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Senha inválida' });
  }

  //SE ESTIVER TUDO OK COM O USUARIO/SENHA, GERA O TOKEN PARA O USUARIO
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION
  });
  res.json({
    message: 'Login bem-sucedido',
    token,
  });
});




// Endpoint para validar se o usuário logado é o mesmo que o do dashboard
app.get('/api/validar-usuario', (req, res) => {
  const { username } = req.query; // Recebe o 'username' via query string da URL

  // Verifica se o 'username' foi fornecido na URL
  if (!username) {
    return res.status(400).json({ message: 'Nome de usuário não fornecido2222' });
  }

  // Simula a busca do usuário no banco de dados (você já possui a lista 'users' para isso)
  const user = users.find((u) => u.username === username);

  // Verifica se o usuário foi encontrado
  if (user) {
    userNome = users['primeiroNome']
    return res.json({
      message: 'sim, o usuario foi encontrado corretamente',
      primeiroNome: user.primeiroNome
    }); // Se o usuário for encontrado, responde com "sim"
  } else {
    return res.json({ message: 'não' }); // Se o usuário não for encontrado, responde com "não"
  }
});


// Endpoint para logout
app.post('/api/logout', (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'ID do usuário não fornecido' });
  }

  refreshTokens.delete(userId); // Remove o refresh token do banco
  res.json({ message: 'Logout bem-sucedido' });
});


//INICIA O SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
