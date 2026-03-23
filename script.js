const form = document.getElementById("lead-form");
const result = document.getElementById("submission-result");
const summaryOutput = document.getElementById("summary-output");
const gmailLink = document.getElementById("gmail-link");
const copyButton = document.getElementById("copy-button");
const downloadButton = document.getElementById("download-button");
const submitButton = document.getElementById("submit-button");
const resultStatus = document.getElementById("result-status");

let latestPayload = null;
let latestCsv = "";
let latestFileName = "";
let latestGmailUrl = "";

document.getElementById("current-year").textContent = new Date().getFullYear();

const recipientEmail = "fastatende.comercial@gmail.com";
const groupRules = [
  {
    name: "channels",
    message: "Selecione pelo menos um canal usado hoje."
  },
  {
    name: "goals",
    message: "Selecione pelo menos um objetivo do projeto."
  }
];

function getCheckedValues(name) {
  return [...form.querySelectorAll(`[name="${name}"]:checked`)].map((input) => input.value);
}

function setGroupError(name, message) {
  const target = form.querySelector(`[data-error-for="${name}"]`);
  if (target) {
    target.textContent = message;
  }
}

function validateGroups() {
  let isValid = true;

  groupRules.forEach((rule) => {
    const values = getCheckedValues(rule.name);
    if (values.length === 0) {
      setGroupError(rule.name, rule.message);
      isValid = false;
      return;
    }

    setGroupError(rule.name, "");
  });

  return isValid;
}

function formDataToObject(formData) {
  const payload = {};

  for (const [key, value] of formData.entries()) {
    if (payload[key]) {
      payload[key] = Array.isArray(payload[key]) ? [...payload[key], value] : [payload[key], value];
    } else {
      payload[key] = value;
    }
  }

  return payload;
}

