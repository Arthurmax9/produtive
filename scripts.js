const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

let minhaListaDeItens = [];

function adicionarNovaTarefa() {
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false,
    });

    input.value = '';

    mostrarTarefas();
}

function mostrarTarefas() {
    let novaLi = '';

    minhaListaDeItens.forEach((item, posicao) => {
        novaLi +=
            `
        <li class="task ${item.concluida && 'done'}">
            <img src="https://cdn-icons-png.flaticon.com/128/6459/6459980.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="https://cdn-icons-png.flaticon.com/128/6932/6932392.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
        </li>
        
        `;
    });

    listaCompleta.innerHTML = novaLi;

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;

    mostrarTarefas();
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1);

    mostrarTarefas();
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista');

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
    }

    mostrarTarefas();
}

recarregarTarefas();

// Adiciona a classe 'active' ao link correspondente na barra de navegação
const navLinks = document.querySelectorAll('.topnav a');
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(innerLink => innerLink.classList.remove('active'));
        this.classList.add('active');
    });
});

// Adiciona a classe 'active' ao link correspondente na barra de navegação
const tarefasLink = document.querySelector('.tarefas');
tarefasLink.classList.add('active');

button.addEventListener('click', adicionarNovaTarefa);
