const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || token !== 'Bearer valid_token') {
    return res.status(401).json({ error: 'Usuário não autenticado!' });
  }
  next();
};

let registeredUser = null;

app.get('/registration', (_, res) => {
  if (!registeredUser) {
    return res.status(404).send('<h1>Nenhum usuário cadastrado</h1>');
  }

  const htmlContent = `
    <h1>Usuário Registrado</h1>
    <p><strong>Email:</strong> ${registeredUser.email}</p>
    <p><strong>Telefone:</strong> ${registeredUser.phone}</p>
    <p><strong>Senha:</strong> ${registeredUser.password}</p>
    ${
      registeredUser.cpf
        ? `<p><strong>Nome Social:</strong> ${registeredUser.social_name}</p>
           <p><strong>CPF:</strong> ${registeredUser.cpf}</p>
           <p><strong>Data de Nascimento:</strong> ${registeredUser.birth_date}</p>`
        : `<p><strong>Razão Social:</strong> ${registeredUser.legal_name}</p>
           <p><strong>CNPJ:</strong> ${registeredUser.cnpj}</p>
           <p><strong>Data de Abertura:</strong> ${registeredUser.birth_opened}</p>`
    }
  `;

  res.send(htmlContent);
});

app.post('/registration', isAuthenticated, (req, res) => {
  try {
    const {
      email,
      phone,
      password,
      legal_name,
      social_name,
      cpf,
      cnpj,
      birth_date,
      birth_opened,
    } = req.body;

    const requiredFields = [email, phone, password].filter(Boolean);
    const physicalPersonFields = [social_name, cpf, birth_date].filter(Boolean);
    const legalPersonFields = [legal_name, cnpj, birth_opened].filter(Boolean);

    if (Object.keys(req.body).length !== 6) {
      return res
        .status(400)
        .json({ error: 'Exatamente 6 campos devem ser enviados!' });
    }

    if (requiredFields.length !== 3) {
      return res
        .status(400)
        .json({ error: 'Email, phone e password são obrigatórios!' });
    }

    if (
      (physicalPersonFields.length === 3 && legalPersonFields.length === 0) ||
      (legalPersonFields.length === 3 && physicalPersonFields.length === 0)
    ) {
      registeredUser = req.body;
      return res
        .status(200)
        .json({ message: 'Cadastro realizado com sucesso!' });
    }

    return res.status(400).json({ error: 'Os campos enviados são inválidos!' });
  } catch (error) {
    console.error('Erro no servidor:', error);
    return res.status(500).json({ error: 'Erro interno do servidor!' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
