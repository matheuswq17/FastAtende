# FastAtende

Landing page comercial da FastAtende para apresentação da solução de chatbot com IA no WhatsApp, coleta de briefing e envio do material para o time comercial.

## Links

- Repositório: [github.com/matheuswq17/FastAtende](https://github.com/matheuswq17/FastAtende)
- Produção: [fast-atende.vercel.app](https://fast-atende.vercel.app/)

## Sobre o projeto

O site foi criado para apresentar a FastAtende e coletar informações completas de empresas interessadas na implantação de:

- chatbot de IA no WhatsApp
- automações de atendimento, vendas e suporte
- repasse para atendimento humano
- dashboard opcional para operação e gestão

Ao enviar o formulário, a landing page:

1. gera um resumo estruturado do briefing
2. baixa um arquivo CSV com todas as respostas
3. abre o Gmail já preparado para envio para `fastatende.comercial@gmail.com`

Observação:
O navegador não consegue anexar arquivos automaticamente no Gmail, então o cliente precisa anexar manualmente o CSV baixado antes de enviar.

## Tecnologias

- HTML
- CSS
- JavaScript
- Node.js
- Express
- Vercel

## Estrutura principal

- `index.html`: landing page e formulário comercial
- `styles.css`: estilos da interface
- `script.js`: validações, resumo, geração do CSV e abertura do Gmail
- `server.js`: servidor local em Express
- `run-fastatende.cmd`: atalho para rodar localmente no Windows
- `logo-fastatende.png`: logo principal usada no header
- `icone_fastatende.png`: ícone usado no favicon

## Como rodar localmente

### Opção recomendada no Windows

```powershell
& "C:\fastatende\run-fastatende.cmd"
```

### Opção com Node

```powershell
cd C:\fastatende
node server.js --port 3005
```

O servidor tenta a porta `3005` primeiro. Se ela já estiver ocupada, ele avança automaticamente para a próxima disponível.

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

## Formulário comercial

O formulário foi estruturado para captar informações de:

- empresa e responsável pelo projeto
- WhatsApp / Meta
- atendimento atual
- escopo do chatbot e automação
- regras do negócio
- handoff para humano
- base de conhecimento
- dashboard e operação
- integrações
- segurança e LGPD
- governança e aprovações
- metas e critérios de sucesso

## Deploy

O projeto está publicado no Vercel em:

- [https://fast-atende.vercel.app/](https://fast-atende.vercel.app/)

## Contato comercial

- `fastatende.comercial@gmail.com`
