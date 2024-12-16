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
  const authHeader = req.headers.authorization;


  // Verifica se o 'username' foi fornecido na URL
  if (!username && !authHeader) {
    return res.status(400).json({ message: 'Nome de usuário ou token não fornecido, redirecionando!' }); // Retorna erro 400 se não for fornecido
  }
  const token = authHeader.split(' ')[1];
  console.log(token)

  if (!token) {
    return res.status(401).json({ message: 'Token invalido ou ausente' })
  }


  // Simula a busca do usuário no banco de dados (você já possui a lista 'users' para isso)
  const user = users.find((u) => u.username === username); // Encontra o usuário pelo username

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (user && decoded.username === username) {
      return res.json({
        message: 'USUARIO LOGADO',
        primeiroNome: user.primeiroNome,
      });
    } else {
      return res.status(403).json({ message: "usuario invalido ou token nao autenticado"})
    }

  }catch (err) {
    // Trata erros na validação do token
    return res.status(403).json({ message: 'Token inválido ou expirado' });
  }

  // Verifica se o usuário foi encontrado
  if (user) {
    // Se o usuário for encontrado, responde com sucesso
    return res.json({
      message: 'USUARIO LOGADO',
      primeiroNome: user.primeiroNome // Retorna o nome do usuário
    });
  } else {
    // Se o usuário não for encontrado, responde com mensagem de erro
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
});




//INICIA O SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
