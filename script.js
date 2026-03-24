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
const briefingSections = [
  {
    title: "1. DADOS DA EMPRESA",
    fields: [
      ["Empresa", "companyName"],
      ["Nome fantasia", "brandName"],
      ["CNPJ", "cnpj"],
      ["Site", "website"],
      ["Segmento", "segment"],
      ["Porte", "companySize"],
      ["Cidade/Estado", "location"],
      ["Unidades/filiais", "branches"]
    ]
  },
  {
    title: "2. RESPONSAVEL PELO PROJETO",
    fields: [
      ["Nome", "contactName"],
      ["Cargo", "contactRole"],
      ["E-mail", "contactEmail"],
      ["Telefone/WhatsApp", "contactPhone"]
    ]
  },
  {
    title: "3. WHATSAPP / META",
    fields: [
      ["Numero dedicado para o chatbot", "hasDedicatedNumber"],
      ["Setup atual do numero", "whatsappSetup"],
      ["Pode receber SMS/ligacao para verificacao", "canReceiveVerification"],
      ["Meta Business Manager", "hasMetaBusinessManager"],
      ["Meta for Developers", "hasMetaDevelopers"],
      ["Conta WABA", "hasWaba"],
      ["Responsavel por acessos e verificacoes", "metaAccessOwner"]
    ]
  },
  {
    title: "4. ATENDIMENTO ATUAL",
    fields: [
      ["Canais atuais", "channels"],
      ["Volume mensal", "monthlyVolume"],
      ["Tamanho da equipe", "teamSize"],
      ["Horario de atendimento", "serviceHours"],
      ["Horarios de pico", "peakHours"],
      ["Principais demandas", "topDemands"],
      ["Ferramentas atuais", "currentTools"]
    ]
  },
  {
    title: "5. ESCOPO DO CHATBOT E AUTOMACAO",
    fields: [
      ["Objetivos", "goals"],
      ["Uso principal do bot", "botUses"],
      ["Modo de atuacao do bot", "botActionMode"],
      ["Acoes que o bot deve executar", "automationActions"],
      ["Casos de uso esperados", "useCases"],
      ["Idiomas", "languages"],
      ["Tom de voz", "tone"]
    ]
  },
  {
    title: "6. REGRAS DO NEGOCIO",
    fields: [
      ["Informacoes obrigatorias a coletar", "requiredCollectedInfo"],
      ["Fluxo diferente para novo/recorrente", "differentClientFlow"],
      ["Prioridade por tipo de cliente", "clientPriorityRules"],
      ["Bairros/regioes/areas atendidas", "serviceAreas"],
      ["Regras de horario/fila/limite/SLA", "operationConstraints"],
      ["Cenarios de bloqueio ou redirecionamento", "blockedScenarios"]
    ]
  },
  {
    title: "7. HANDOFF PARA HUMANO",
    fields: [
      ["Quando transferir para humano", "handoffRules"],
      ["Para quem transferir", "handoffTarget"],
      ["Como a transferencia deve acontecer", "handoffMethods"],
      ["Horarios com humano disponivel", "humanAvailability"],
      ["Cliente deve ser informado da transferencia", "informTransfer"],
      ["Canal apos handoff", "sameChannelAfterHandoff"]
    ]
  },
  {
    title: "8. BASE DE CONHECIMENTO",
    fields: [
      ["Base de conhecimento disponivel", "knowledgeBase"],
      ["Base atualizada", "knowledgeUpdated"],
      ["Responsavel pelos materiais", "knowledgeOwner"],
      ["Materiais podem treinar o assistente", "canTrainAssistant"],
      ["Respostas padrao aprovadas", "approvedAnswers"],
      ["Restricoes de conteudo sensivel", "sensitiveInfoLimits"]
    ]
  },
  {
    title: "9. DASHBOARD E OPERACAO",
    fields: [
      ["Precisa de dashboard", "dashboardInterest"],
      ["Usuarios do painel", "dashboardUsers"],
      ["Perfis que usarao o painel", "dashboardAudience"],
      ["O que cada perfil precisa ver", "dashboardAudienceNeeds"],
      ["Indicadores desejados", "dashboardMetrics"],
      ["Frequencia de acompanhamento", "reportFrequency"],
      ["Precisa de historico de conversas", "needConversationHistory"],
      ["Precisa de exportacao de dados", "needDataExport"],
      ["Filtros desejados no painel", "dashboardFilters"],
      ["Precisa de alertas/notificacoes", "needAlerts"]
    ]
  },
  {
    title: "10. INTEGRACOES",
    fields: [
      ["Integracoes desejadas", "integrations"],
      ["Existe API disponivel", "hasApi"],
      ["Existe documentacao da API", "hasApiDocs"],
      ["Existe sandbox/teste", "hasSandbox"],
      ["Fonte principal da verdade", "sourceOfTruth"],
      ["Alternativas se nao houver API", "integrationFallbacks"]
    ]
  },
  {
    title: "11. SEGURANCA E LGPD",
    fields: [
      ["Exigencia de LGPD/compliance", "complianceNeed"],
      ["Trata dados pessoais", "handlesPersonalData"],
      ["Trata dados sensiveis", "handlesSensitiveData"],
      ["Politica de retencao de dados", "hasRetentionPolicy"],
      ["Restricoes de armazenamento", "storageRestrictions"],
      ["NDA / DPA", "confidentialityNeed"],
      ["Mensagens com aprovacao juridica/compliance", "legalApprovalMessages"]
    ]
  },
  {
    title: "12. GOVERNANCA E APROVACOES",
    fields: [
      ["Quem aprova escopo", "scopeApprover"],
      ["Quem aprova conteudo/mensagens", "contentApprover"],
      ["Quem aprova acessos tecnicos", "techApprover"],
      ["Quem aprova proposta comercial", "commercialApprover"],
      ["Existe equipe de TI envolvida", "hasItTeam"],
      ["Existe marketing/juridico envolvido", "marketingLegalInvolved"],
      ["Processo de aprovacao interna", "approvalFlow"]
    ]
  },
  {
    title: "13. IMPLANTACAO, PROPOSTA E METAS",
    fields: [
      ["Prazo para entrar em operacao", "goLive"],
      ["Faixa de investimento", "budget"],
      ["Criterios de sucesso", "successCriteria"],
      ["Meta de tempo de resposta", "responseTimeGoal"],
      ["Meta de automacao", "automationGoal"],
      ["Meta de reducao de fila", "queueReductionGoal"],
      ["Meta de conversao", "conversionGoal"],
      ["Meta de satisfacao", "satisfactionGoal"],
      ["Meta de economia operacional", "operationalSavingsGoal"],
      ["Informacoes adicionais", "notes"],
      ["Consentimento", "consent"]
    ]
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
  const lines = ["NOVO BRIEFING COMERCIAL - FASTATENDE", ""];

  briefingSections.forEach((section, index) => {
    lines.push(section.title);

    section.fields.forEach(([label, key]) => {
      lines.push(`${label}: ${toList(payload[key])}`);
    });

    if (index < briefingSections.length - 1) {
      lines.push("");
    }
  });

  lines.push("", "Resumo gerado automaticamente pela landing page FastAtende.");
  return lines.join("\n");
}

function buildCsvRows(payload) {
  const rows = [["Secao", "Campo", "Valor"]];

  briefingSections.forEach((section) => {
    section.fields.forEach(([label, key]) => {
      rows.push([section.title, label, toList(payload[key])]);
    });
  });

  return rows;
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
    `Numero para chatbot: ${toList(payload.hasDedicatedNumber)}`,
    `Setup WhatsApp: ${toList(payload.whatsappSetup)}`,
    `Uso principal do bot: ${toList(payload.botUses)}`,
    `Modo de automacao: ${toList(payload.botActionMode)}`,
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

  const formData = new FormData(form);
  const payload = formDataToObject(formData);

  setSubmittingState(true);

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
  setSubmittingState(false);
});
