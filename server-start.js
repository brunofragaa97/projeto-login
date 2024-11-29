const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'seu-segredo-super-seguro';
const REFRESH_SECRET_KEY = 'seu-refresh-token-seguro'; // Chave secreta para refresh token
const TOKEN_EXPIRATION = '10m'; // Expiração do token principal
const REFRESH_TOKEN_EXPIRATION = '1h'; // Expiração do refresh token

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


app.use(cors());
app.use(bodyParser.json());


// Endpoint de login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Senha inválida' });
  }
  
  res.json({
    message: 'Login bem-sucedido',
    token,
  });
});



// Endpoint para obter informações do usuário com o token
app.get('/api/user-info', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = users.find((u) => u.id === decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({
      primeiroNome: user.primeiroNome,
      segundoNome: user.segundoNome,
      username: user.username,
    });
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
});
// Endpoint para validar se o usuário logado é o mesmo que o do dashboard
app.get('/api/validar-usuario', (req, res) => {
  const { username } = req.query; // Recebe o 'username' via query string da URL
  console.log('username recebido:', username);

  // Verifica se o 'username' foi fornecido na URL
  if (!username) {
    return res.status(400).json({ message: 'Nome de usuário não fornecido2222' });
  }

  // Simula a busca do usuário no banco de dados (você já possui a lista 'users' para isso)
  const user = users.find((u) => u.username === username);

  // Verifica se o usuário foi encontrado
  if (user) {
    return res.json({ message: 'sim, o usuario foi encontrado corretamente' }); // Se o usuário for encontrado, responde com "sim"
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

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
