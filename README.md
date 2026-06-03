# nhambi-carolline

Projeto estático em HTML para publicação via GitHub Pages.

## Estrutura de publicação

- `index.html`: home da operação `paesegregori.casaortegaimoveis.com.br`
- `nhambi-moema/index.html`: rota intermediária do empreendimento
- `nhambi-moema/carolline/index.html`: landing da Carolline
- `CNAME`: domínio customizado do GitHub Pages

## GitHub Pages

Publicar pela branch `main`, pasta `/ (root)`.

Domínio customizado configurado neste repositório:

`paesegregori.casaortegaimoveis.com.br`

Como o projeto é estático e não usa Vite, React, Next ou outro bundler, não existe configuração de `base path` para ajustar. As rotas internas usam caminhos relativos, então o site está preparado para funcionar diretamente na raiz do domínio customizado.
