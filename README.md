GUI DE IMPLEMENTAÇÃO: FILTRO MULTISSELEÇÃO (TAGS)
=================================================

Este guia explica como transformar um <select> simples em um componente de 
multisseleção com busca e tags, como implementado no filtro de "Suporte".

--------------------------------------------------------------------------------
PASSO 1: CSS (Estilização)
--------------------------------------------------------------------------------
Adicione estas classes ao seu bloco <style>. Elas definem a aparência da caixa
de input, das etiquetas (tags) e da lista suspensa de resultados.

<style>
  /* Container principal que parece um input */
  .multi-select-container { 
    background: white; 
    border-radius: 4px; 
    display: flex; 
    flex-wrap: wrap; 
    align-items: center; 
    gap: 2px; 
    cursor: text; 
    min-height: 32px; /* Ajuste conforme altura dos seus inputs */
    padding: 2px 4px; 
    border: 1px solid #ced4da; 
  }

  /* A etiqueta visual do item selecionado */
  .tag { 
    background-color: var(--primary); /* Ou uma cor fixa ex: #007bff */
    color: white; 
    padding: 0px 4px; 
    border-radius: 3px; 
    font-size: 0.65rem; 
    display: inline-flex; 
    align-items: center; 
    margin: 1px; 
  }

  /* O 'X' para remover a tag */
  .remove-tag { 
    margin-left: 4px; 
    cursor: pointer; 
    font-weight: bold; 
    font-size: 0.8rem; 
    line-height: 1; 
  }

  /* A lista suspensa de opções */
  .results-container { 
    display: none; /* Oculto por padrão */
    position: absolute; 
    top: 100%; 
    left: 0; 
    width: 100%; 
    max-height: 200px; 
    overflow-y: auto; 
    background: white; 
    border: 1px solid #ccc; 
    z-index: 2000; 
    box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
    border-radius: 4px; 
    margin-top: 2px; 
  }

  /* Item individual da lista */
  .result-item { 
    padding: 4px 8px; 
    cursor: pointer; 
    font-size: 0.75rem; 
    color: #333; 
  }
  .result-item:hover { background-color: #e2e8f0; }
</style>

--------------------------------------------------------------------------------
PASSO 2: HTML (Estrutura)
--------------------------------------------------------------------------------
No lugar onde estava o <select>, coloque esta estrutura. Note o `position: relative`
no pai para que a lista de resultados fique ancorada corretamente.

<div class="filter-item" style="position: relative;">
  <label>Nome do Filtro</label>
  
  <!-- Container visual -->
  <div id="multi-select-ID" class="multi-select-container">
    <!-- Onde as tags selecionadas aparecerão -->
    <div id="tags-ID" style="display: contents;"></div>
    
    <!-- O input invisível para digitar -->
    <input type="text" id="input-search-ID" placeholder="Todos" 
           style="border: none; outline: none; background: transparent; flex-grow: 1; font-size: 0.75rem; color: #333; min-width: 50px;">
  </div>

  <!-- Lista de resultados (dropdown) -->
  <div id="results-ID" class="results-container"></div>
</div>

--------------------------------------------------------------------------------
PASSO 3: JAVASCRIPT (Lógica)
--------------------------------------------------------------------------------

1. Variáveis Globais:
   Crie variáveis para controlar o estado.
   let itemsDisponiveis = []; // Lista completa de opções (strings)
   let itemsSelecionados = new Set(); // Set evita duplicatas automaticamente
   let isMultiSelectInitialized = false;

2. Inicialização (Chame isso ao carregar os dados):
   itemsDisponiveis = [...new Set(DADOS.map(d => d.Campo))]; // Extrai valores únicos
   initMultiSelect();

3. Funções Principais:

   function initMultiSelect() {
     if(isMultiSelectInitialized) return;
     isMultiSelectInitialized = true;

     const container = document.getElementById('multi-select-ID');
     const input = document.getElementById('input-search-ID');
     const results = document.getElementById('results-ID');
     // ... Adicione listeners de click no container para focar no input
     // ... Adicione listener de input para filtrar results (renderResults)
     // ... Adicione listener de click em 'result-item' para adicionar ao Set e chamar renderTags()
     // ... Adicione listener de click em 'remove-tag' para deletar do Set
   }

   function renderResults() {
     // Filtra 'itemsDisponiveis' baseado no texto do input
     // Exclui itens que já estão em 'itemsSelecionados'
     // Gera o HTML dos .result-item e joga na div de results
   }

   function renderTags() {
     // Limpa a div de tags
     // Itera sobre 'itemsSelecionados' criando o HTML das .tag
     // Atualiza placeholder do input (Se vazio = "Todos", senão = "")
   }

--------------------------------------------------------------------------------
PASSO 4: INTEGRAÇÃO COM FILTRO DE DADOS
--------------------------------------------------------------------------------
Na sua função principal de filtro (ex: filtrarLocal), altere a lógica de
comparação simples (===) para verificação de conjunto (.has).

Antes (Select simples):
  const filtroValor = document.getElementById('meu-select').value;
  dados.filter(d => filtroValor === "" || d.Campo === filtroValor);

Depois (Multisseleção):
  // Não precisa ler do DOM, use a variável global do Set
  dados.filter(d => {
    // Se o Set estiver vazio, considera como "Todos" (retorna true)
    if (itemsSelecionados.size === 0) return true;
    
    // Senão, verifica se o item da linha está dentro do Set
    return itemsSelecionados.has(d.Campo);
  });
