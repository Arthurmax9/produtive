const taskButton = document.querySelector('.button-add-task');
const taskInput = document.querySelector('.input-task');
const taskListaCompleta = document.querySelector('.list-tasks');

let taskMinhaListaDeItens = [];

function adicionarNovaTarefa() {
    taskMinhaListaDeItens.push({
        tarefa: taskInput.value,
        concluida: false,
    });

    taskInput.value = '';

    mostrarTarefas();
}

function mostrarTarefas() {
    let novaLi = '';

    taskMinhaListaDeItens.forEach((item, posicao) => {
        novaLi =
            `
        <li class="task ${item.concluida && 'done'}">
            <img src="https://cdn-icons-png.flaticon.com/128/6459/6459980.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="https://cdn-icons-png.flaticon.com/128/6932/6932392.png" alt="tarefa-para-o-lixo" onclick="deletarTarefa(${posicao})">
        </li>
        ` + novaLi;  // Adiciona o novo item no início da lista
    });

    taskListaCompleta.innerHTML = novaLi;

    localStorage.setItem('tarefaLista', JSON.stringify(taskMinhaListaDeItens));
}


function concluirTarefa(posicao) {
    taskMinhaListaDeItens[posicao].concluida = !taskMinhaListaDeItens[posicao].concluida;

    mostrarTarefas();
}

function deletarTarefa(posicao) {
    taskMinhaListaDeItens.splice(posicao, 1);

    mostrarTarefas();
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('tarefaLista');

    if (tarefasDoLocalStorage) {
        taskMinhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
    }

    mostrarTarefas();
}

recarregarTarefas();

// Adiciona a classe 'active' ao link correspondente na barra de navegação
const tarefasLink = document.querySelector('.tarefas');
tarefasLink.classList.add('active');

taskButton.addEventListener('click', adicionarNovaTarefa);
