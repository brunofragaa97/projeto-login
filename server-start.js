// Importação dos módulos necessários
const express = require('express'); // Framework para criar o servidor
const bodyParser = require('body-parser'); // Para tratar requisições JSON
const cors = require('cors'); // Permite comunicação entre diferentes origens (CORS)
const jwt = require('jsonwebtoken'); // Para gerar e verificar tokens JWT
const bcrypt = require('bcryptjs'); // Para criptografar e comparar senhas

// Criação do aplicativo Express e definição da porta do servidor
const app = express();
const PORT = 5000;

// Chave secreta usada para criar e verificar tokens JWT
// IMPORTANTE: Em produção, use uma variável de ambiente para armazenar essa chave
const SECRET_KEY = 'seu-segredo-super-seguro';

// Middleware
app.use(cors()); // Habilita o CORS para permitir acesso de outras origens
app.use(bodyParser.json()); // Faz o parser do corpo das requisições em JSON

// Simulação de banco de dados (apenas para exemplo)
// Aqui temos dois usuários fictícios com senhas criptografadas
const users = [
  {
    id: 1,
    username: 'admin', // Nome de usuário
    password: bcrypt.hashSync('123456', 8), // Senha '1234' criptografada
  },
  {
    id: 2,
    username: 'user', // Nome de usuário
    password: bcrypt.hashSync('abcd', 8), // Senha 'abcd' criptografada
  },
];

// Endpoint para login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body; // Pega o nome de usuário e senha enviados pelo cliente

  // Verifica se o usuário existe na "base de dados"

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não Cadastrado' }); // Retorna erro caso não exista
  }

  // Verifica se a senha fornecida corresponde à senha criptografada armazenada
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Senha inválida' }); // Retorna erro caso a senha esteja errada
  }

  // Gera um token JWT com os dados do usuário e validade de 1 hora
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: '1h',
  });

  // Responde com o token e o nome de usuário
  return res.status(200).json({ message: 'Login bem-sucedido', token, user: user.username });
});

// Endpoint protegido (exemplo de rota que exige autenticação)
app.get('/api/protected', (req, res) => {
  const token = req.headers['authorization']; // Obtém o token JWT enviado pelo cliente

  // Verifica se o token foi fornecido
  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' }); // Retorna erro caso o token não seja enviado
  }

  try {
    // Verifica se o token é válido
    const decoded = jwt.verify(token, SECRET_KEY);
    return res.status(200).json({ message: 'Acesso permitido', user: decoded }); // Responde com os dados do usuário
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado' }); // Retorna erro caso o token seja inválido
  }
});

// Inicia o servidor e exibe uma mensagem no console
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
