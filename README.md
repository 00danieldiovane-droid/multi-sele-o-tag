# Custom Multi-Select Tag Filter 🏷️

Este componente substitui o `<select multiple>` nativo por uma interface moderna de busca com etiquetas (tags), ideal para dashboards e filtragem de grandes volumes de dados.

## 📌 Como Implementar

### 1. Instalação
Basta copiar os arquivos `style.css` e `script.js` para o seu projeto e referenciá-los no seu HTML.

### 2. Estrutura HTML
Certifique-se de manter a hierarquia de IDs, pois o JavaScript depende deles para renderizar as tags:
* `multi-select-ID`: O container principal.
* `tags-ID`: Onde as etiquetas são injetadas.
* `input-search-ID`: Onde o usuário digita.
* `results-ID`: O dropdown de sugestões.

### 3. Integração com seus Dados
Para que o filtro funcione com sua base de dados real, altere a lógica de filtragem conforme o exemplo abaixo:

```javascript
// No seu script de filtragem de tabela/lista:
const dadosFiltrados = seuArrayOriginal.filter(d => {
    // Se nada estiver selecionado, exibe todos os registros
    if (itemsSelecionados.size === 0) return true;
    
    // Verifica se o valor da linha está contido no Set de tags
    return itemsSelecionados.has(d.departamento);
});
