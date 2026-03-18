# Custom Multi-Select Tag Filter 🏷️

Um componente leve e performático para transformar `<select>` estáticos em campos de multisseleção dinâmicos com busca em tempo real e interface de tags.

## 🚀 Funcionalidades
* **Busca em Tempo Real:** Filtra opções conforme o usuário digita.
* **Gerenciamento de Tags:** Adição e remoção intuitiva de itens.
* **Prevenção de Duplicatas:** Utiliza `Set()` para garantir unicidade.
* **Estado "Todos":** Comportamento inteligente quando nenhuma tag está selecionada.

## 🛠️ Estrutura de Implementação

### Passo 1: Estilização (CSS)
O componente utiliza um container flexível que mimetiza o comportamento de um input padrão, mas permite o empilhamento de tags.

```css
.multi-select-container { 
    display: flex; 
    flex-wrap: wrap; 
    gap: 2px; 
    padding: 2px 4px;
    border: 1px solid #ced4da;
}
/* As tags ocupam espaço dinâmico e o input expande para preencher o resto */
