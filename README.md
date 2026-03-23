# FastAtende

Landing page comercial da FastAtende para apresentaÃ§Ã£o da soluÃ§Ã£o de chatbot com IA no WhatsApp, coleta de briefing e envio do material para o time comercial.

## Links

- RepositÃ³rio: [github.com/matheuswq17/FastAtende](https://github.com/matheuswq17/FastAtende)
- ProduÃ§Ã£o: [fast-atende.vercel.app](https://fast-atende.vercel.app/)

## Sobre o projeto

O site foi criado para apresentar a FastAtende e coletar informaÃ§Ãµes completas de empresas interessadas na implantaÃ§Ã£o de:

- chatbot de IA no WhatsApp
- automaÃ§Ãµes de atendimento, vendas e suporte
- repasse para atendimento humano
- dashboard opcional para operaÃ§Ã£o e gestÃ£o

Ao enviar o formulÃ¡rio, a landing page:

1. gera um resumo estruturado do briefing
2. baixa um arquivo CSV com todas as respostas
3. abre o Gmail jÃ¡ preparado para envio para `fastatende.comercial@gmail.com`

ObservaÃ§Ã£o:
O navegador nÃ£o consegue anexar arquivos automaticamente no Gmail, entÃ£o o cliente precisa anexar manualmente o CSV baixado antes de enviar.

## Tecnologias

- HTML
- CSS
- JavaScript
- Node.js
- Express
- Vercel

## Estrutura principal

- `index.html`: landing page e formulÃ¡rio comercial
- `styles.css`: estilos da interface
- `script.js`: validaÃ§Ãµes, resumo, geraÃ§Ã£o do CSV e abertura do Gmail
- `server.js`: servidor local em Express
- `run-fastatende.cmd`: atalho para rodar localmente no Windows
- `logo-fastatende.png`: logo principal usada no header
- `icone_fastatende.png`: Ã­cone usado no favicon

## Como rodar localmente

### OpÃ§Ã£o recomendada no Windows

```powershell
& "C:\fastatende\run-fastatende.cmd"
```

### OpÃ§Ã£o com Node

```powershell
cd C:\fastatende
node server.js --port 3005
```

O servidor tenta a porta `3005` primeiro. Se ela jÃ¡ estiver ocupada, ele avanÃ§a automaticamente para a prÃ³xima disponÃ­vel.

Depois, abra no navegador a URL mostrada no terminal, por exemplo:

```text
FastAtende rodando em http://localhost:3005
```

## Scripts

```powershell
npm start
npm run landing
npm run site
```

Se o PowerShell bloquear `npm.ps1`, use o arquivo `run-fastatende.cmd` ou rode `npm.cmd`.

## FormulÃ¡rio comercial

O formulÃ¡rio foi estruturado para captar informaÃ§Ãµes de:

- empresa e responsÃ¡vel pelo projeto
- WhatsApp / Meta
- atendimento atual
- escopo do chatbot e automaÃ§Ã£o
- regras do negÃ³cio
- handoff para humano
- base de conhecimento
- dashboard e operaÃ§Ã£o
- integraÃ§Ãµes
- seguranÃ§a e LGPD
- governanÃ§a e aprovaÃ§Ãµes
- metas e critÃ©rios de sucesso

## Deploy

O projeto estÃ¡ publicado no Vercel em:

- [https://fast-atende.vercel.app/](https://fast-atende.vercel.app/)

## Contato comercial

- `fastatende.comercial@gmail.com`
