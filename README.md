# Takere — site (Next.js)

Recriação em Next.js (App Router) do site https://www.takere.com.br e suas subpáginas, em português e inglês.

## Rodando

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

A porta padrão é 3000. Para mudar, copie `.env.example` para `.env` e ajuste `PORT` (vale para `npm run dev` e `npm start`).

## Rotas

| PT | EN | Conteúdo |
| --- | --- | --- |
| `/` | `/en` | Página inicial (produto Takere) |
| `/research` | `/en/research` | Research Lab — linhas de pesquisa |
| `/team` | `/en/team` | Coordenadores, membros e membros anteriores |
| `/publications` | `/en/publications` | Publicações por ano |
| `/gallery` | `/en/gallery` | Galeria de fotos (com lightbox) |
| `/contact` | `/en/contact` | Contatos e mapa |
| `/policy` | `/en/policy` | Política de privacidade |

## Estrutura

- `app/[lang]` — uma única árvore de rotas para os dois idiomas (`pt`, `en`), gerada estaticamente. Cada `page.tsx` contém a página inteira (metadados + JSX), com seu CSS em `page.module.css` na mesma pasta.
- `middleware.ts` — mantém o português sem prefixo: `/team` é reescrito internamente para `/pt/team`, e `/pt/...` redireciona para `/...`.
- `i18n/` — configuração de idiomas e helpers de rota (`config.ts`) e dicionários com todos os textos da interface (`dictionaries/pt.tsx`, `dictionaries/en.tsx`). As páginas não contêm textos fixos: eles vêm de `i18n/` e `data/`. O dicionário `en` é tipado a partir do `pt`, então uma chave faltando é erro de compilação.
- `data/` — conteúdo estruturado: equipe, publicações, galeria, parceiros, linhas de pesquisa, contatos e estatísticas (edite aqui para adicionar membros, fotos, publicações…).
- `components/` — barra superior (com seletor de idioma), cabeçalho do Research Lab, rodapé, parceiros, estatísticas, galeria.
- `public/img/` — imagens originais do site, redimensionadas.

Para adicionar um idioma: inclua-o em `locales` (`i18n/config.ts`), crie `i18n/dictionaries/<lang>.tsx` e adicione a chave nos campos `Localized` de `data/`.

Animações de entrada usam o atributo `data-reveal` (`up`, `left`, `right`), ativado por `components/RevealObserver.tsx`, e respeitam `prefers-reduced-motion`.

### Mobile

O site original usa no celular um layout próprio de 320px de largura, ampliado até a largura da tela. Aqui isso é reproduzido abaixo de 760px com a unidade `--u` (`100vw / 320`, definida em `app/globals.css`): as medidas mobile são escritas como `calc(N * var(--u))`, onde `N` é o valor em px do layout original de 320px.
