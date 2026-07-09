window.dataLayer = window.dataLayer || [];

var EMPREENDIMENTOS = [
  { slug: "312jam-moema", nome: "312 JAM", status: "Lançamento", img: "https://paesegregori.com.br/wp-content/uploads/2026/03/312-Jam-Destaque-home.webp" },
  { slug: "nhambi-moema", nome: "Nhambí Moema", status: "Pronto", img: "https://paesegregori.com.br/wp-content/uploads/2024/09/nhambi1.webp", localPage: "/nhambi-moema/" },
  { slug: "nato-itaim", nome: "Nato Itaim", status: "Pronto", img: "https://paesegregori.com.br/wp-content/uploads/2024/09/nato.jpg" },
  { slug: "ad330", nome: "AD330", status: "Pronto", img: "https://paesegregori.com.br/wp-content/uploads/2024/07/AD330-fachada.webp" },
  { slug: "ecos", nome: "Ecos Vila Madalena", status: "Pronto", img: "https://paesegregori.com.br/wp-content/uploads/2024/09/ECOS-fachada.webp" },
  { slug: "guaramomis", nome: "Guaramomis", status: "Em breve", img: "https://paesegregori.com.br/wp-content/uploads/2024/12/guaramoris-destacada.png", hasCorretorLP: true },
  { slug: "harmonia", nome: "Harmonia da Vila", status: "Pronto", img: "https://paesegregori.com.br/wp-content/uploads/2024/09/HARMONIA-fachada.webp" },
  { slug: "jardim-atenas", nome: "Jardim Atenas", status: "Pronto", img: "https://paesegregori.com.br/wp-content/uploads/2024/09/JD-ATENAS-fachada-portaria.webp" },
  { slug: "join", nome: "Join Vila Madalena", status: "Obra em andamento", img: "https://paesegregori.com.br/wp-content/uploads/2024/12/JOIN-fachada.webp" },
  { slug: "l-klabin", nome: "L Klabin", status: "Pronto", img: "https://paesegregori.com.br/wp-content/uploads/2024/07/L-KLABIN-fachada.webp" },
  { slug: "lina-jardins", nome: "Lina Jardins", status: "Pronto", img: "https://paesegregori.com.br/wp-content/uploads/2024/07/LINA-fachada.webp" },
  { slug: "ori", nome: "Ori Praça da Árvore", status: "Obra em andamento", img: "https://paesegregori.com.br/wp-content/uploads/2024/09/ori1.jpg" },
  { slug: "solaz", nome: "Solaz Vila Mariana", status: "Pronto", img: "https://paesegregori.com.br/wp-content/uploads/2024/09/SOLAZ-fachada.webp" },
  { slug: "tons-klabin", nome: "Tons Klabin", status: "Obra em andamento", img: "https://paesegregori.com.br/wp-content/uploads/2024/09/TONS-fachada.webp" }
];

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

  // ── Grid do portfólio (14 empreendimentos) ──
  var grid = document.getElementById("portfolio-grid");
  if(grid){
    grid.innerHTML = EMPREENDIMENTOS.map(function(emp){
      var msg = encodeURIComponent("Olá, quero conhecer mais sobre o empreendimento " + emp.nome + (isHubGeral ? "." : (" com " + corretorNome + ".")));
      var corretorLP = (emp.hasCorretorLP && !isHubGeral) ? ("/corretores/" + corretorSlug + "/" + emp.slug + "/") : null;
      var detalhesHref = emp.localPage || corretorLP || ("https://paesegregori.com.br/" + emp.slug + "/");
      var detalhesTarget = (emp.localPage || corretorLP) ? "" : ' target="_blank" rel="noopener noreferrer"';
      return (
        '<article class="card portfolio-card">' +
          '<div class="card-media"><img src="' + emp.img + '" alt="' + emp.nome + '" loading="lazy"></div>' +
          '<div class="card-body">' +
            '<div class="card-topline"><span>' + emp.status + '</span></div>' +
            '<h4 class="card-title">' + emp.nome + '</h4>' +
            '<div class="portfolio-card-actions">' +
              '<a class="btn btn-outline" href="' + detalhesHref + '"' + detalhesTarget + '>Ver detalhes</a>' +
              '<a class="btn btn-wa" href="https://wa.me/' + telefoneDestino + '?text=' + msg + '" ' +
                'data-produto-override="' + emp.slug + '" ' +
                'data-content-name-override="' + emp.nome + '" ' +
                'data-mensagem-override="Olá, quero conhecer mais sobre o empreendimento ' + emp.nome + (isHubGeral ? "" : (" com " + corretorNome)) + '.">Falar sobre este</a>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join("");
    attachWhatsappTracking(grid);
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
