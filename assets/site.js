window.dataLayer = window.dataLayer || [];

var EMPREENDIMENTOS = [
  { slug: "312jam-moema", nome: "312 JAM", status: "Lançamento", img: "https://paesegregori.com.br/wp-content/uploads/2026/03/312-Jam-Destaque-home.webp", hasCorretorLP: true, bairro: "Moema", specs: ["2 e 3 dorms., 55m² a 173m², 1 ou 2 vagas", "Studios HMP, 26m² a 40m²"] },
  { slug: "nhambi-moema", nome: "Nhambí Moema", status: "Pronto", img: "https://paesegregori.com.br/wp-content/uploads/2024/09/nhambi1.webp", hasCorretorLP: true, localPage: "/nhambi-moema/", bairro: "Moema", specs: ["3 suítes, 111m² a 121m²", "2 vagas determinadas"] },
  { slug: "nato-itaim", nome: "Nato Itaim", status: "Pronto", img: "https://paesegregori.com.br/wp-content/uploads/2024/09/nato.jpg", hasCorretorLP: true, bairro: "Itaim Bibi", specs: ["1 a 3 suítes, 40m² a 120m²", "Vaga livre e determinada"] },
  { slug: "ad330", nome: "AD330", status: "Pronto", img: "https://paesegregori.com.br/wp-content/uploads/2024/07/AD330-fachada.webp", hasCorretorLP: true, bairro: "Alto da Boa Vista", specs: ["1 e 2 dorms. (com suíte)", "17m² a 48m²"] },
  { slug: "ecos", nome: "Ecos Vila Madalena", status: "Pronto", img: "https://paesegregori.com.br/wp-content/uploads/2024/09/ECOS-fachada.webp", hasCorretorLP: true, bairro: "Vila Madalena", specs: ["Studios, 24m² e 31m²", "3 a 4 suítes, 127m² a 381m²"] },
  { slug: "guaramomis", nome: "Guaramomis", status: "Em breve", img: "https://paesegregori.com.br/wp-content/uploads/2024/12/guaramoris-destacada.png", hasCorretorLP: true, bairro: "Moema", specs: ["Studios, 1 e 2 dormitórios", "20m² a 80m²"] },
  { slug: "harmonia", nome: "Harmonia da Vila", status: "Pronto", img: "https://paesegregori.com.br/wp-content/uploads/2024/09/HARMONIA-fachada.webp", hasCorretorLP: true, bairro: "Vila Madalena", specs: ["4 dorms. ou 3 suítes, 195m²", "Studios, 23m² a 44m²"] },
  { slug: "jardim-atenas", nome: "Jardim Atenas", status: "Pronto", img: "https://paesegregori.com.br/wp-content/uploads/2024/09/JD-ATENAS-fachada-portaria.webp", hasCorretorLP: true, bairro: "Jundiaí, SP", specs: ["Lotes prontos para construir", "700m² a 1.800m²"] },
  { slug: "join", nome: "Join Vila Mariana", status: "Obra em andamento", img: "https://paesegregori.com.br/wp-content/uploads/2024/12/JOIN-fachada.webp", hasCorretorLP: true, bairro: "Vila Mariana", specs: ["2 e 3 dorms. com suíte, 37m² a 69m²", "Contém unidades HIS e HMP"] },
  { slug: "l-klabin", nome: "L Klabin", status: "Pronto", img: "https://paesegregori.com.br/wp-content/uploads/2024/07/L-KLABIN-fachada.webp", hasCorretorLP: true, bairro: "Chácara Klabin", specs: ["3 suítes e cobertura duplex", "154m² a 324m²"] },
  { slug: "lina-jardins", nome: "Lina Jardins", status: "Pronto", img: "https://paesegregori.com.br/wp-content/uploads/2024/07/LINA-fachada.webp", hasCorretorLP: true, bairro: "Jardins", specs: ["2 ou 3 suítes e cobertura triplex", "145m² a 371m², 2 a 4 vagas"] },
  { slug: "ori", nome: "Ori Praça da Árvore", status: "Obra em andamento", img: "https://paesegregori.com.br/wp-content/uploads/2024/09/ori1.jpg", hasCorretorLP: true, bairro: "Praça da Árvore", specs: ["1 a 2 dorms. (com suíte), 33m² a 49m²", "Contém unidades HIS e HMP"] },
  { slug: "solaz", nome: "Solaz Vila Mariana", status: "Pronto", img: "https://paesegregori.com.br/wp-content/uploads/2024/09/SOLAZ-fachada.webp", hasCorretorLP: true, bairro: "Vila Mariana", specs: ["2 suítes ou 3 dorms., 87m² e 90m²", "Studios, 19m² a 34m²"] },
  { slug: "tons-klabin", nome: "Tons Klabin", status: "Obra em andamento", img: "https://paesegregori.com.br/wp-content/uploads/2024/09/TONS-fachada.webp", hasCorretorLP: true, bairro: "Chácara Klabin", specs: ["1 a 3 dorms. (1 a 2 suítes)", "30m² a 137m², com ou sem vaga"] }
];

