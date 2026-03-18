# multi-seleção-tag
select com mult seleção organizado por tag
🏷️ Componente Multi-Seleção com Tags (Vanilla JS)Este componente transforma um <select> HTML simples em uma interface de multisseleção dinâmica com busca em tempo real, suporte a etiquetas (tags) e filtragem de conjuntos de dados.🚀 FuncionalidadesBusca em Tempo Real: Filtra as opções conforme o usuário digita.Interface de Tags: Visualização clara dos itens selecionados com opção de remoção individual.Gestão de Estado com Set: Utiliza a estrutura Set do JavaScript para garantir que não existam itens duplicados.Lógica de Filtro "OU": Se nada for selecionado, o componente assume "Todos". Se houver seleção, filtra apenas os itens contidos no conjunto.🛠️ Estrutura de Implementação1. Estilização (CSS)O componente utiliza um container flexível que simula o comportamento de um input de texto, mas comporta elementos filhos (tags)..multi-select-container: O corpo principal do componente..tag: Etiquetas compactas para itens selecionados..results-container: Dropdown absoluto que aparece abaixo do input durante a busca.2. Estrutura de Dados (HTML)Diferente do select padrão, utilizamos uma div de posicionamento relativo para ancorar a lista de resultados.HTML<div class="filter-item" style="position: relative;">
  <label>Nome do Filtro</label>
  <div id="multi-select-ID" class="multi-select-container">
    <div id="tags-ID" style="display: contents;"></div>
    <input type="text" id="input-search-ID" placeholder="Todos">
  </div>
  <div id="results-ID" class="results-container"></div>
</div>
🧠 Lógica de FuncionamentoO ciclo de vida do componente é dividido em três pilares:A. InicializaçãoOs itens disponíveis são extraídos dinamicamente da base de dados principal, garantindo que o filtro sempre exiba opções existentes.JavaScriptitemsDisponiveis = [...new Set(DADOS.map(d => d.Campo))];
B. Renderização de ResultadosAo digitar no campo de busca, o script realiza:Filtro por texto (case-insensitive).Exclusão de itens que já foram selecionados (evita redundância).Criação dinâmica de elementos .result-item.C. Renderização de TagsSempre que o Set de itens selecionados é alterado (adição ou remoção):A área de tags é limpa e reconstruída.O placeholder do input é alternado entre "Todos" (vazio) ou "" (com tags), mantendo a UI limpa.🔍 Integração com Motores de FiltroPara integrar este componente à sua lógica de filtragem de dados (ex: filtragem de uma tabela de chamados), substitua a comparação de igualdade simples por uma verificação de pertinência:Lógica de Comparação:$$f(x) = \begin{cases} \text{true}, & \text{se } \text{Set.size} = 0 \\ \text{Set.has}(x), & \text{caso contrário} \end{cases}$$JavaScript// Exemplo de aplicação no Array.filter()
const dadosFiltrados = dados.filter(d => {
    return itemsSelecionados.size === 0 || itemsSelecionados.has(d.Campo);
});
📝 Notas de UsoAjuste de Altura: O min-height: 32px no CSS deve ser ajustado para alinhar com os outros inputs do seu sistema.Cores: A classe .tag utiliza var(--primary). Certifique-se de que essa variável está definida no seu tema global ou substitua por uma cor hexadecimal.
