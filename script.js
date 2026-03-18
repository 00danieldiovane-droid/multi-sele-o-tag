// 1. Estado Global
let itemsDisponiveis = ["Suporte N1", "Suporte N2", "Infraestrutura", "Desenvolvimento", "RH", "Diretoria"];
let itemsSelecionados = new Set();
let isMultiSelectInitialized = false;

// Elementos do DOM
const container = document.getElementById('multi-select-ID');
const input = document.getElementById('input-search-ID');
const results = document.getElementById('results-ID');
const tagsDiv = document.getElementById('tags-ID');

function initMultiSelect() {
    if (isMultiSelectInitialized) return;
    isMultiSelectInitialized = true;

    // Foca no input ao clicar no container
    container.addEventListener('click', () => input.focus());

    // Filtra ao digitar
    input.addEventListener('input', (e) => {
        renderResults(e.target.value);
    });

    // Fecha o dropdown ao clicar fora
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            results.style.display = 'none';
        }
    });
}

function renderResults(searchTerm = "") {
    results.innerHTML = "";
    
    // Filtra itens que batem com a busca e NÃO estão selecionados
    const filtrados = itemsDisponiveis.filter(item => 
        item.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !itemsSelecionados.has(item)
    );

    if (filtrados.length > 0 && searchTerm !== "" || (filtrados.length > 0 && input === document.activeElement)) {
        results.style.display = 'block';
        filtrados.forEach(item => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.textContent = item;
            div.onclick = () => addTag(item);
            results.appendChild(div);
        });
    } else {
        results.style.display = 'none';
    }
}

function addTag(item) {
    itemsSelecionados.add(item);
    input.value = "";
    renderTags();
    results.style.display = 'none';
    
    // Chame aqui sua função de filtro de dados, ex: filtrarTabela();
    console.log("Filtros ativos:", Array.from(itemsSelecionados));
}

window.removeTag = function(item) {
    itemsSelecionados.delete(item);
    renderTags();
    // Chame aqui sua função de filtro de dados
};

function renderTags() {
    tagsDiv.innerHTML = "";
    itemsSelecionados.forEach(item => {
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.innerHTML = `${item} <span class="remove-tag" onclick="removeTag('${item}')">&times;</span>`;
        tagsDiv.appendChild(tag);
    });

    // Gerencia o placeholder
    input.placeholder = itemsSelecionados.size === 0 ? "Todos" : "";
}

// Inicializa o componente
initMultiSelect();