function toList(value) {
  if (!value) {
    return "Nao informado";
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  return value;
}

function buildSummary(payload) {
  const lines = [
    "NOVO BRIEFING COMERCIAL - FASTATENDE",
    "",
    "1. DADOS DA EMPRESA",
    `Empresa: ${toList(payload.companyName)}`,
    `Nome fantasia: ${toList(payload.brandName)}`,
    `CNPJ: ${toList(payload.cnpj)}`,
    `Site: ${toList(payload.website)}`,
    `Segmento: ${toList(payload.segment)}`,
    `Porte: ${toList(payload.companySize)}`,
    `Cidade/Estado: ${toList(payload.location)}`,
    `Unidades/filiais: ${toList(payload.branches)}`,
    "",
    "2. RESPONSAVEL PELO PROJETO",
    `Nome: ${toList(payload.contactName)}`,
    `Cargo: ${toList(payload.contactRole)}`,
    `E-mail: ${toList(payload.contactEmail)}`,
    `Telefone/WhatsApp: ${toList(payload.contactPhone)}`,
    "",
    "3. ATENDIMENTO ATUAL",
    `Canais atuais: ${toList(payload.channels)}`,
    `Volume mensal: ${toList(payload.monthlyVolume)}`,
    `Tamanho da equipe: ${toList(payload.teamSize)}`,
    `Horario de atendimento: ${toList(payload.serviceHours)}`,
    `Horarios de pico: ${toList(payload.peakHours)}`,
    `Principais demandas: ${toList(payload.topDemands)}`,
    `Ferramentas atuais: ${toList(payload.currentTools)}`,
    "",
    "4. ESCOPO DO CHATBOT",
    `Objetivos: ${toList(payload.goals)}`,
    `Casos de uso esperados: ${toList(payload.useCases)}`,
    `Base de conhecimento: ${toList(payload.knowledgeBase)}`,
    `Regras de transferencia para humano: ${toList(payload.handoffRules)}`,
    `Integracoes desejadas: ${toList(payload.integrations)}`,
    `Idiomas: ${toList(payload.languages)}`,
    `Tom de voz: ${toList(payload.tone)}`,
    "",
    "5. DASHBOARD E GESTAO",
    `Precisa de dashboard: ${toList(payload.dashboardInterest)}`,
    `Usuarios do painel: ${toList(payload.dashboardUsers)}`,
    `Indicadores desejados: ${toList(payload.dashboardMetrics)}`,
    `Frequencia de acompanhamento: ${toList(payload.reportFrequency)}`,
    `LGPD/compliance: ${toList(payload.complianceNeed)}`,
    "",
    "6. IMPLANTACAO E PROPOSTA",
    `Prazo para entrar em operacao: ${toList(payload.goLive)}`,
    `Faixa de investimento: ${toList(payload.budget)}`,
    `Processo de aprovacao: ${toList(payload.approvalFlow)}`,
    `Criterios de sucesso: ${toList(payload.successCriteria)}`,
    `Informacoes adicionais: ${toList(payload.notes)}`,
    `Consentimento: ${toList(payload.consent)}`,
    "",
    "Resumo gerado automaticamente pela landing page FastAtende."
  ];

  return lines.join("\n");
}

function buildCsvRows(payload) {
  return [
    ["Campo", "Valor"],
    ["Empresa", toList(payload.companyName)],
    ["Nome fantasia", toList(payload.brandName)],
    ["CNPJ", toList(payload.cnpj)],
    ["Site", toList(payload.website)],
    ["Segmento", toList(payload.segment)],
    ["Porte da empresa", toList(payload.companySize)],
    ["Cidade / Estado", toList(payload.location)],
    ["Unidades / filiais", toList(payload.branches)],
    ["Nome do responsavel", toList(payload.contactName)],
    ["Cargo", toList(payload.contactRole)],
    ["E-mail", toList(payload.contactEmail)],
    ["WhatsApp / telefone", toList(payload.contactPhone)],
    ["Canais usados hoje", toList(payload.channels)],
    ["Volume mensal", toList(payload.monthlyVolume)],
    ["Tamanho da equipe", toList(payload.teamSize)],
    ["Horario de atendimento", toList(payload.serviceHours)],
    ["Horarios de pico", toList(payload.peakHours)],
    ["Principais demandas", toList(payload.topDemands)],
    ["Ferramentas atuais", toList(payload.currentTools)],
    ["Objetivos", toList(payload.goals)],
    ["Casos de uso esperados", toList(payload.useCases)],
    ["Base de conhecimento", toList(payload.knowledgeBase)],
    ["Regras de transferencia para humano", toList(payload.handoffRules)],
    ["Integracoes desejadas", toList(payload.integrations)],
    ["Idiomas", toList(payload.languages)],
    ["Tom de voz", toList(payload.tone)],
    ["Precisa de dashboard", toList(payload.dashboardInterest)],
    ["Usuarios do painel", toList(payload.dashboardUsers)],
    ["Indicadores desejados", toList(payload.dashboardMetrics)],
    ["Frequencia de acompanhamento", toList(payload.reportFrequency)],
    ["LGPD / compliance", toList(payload.complianceNeed)],
    ["Prazo para entrar em operacao", toList(payload.goLive)],
    ["Faixa de investimento", toList(payload.budget)],
    ["Processo de aprovacao", toList(payload.approvalFlow)],
    ["Criterios de sucesso", toList(payload.successCriteria)],
    ["Informacoes adicionais", toList(payload.notes)],
    ["Consentimento", toList(payload.consent)]
  ];
}

function csvEscape(value) {
  return `"${String(value || "").replace(/"/g, "\"\"").replace(/\r?\n/g, " ")}"`;
}

function buildCsv(payload) {
  const rows = buildCsvRows(payload);
  return rows.map((row) => row.map(csvEscape).join(";")).join("\n");
}

function buildFileName(payload) {
  const safeName = (payload.companyName || "briefing-fastatende")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `${safeName || "briefing-fastatende"}.csv`;
}

function downloadCsv(csvContent, fileName) {
  const blob = new Blob([`\uFEFF${csvContent}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function buildGmailUrl(payload, fileName) {
  const subject = `Novo briefing FastAtende - ${payload.companyName || "Lead"}`;
  const bodyLines = [
    "Ola, equipe FastAtende.",
    "",
    "Acabei de preencher o formulario no site.",
    `Arquivo para anexar: ${fileName}`,
    "",
    "Resumo rapido:",
    `Empresa: ${toList(payload.companyName)}`,
    `Contato: ${toList(payload.contactName)}`,
    `E-mail: ${toList(payload.contactEmail)}`,
    `Telefone: ${toList(payload.contactPhone)}`,
    `Objetivos: ${toList(payload.goals)}`,
    `Prazo: ${toList(payload.goLive)}`,
    "",
    "Importante: anexe o arquivo CSV baixado antes de enviar este e-mail.",
    "",
    "Obrigado."
  ];

  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: recipientEmail,
    su: subject,
    body: bodyLines.join("\n")
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}

function setSubmittingState(isSubmitting) {
  submitButton.disabled = isSubmitting;
  submitButton.textContent = isSubmitting ? "Preparando envio..." : "Baixar tabela e abrir Gmail";
}

function openGmail(url) {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  return Boolean(newWindow);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  resultStatus.textContent = "";

  if (!form.reportValidity()) {
    return;
  }

  if (!validateGroups()) {
    return;
  }

  setSubmittingState(true);

  const formData = new FormData(form);
  const payload = formDataToObject(formData);
  const summary = buildSummary(payload);
  const csvContent = buildCsv(payload);
  const fileName = buildFileName(payload);
  const gmailUrl = buildGmailUrl(payload, fileName);
  const gmailOpened = openGmail(gmailUrl);

  latestPayload = payload;
  latestCsv = csvContent;
  latestFileName = fileName;
  latestGmailUrl = gmailUrl;

  downloadCsv(csvContent, fileName);
  summaryOutput.value = summary;
  gmailLink.href = gmailUrl;
  result.hidden = false;

  resultStatus.textContent = gmailOpened
    ? `Tabela baixada como "${fileName}". Agora anexe esse arquivo no Gmail e envie para ${recipientEmail}.`
    : `Tabela baixada como "${fileName}". Se o Gmail nao abriu automaticamente, clique em "Abrir Gmail novamente".`;

  result.scrollIntoView({ behavior: "smooth", block: "start" });
  setSubmittingState(false);
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(summaryOutput.value);
    resultStatus.textContent = "Resumo copiado com sucesso.";
  } catch (error) {
    resultStatus.textContent = "Nao foi possivel copiar automaticamente. Copie o texto manualmente.";
  }
});

downloadButton.addEventListener("click", () => {
  if (!latestCsv || !latestFileName) {
    resultStatus.textContent = "Preencha e envie o formulario antes de baixar a tabela.";
    return;
  }

  downloadCsv(latestCsv, latestFileName);
  resultStatus.textContent = `Tabela baixada novamente como "${latestFileName}".`;
});

gmailLink.addEventListener("click", (event) => {
  if (!latestGmailUrl) {
    event.preventDefault();
    resultStatus.textContent = "Preencha e envie o formulario antes de abrir o Gmail.";
  }
});

form.addEventListener("reset", () => {
  latestPayload = null;
  latestCsv = "";
  latestFileName = "";
  latestGmailUrl = "";
  result.hidden = true;
  resultStatus.textContent = "";
  gmailLink.href = "#";
  groupRules.forEach((rule) => setGroupError(rule.name, ""));
  setSubmittingState(false);
});

groupRules.forEach((rule) => {
  form.querySelectorAll(`[name="${rule.name}"]`).forEach((input) => {
    input.addEventListener("change", () => setGroupError(rule.name, ""));
  });
});
