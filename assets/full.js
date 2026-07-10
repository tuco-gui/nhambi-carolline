window.dataLayer = window.dataLayer || [];

(function(){
  var cfg = window.PAGE_CONFIG || {};
  var data = window.PAGE_DATA || {};
  var corretorNome = cfg.corretorNome || "Equipe Ortega";
  var corretorSlug = cfg.corretorSlug || "equipe-ortega";
  var telefoneDestino = cfg.telefoneDestino || "5511972693413";
  var empreendimentoNome = cfg.empreendimentoNome || "";
  var empreendimentoSlug = cfg.empreendimentoSlug || "";

  var whatsappConfig = {
    construtora: "paesegregori",
    produto: empreendimentoSlug,
    corretor: corretorSlug,
    tipo_pagina: "landing_produto",
    telefone_destino: telefoneDestino,
    content_name: empreendimentoNome,
    content_category: "imovel_lancamento",
    mensagem: "Olá, quero conhecer mais sobre o empreendimento " + empreendimentoNome + " com " + corretorNome + "."
  };

  function gerarProtocolo(){
    return "PROTOCOLO-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).slice(2, 7).toUpperCase();
  }

  function montarUrl(protocolo){
    return "https://wa.me/" + whatsappConfig.telefone_destino + "?text=" + encodeURIComponent(whatsappConfig.mensagem + " Protocolo: " + protocolo);
  }

  document.querySelectorAll('a[href*="wa.me"], a[href*="api.whatsapp.com"], a[href*="web.whatsapp.com"]').forEach(function(link){
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

  // ── Carrossel de apartamentos (Áreas Comuns > aba Apartamentos) ──
  var apts = data.apts || [];
  var aptIndex = 0;
  function renderApt(){
    if(!apts.length) return;
    var img = document.getElementById("aptImg");
    var cap = document.getElementById("aptCaption");
    if(img) img.src = apts[aptIndex].img;
    if(cap) cap.textContent = apts[aptIndex].cap;
  }
  window.prevApt = function(){ aptIndex = (aptIndex - 1 + apts.length) % apts.length; renderApt(); };
  window.nextApt = function(){ aptIndex = (aptIndex + 1) % apts.length; renderApt(); };

  // ── Carrossel de plantas ──
  var plantas = data.plantas || {};
  var plantaOrder = data.plantaOrder || [];
  var plantaIndex = plantaOrder.length ? plantaOrder.length - 1 : 0;
  var plantaTabsInit = document.querySelectorAll("#plantas .tab");
  for(var pi = 0; pi < plantaTabsInit.length; pi++){
    if(plantaTabsInit[pi].classList.contains("active")){ plantaIndex = pi; break; }
  }
  function renderPlanta(){
    if(!plantaOrder.length) return;
    var key = plantaOrder[plantaIndex];
    var img = document.getElementById("plantaImg");
    var cap = document.getElementById("plantaCaption");
    if(img) img.src = plantas[key].img;
    if(cap) cap.textContent = plantas[key].cap;
    document.querySelectorAll("#plantas .tab").forEach(function(t){ t.classList.remove("active"); });
    var tabs = document.querySelectorAll("#plantas .tab");
    if(tabs[plantaIndex]) tabs[plantaIndex].classList.add("active");
  }
  window.prevPlanta = function(){ plantaIndex = (plantaIndex - 1 + plantaOrder.length) % plantaOrder.length; renderPlanta(); };
  window.nextPlanta = function(){ plantaIndex = (plantaIndex + 1) % plantaOrder.length; renderPlanta(); };
  window.showPlanta = function(key){ plantaIndex = plantaOrder.indexOf(key); renderPlanta(); };

  // ── Toggle Áreas Comuns / Apartamentos ──
  window.showGallery = function(id, el){
    document.querySelectorAll("#areas .tab").forEach(function(t){ t.classList.remove("active"); });
    if(el) el.classList.add("active");
    var aptPanel = document.getElementById("apartamentos");
    var areasPanel = document.getElementById("areasComuns");
    if(aptPanel) aptPanel.style.display = id === "apartamentos" ? "block" : "none";
    if(areasPanel) areasPanel.style.display = id === "areasComuns" ? "block" : "none";
  };

  renderApt();
  renderPlanta();
})();
