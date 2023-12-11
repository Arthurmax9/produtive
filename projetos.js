const button = document.querySelector('.button-add-projetos');
const input = document.querySelector('.input-projetos');
const listaCompleta = document.querySelector('.list-projetos');

let minhaListaDeItens = [];

function adicionarNovoProjetos() {
    minhaListaDeItens.push({
        projeto: input.value,
        concluida: false,
    });

    input.value = '';

    mostrarProjetos();
}

function mostrarProjetos() {
    let novaLi = '';

    minhaListaDeItens.forEach((item, posicao) => {
        novaLi +=
            `
        <li class="task ${item.concluida && 'done'}">
            <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.projeto}</p>
            <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
        </li>
      `;
    });

    listaCompleta.innerHTML = novaLi;

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;

    mostrarProjetos();
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1);

    mostrarProjetos();
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista');

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
    }

    mostrarProjetos();
}

recarregarTarefas();
button.addEventListener('click', adicionarNovoProjetos);