var DESTAQUES_SLUGS = ["312jam-moema", "nato-itaim", "nhambi-moema"];

var STATUS_SLUGS = {
  "Lançamento": "lancamento",
  "Pronto": "pronto",
  "Em breve": "em-breve",
  "Obra em andamento": "obra-em-andamento"
};

var CORRETORES = [
  { slug: "carolline", nome: "Carolline", telefone: "5511919890615" },
  { slug: "chocolate", nome: "Chocolate", telefone: "5511987769810" },
  { slug: "danilo", nome: "Danilo", telefone: "5511954361467" },
  { slug: "felipe", nome: "Felipe", telefone: "5511955579117" },
  { slug: "hadassah", nome: "Hadassah", telefone: "5511962269456" },
  { slug: "sandra", nome: "Sandra", telefone: "5511947547108" },
  { slug: "hideo", nome: "Hideo", telefone: "5511963157829" }
];

function initials(nome){
  return (nome || "").trim().split(/\s+/).map(function(p){ return p[0]; }).join("").slice(0, 2).toUpperCase();
}

(function(){
  var cfg = window.PAGE_CONFIG || {};
  var isHubGeral = !!cfg.isHubGeral;
  var corretorNome = cfg.corretorNome || "Equipe Ortega";
  var corretorSlug = cfg.corretorSlug || "equipe-ortega";
  var telefoneDestino = cfg.telefoneDestino || "5511972693413";

  var whatsappConfig = {
    construtora: "paesegregori",
    produto: "geral",
    corretor: corretorSlug,
    tipo_pagina: isHubGeral ? "home_construtora" : "home_corretor",
    telefone_destino: telefoneDestino,
    content_name: isHubGeral ? "Paes e Gregori | Equipe Ortega" : ("Paes e Gregori | " + corretorNome),
    content_category: "imovel_lancamento",
    mensagem: isHubGeral
      ? "Olá, quero conhecer mais sobre os empreendimentos Paes e Gregori com a Equipe Ortega."
      : ("Olá, quero conhecer mais sobre os empreendimentos Paes e Gregori com " + corretorNome + ".")
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
        var produto = link.getAttribute("data-produto-override") || whatsappConfig.produto;
        var contentName = link.getAttribute("data-content-name-override") || whatsappConfig.content_name;
        var mensagemOverride = link.getAttribute("data-mensagem-override") || null;
        var clickUrl = montarUrl(protocolo, mensagemOverride);
        window.dataLayer.push({
          event: "whatsapp_click",
          construtora: whatsappConfig.construtora,
          produto: produto,
          corretor: whatsappConfig.corretor,
          tipo_pagina: whatsappConfig.tipo_pagina,
          telefone_destino: whatsappConfig.telefone_destino,
          protocolo: protocolo,
          content_name: contentName,
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

  window.attachWhatsappTracking = attachWhatsappTracking;
  window._whatsappConfig = whatsappConfig;
  attachWhatsappTracking(document);

  // ── Header brand (foto/avatar + nome) ──
  document.querySelectorAll("[data-brand-avatar]").forEach(function(el){
    el.textContent = isHubGeral ? "" : initials(corretorNome);
  });
  document.querySelectorAll("[data-brand-line1]").forEach(function(el){
    el.textContent = isHubGeral ? "Equipe Ortega" : corretorNome;
  });

  // ── Dropdown "Fale com o corretor" ──
  document.querySelectorAll(".nav-dropdown").forEach(function(dropdown){
    var toggle = dropdown.querySelector(".nav-dropdown-toggle");
    var menu = dropdown.querySelector(".nav-dropdown-menu");
    if(!menu) return;
    menu.innerHTML = CORRETORES.map(function(c){
      return '<a href="/corretores/' + c.slug + '/home/">' + c.nome + '</a>';
    }).join("");
    if(toggle){
      toggle.addEventListener("click", function(event){
        event.stopPropagation();
        dropdown.classList.toggle("is-open");
      });
      document.addEventListener("click", function(){
        dropdown.classList.remove("is-open");
      });
    }
  });

  // ── Helper: link de uma empreendimento para o contexto de corretor atual ──
  var lpCorretorAtual = corretorSlug === "equipe-ortega" ? "carolline" : corretorSlug;
  function empHref(emp){
    var corretorLP = emp.hasCorretorLP ? ("/corretores/" + lpCorretorAtual + "/" + emp.slug + "/") : null;
    return corretorLP || emp.localPage || "#";
  }
  var empreendimentosListHref = isHubGeral ? "/empreendimentos/" : ("/corretores/" + corretorSlug + "/empreendimentos/");

  // ── 3 destaques (home) ──
  var highlights = document.getElementById("highlights-grid");
  if(highlights){
    highlights.innerHTML = DESTAQUES_SLUGS.map(function(slug){
      var emp = EMPREENDIMENTOS.filter(function(e){ return e.slug === slug; })[0];
      if(!emp) return "";
      var specsHtml = (emp.specs || []).map(function(s){ return '<span class="highlight-spec">' + s + '</span>'; }).join("");
      return (
        '<a class="highlight-card" href="' + empHref(emp) + '">' +
          '<div class="highlight-media">' +
            '<img src="' + emp.img + '" alt="' + emp.nome + '" loading="lazy">' +
            '<span class="highlight-badge">' + emp.status + '</span>' +
          '</div>' +
          '<div class="highlight-body">' +
            '<h3 class="highlight-title">' + emp.nome + '</h3>' +
            '<div class="highlight-specs">' +
              '<span class="highlight-spec highlight-spec-location">📍 ' + (emp.bairro || "") + '</span>' +
              specsHtml +
            '</div>' +
          '</div>' +
        '</a>'
      );
    }).join("");
  }

  // ── Botão "Conhecer nossos empreendimentos" (home) ──
  document.querySelectorAll("[data-empreendimentos-link]").forEach(function(link){
    link.setAttribute("href", empreendimentosListHref);
  });

  // ── Grid completo de empreendimentos (página /empreendimentos/) ──
  var empGrid = document.getElementById("emp-grid");
  if(empGrid){
    empGrid.innerHTML = EMPREENDIMENTOS.map(function(emp){
      var specsHtml = (emp.specs || []).map(function(s){ return '<span class="emp-spec">' + s + '</span>'; }).join("");
      var statusSlug = STATUS_SLUGS[emp.status] || "outro";
      return (
        '<article class="emp-card" data-status="' + statusSlug + '">' +
          '<a class="emp-card-link" href="' + empHref(emp) + '">' +
            '<div class="emp-card-media">' +
              '<img src="' + emp.img + '" alt="' + emp.nome + '" loading="lazy">' +
              '<span class="emp-badge">' + emp.status + '</span>' +
            '</div>' +
            '<div class="emp-card-body">' +
              '<h3 class="emp-card-title">' + emp.nome + '</h3>' +
              '<div class="emp-card-specs">' +
                '<span class="emp-spec emp-spec-location">📍 ' + (emp.bairro || "") + '</span>' +
                specsHtml +
              '</div>' +
              '<span class="emp-saiba-mais">Saiba mais →</span>' +
            '</div>' +
          '</a>' +
        '</article>'
      );
    }).join("");

    var filterButtons = document.querySelectorAll("[data-emp-filter]");
    filterButtons.forEach(function(btn){
      btn.addEventListener("click", function(){
        var value = btn.getAttribute("data-emp-filter");
        filterButtons.forEach(function(b){ b.classList.toggle("is-active", b === btn); });
        empGrid.querySelectorAll(".emp-card").forEach(function(card){
          card.style.display = (value === "todos" || card.getAttribute("data-status") === value) ? "" : "none";
        });
      });
    });
  }

  // ── Formulário do CTA (nome + telefone + motivo + prazo, igual ao da Carolline) ──
  var ctaSelect = document.getElementById("ctaEmpreendimento");
  if(ctaSelect){
    EMPREENDIMENTOS.forEach(function(emp){
      var opt = document.createElement("option");
      opt.value = emp.nome;
      opt.textContent = emp.nome;
      ctaSelect.appendChild(opt);
    });
  }

  var ctaForm = document.getElementById("ctaForm");
  if(ctaForm){
    ctaForm.addEventListener("submit", function(event){
      event.preventDefault();

      var empreendimento = ctaSelect ? ctaSelect.value : "Geral / ainda não sei";
      var nome = (document.getElementById("ctaNome") || {}).value || "";
      var telefone = (document.getElementById("ctaTelefone") || {}).value || "";
      var purpose = (document.getElementById("ctaPurpose") || {}).value || "";
      var timeline = (document.getElementById("ctaTimeline") || {}).value || "";

      if(!nome.trim() || !telefone.trim() || !purpose || !timeline){
        ctaForm.reportValidity();
        return;
      }

      var protocolo = gerarProtocolo();
      window._leadProtocolo = protocolo;

      var mensagemPartes = ["Meu nome é " + nome.trim() + "."];
      mensagemPartes.push(empreendimento === "Geral / ainda não sei"
        ? "Quero conhecer mais sobre os empreendimentos Paes e Gregori."
        : ("Quero conhecer mais sobre o empreendimento " + empreendimento + "."));
      mensagemPartes.push("Objetivo: " + purpose + ".");
      mensagemPartes.push("Prazo: " + timeline + ".");
      var mensagem = mensagemPartes.join(" ");

      window.dataLayer.push({
        event: "lead_form_submit",
        construtora: whatsappConfig.construtora,
        produto: empreendimento,
        corretor: whatsappConfig.corretor,
        tipo_pagina: whatsappConfig.tipo_pagina,
        content_name: empreendimento === "Geral / ainda não sei" ? whatsappConfig.content_name : empreendimento,
        content_category: whatsappConfig.content_category,
        protocolo: protocolo,
        form_id: "ctaForm",
        form_location: "cta_band",
        lead_source: "site",
        lead_purpose: purpose,
        purchase_timeline: timeline,
        telefone_lead: telefone.trim(),
        page_path: window.location.pathname,
        page_location: window.location.href
      });

      // já disparamos o lead_form_submit acima com todos os dados do formulário;
      // aqui só abrimos o WhatsApp direto, sem passar pelo attachWhatsappTracking
      // (senão duplicaria o evento com um whatsapp_click extra pra mesma conversão).
      window.open(montarUrl(protocolo, mensagem), "_blank", "noopener,noreferrer");
    });
  }
})();

// ── Hero carousel ──
(function(){
  var slides = Array.from(document.querySelectorAll(".hero-slide"));
  var dots = Array.from(document.querySelectorAll(".hero-dot"));
  var header = document.querySelector(".site-header");
  var menuToggle = document.querySelector(".menu-toggle");
  var currentSlide = 0;
  var carouselTimer = null;

  if(!slides.length) return;

  function showSlide(index){
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach(function(slide, slideIndex){
      slide.classList.toggle("is-active", slideIndex === currentSlide);
    });
    dots.forEach(function(dot, dotIndex){
      dot.classList.toggle("is-active", dotIndex === currentSlide);
    });
  }

  function startCarousel(){
    stopCarousel();
    carouselTimer = window.setInterval(function(){
      showSlide(currentSlide + 1);
    }, 5200);
  }

  function stopCarousel(){
    if(carouselTimer) window.clearInterval(carouselTimer);
  }

  dots.forEach(function(dot, index){
    dot.addEventListener("click", function(){
      showSlide(index);
      startCarousel();
    });
  });

  if(menuToggle){
    menuToggle.addEventListener("click", function(){
      var open = header.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll(".header-inner a").forEach(function(link){
    link.addEventListener("click", function(){
      header.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  showSlide(0);
  startCarousel();
})();
