
# Plano: Melhorias de UX e Padronização do Site

## Visão Geral
Este plano implementa melhorias de experiência do usuário para diferenciar claramente filmes "Em Cartaz" de filmes "Em Breve", além de padronizar o nome do cinema em todo o site.

---

## Mudanças Visuais Principais

### 1. Carrossel Principal (Hero)
**Antes:** Todos os filmes mostram o botão "Comprar Ingresso"
**Depois:** 
- Filmes em cartaz → Botão "Comprar Ingresso" + "Ver Trailer"
- Filmes em breve → Badge "EM BREVE" + apenas "Ver Trailer" (sem opção de compra)

### 2. Cards de Filmes
**Antes:** Badge "Em breve" pequena, posicionada junto à classificação
**Depois:** Badge "EM BREVE" mais visível no canto superior do cartaz, estilo destacado

### 3. Modal de Detalhes
**Já implementado corretamente:** Botão de compra já está oculto para filmes "Em Breve"

### 4. Nome do Cinema
**Antes:** "Cine Teatro Cornélio Procópio"
**Depois:** "Cine Cornélio Procópio" (em 5 locais)

---

## Arquivos a Modificar

| Arquivo | Alterações |
|---------|------------|
| `HeroCarousel.tsx` | Ocultar botão "Comprar Ingresso" para filmes "Em Breve", adicionar badge "EM BREVE" |
| `MovieCard.tsx` | Reposicionar badge "EM BREVE" para canto superior, tornar mais visível |
| `ProgramacaoSection.tsx` | Atualizar texto para "Cine Cornélio Procópio" |
| `MovieDetailModal.tsx` | Atualizar texto para "Cine Cornélio Procópio" |
| `Footer.tsx` | Atualizar textos para "Cine Cornélio Procópio" |

---

## Detalhes Técnicos

### HeroCarousel.tsx
```text
Linha ~140-150: Adicionar condição is_coming_soon
- Envolver o link "Comprar Ingresso" com {!currentMovie.is_coming_soon && ...}
- Adicionar badge "EM BREVE" próxima aos outros badges quando is_coming_soon = true
```

### MovieCard.tsx  
```text
Linha ~50-60: Reposicionar badge
- Mover badge "Em breve" do grupo da classificação etária
- Posicionar no canto superior direito do cartaz
- Aumentar destaque visual (fundo amber, texto maior)
```

### Textos a Substituir
```text
"Cine Teatro Cornélio Procópio" → "Cine Cornélio Procópio"

Locais:
1. ProgramacaoSection.tsx (linha 71)
2. ProgramacaoSection.tsx (linha 151)
3. MovieDetailModal.tsx (linha 213)
4. Footer.tsx (linha 30 - title do iframe)
5. Footer.tsx (linha 178 - copyright)
```

---

## Resultado Esperado

- Usuários identificam imediatamente quais filmes estão disponíveis para compra
- Nenhuma frustração ao tentar comprar ingressos de filmes não lançados
- Identidade visual consistente com o nome correto do cinema
- Experiência profissional tanto no desktop quanto no mobile
