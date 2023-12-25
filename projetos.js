const projectButton = document.querySelector('.button-add-projetos');
const projectInput = document.querySelector('.input-projetos');
const projectListaCompleta = document.querySelector('.list-projetos');

let projectMinhaListaDeItens = [];

function adicionarNovoProjeto() {
    projectMinhaListaDeItens.push({
        projeto: projectInput.value,
        concluida: false,
    });

    projectInput.value = '';

    mostrarProjetos();
}

function mostrarProjetos() {
    let novaLi = '';

    projectMinhaListaDeItens.forEach((item, posicao) => {
        novaLi =
            `
        <li class="task ${item.concluida && 'done'}">
            <img src="https://cdn-icons-png.flaticon.com/128/6459/6459980.png" alt="check-na-tarefa" onclick="concluirProjeto(${posicao})">
            <p>${item.projeto}</p>
            <img src="https://cdn-icons-png.flaticon.com/128/6932/6932392.png" alt="tarefa-para-o-lixo" onclick="deletarProjeto(${posicao})">
        </li>
        ` + novaLi;  // Adiciona o novo projeto no início da lista
    });

    projectListaCompleta.innerHTML = novaLi;

    localStorage.setItem('projetoLista', JSON.stringify(projectMinhaListaDeItens));
}


function concluirProjeto(posicao) {
    projectMinhaListaDeItens[posicao].concluida = !projectMinhaListaDeItens[posicao].concluida;

    mostrarProjetos();
}

function deletarProjeto(posicao) {
    projectMinhaListaDeItens.splice(posicao, 1);

    mostrarProjetos();
}

function recarregarProjetos() {
    const projetosDoLocalStorage = localStorage.getItem('projetoLista');

    if (projetosDoLocalStorage) {
        projectMinhaListaDeItens = JSON.parse(projetosDoLocalStorage);
    }

    mostrarProjetos();
}

recarregarProjetos();

// Adiciona a classe 'active' ao link correspondente na barra de navegação
const projetosLink = document.getElementById('projetos-link');
projetosLink.classList.add('active');

projectButton.addEventListener('click', adicionarNovoProjeto);
