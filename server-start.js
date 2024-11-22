const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware para suportar JSON e habilitar CORS
app.use(cors());
app.use(express.json());

// Serve os arquivos estáticos do Vite (build em 'dist')
app.use(express.static(path.join(__dirname,'projeto-login', 'dist')));

// Rota principal para renderizar o index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'projeto-login', 'dist', 'index.html'));
});

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
