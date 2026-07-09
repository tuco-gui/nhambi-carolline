window.dataLayer = window.dataLayer || [];

(function(){
  var cfg = window.PAGE_CONFIG || {};
  var corretorNome = cfg.corretorNome || "Equipe Ortega";
  var corretorSlug = cfg.corretorSlug || "equipe-ortega";
  var telefoneDestino = cfg.telefoneDestino || "5511972693413";
  var empreendimentoNome = cfg.empreendimentoNome || "";
  var empreendimentoSlug = cfg.empreendimentoSlug || "";

  var whatsappConfig = {
    construtora: "paesegregori",
    produto: empreendimentoSlug,
    corretor: corretorSlug,
    tipo_pagina: "lp_empreendimento",
    telefone_destino: telefoneDestino,
    content_name: empreendimentoNome,
    content_category: "imovel_lancamento",
    mensagem: "Olá, quero conhecer mais sobre o empreendimento " + empreendimentoNome + " com " + corretorNome + "."
  };

  function gerarProtocolo(){
    return "PROTOCOLO-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).slice(2, 7).toUpperCase();
  }

  function montarUrl(protocolo, mensagemOverride){
    return "https://wa.me/" + whatsappConfig.telefone_destino + "?text=" + encodeURIComponent((mensagemOverride || whatsappConfig.mensagem) + " Protocolo: " + protocolo);
  }

  function attachWhatsappTracking(root){
    (root || document).querySelectorAll('a[href*="wa.me"], a[href*="api.whatsapp.com"], a[href*="web.whatsapp.com"]').forEach(function(link){
      if(link.dataset.waTrackingBound) return;
      link.dataset.waTrackingBound = "true";
      link.setAttribute("data-whatsapp-link", "true");
      Object.keys(whatsappConfig).forEach(function(key){
        if(key !== "mensagem") link.setAttribute("data-" + key.replace(/_/g, "-"), whatsappConfig[key]);
      });
      link.addEventListener("click", function(event){
        var protocolo = gerarProtocolo();
        var clickUrl = montarUrl(protocolo);
        window.dataLayer.push({
          event: "whatsapp_click",
          construtora: whatsappConfig.construtora,
          produto: whatsappConfig.produto,
          corretor: whatsappConfig.corretor,
          tipo_pagina: whatsappConfig.tipo_pagina,
          telefone_destino: whatsappConfig.telefone_destino,
          protocolo: protocolo,
          content_name: whatsappConfig.content_name,
          content_category: whatsappConfig.content_category,
          page_path: window.location.pathname,
          page_location: window.location.href,
          click_url: clickUrl,
          click_text: (link.textContent || link.getAttribute("aria-label") || "WhatsApp").trim()
        });
        event.preventDefault();
        window.open(clickUrl, "_blank", "noopener,noreferrer");
      });
    });
  }

  attachWhatsappTracking(document);

  document.querySelectorAll("[data-brand-avatar]").forEach(function(el){ el.textContent = initialsOf(corretorNome); });
  document.querySelectorAll("[data-brand-line1]").forEach(function(el){ el.textContent = corretorNome; });

  function initialsOf(nome){
    return (nome || "").trim().split(/\s+/).map(function(p){ return p[0]; }).join("").slice(0, 2).toUpperCase();
  }

  // ── Formulário de lead (nome + telefone + motivo + prazo) ──
  var leadForm = document.getElementById("lpLeadForm");
  var leadStatus = document.getElementById("lpLeadStatus");
  if(leadForm){
    leadForm.addEventListener("submit", function(event){
      event.preventDefault();

      var nome = (document.getElementById("lpNome") || {}).value || "";
      var telefone = (document.getElementById("lpTelefone") || {}).value || "";
      var purpose = (document.getElementById("lpPurpose") || {}).value || "";
      var timeline = (document.getElementById("lpTimeline") || {}).value || "";

      if(!nome.trim() || !telefone.trim() || !purpose || !timeline){
        leadForm.reportValidity();
        return;
      }

      var protocolo = gerarProtocolo();
      window._leadProtocolo = protocolo;

      window.dataLayer.push({
        event: "lead_form_submit",
        construtora: whatsappConfig.construtora,
        produto: empreendimentoSlug,
        corretor: whatsappConfig.corretor,
        tipo_pagina: whatsappConfig.tipo_pagina,
        content_name: empreendimentoNome,
        content_category: whatsappConfig.content_category,
        protocolo: protocolo,
        form_id: "lpLeadForm",
        form_location: "lp_form_section",
        lead_source: "site",
        lead_purpose: purpose,
        purchase_timeline: timeline,
        telefone_lead: telefone.trim(),
        page_path: window.location.pathname,
        page_location: window.location.href
      });

      if(leadStatus){
        leadStatus.textContent = "Dados registrados. Abrindo o WhatsApp...";
        leadStatus.classList.remove("is-error");
      }

      var mensagem = "Meu nome é " + nome.trim() + ". Quero conhecer mais sobre o empreendimento " +
        empreendimentoNome + " com " + corretorNome + ". Objetivo: " + purpose + ". Prazo: " + timeline + ".";

      window.open(montarUrl(protocolo, mensagem), "_blank", "noopener,noreferrer");
    });
  }

  window._whatsappConfig = whatsappConfig;
  window.attachWhatsappTracking = attachWhatsappTracking;
})();
