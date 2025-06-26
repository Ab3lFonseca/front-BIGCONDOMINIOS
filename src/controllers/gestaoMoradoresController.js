document.addEventListener("DOMContentLoaded", listarMoradores);

const username = "admin";
const password = "123456";
const basicAuth = btoa(`${username}:${password}`);

function listarMoradores() {
  fetch("https://back-endbigcondominios-production.up.railway.app/morador",{

        method: "GET",
        headers: {
            "Authorization": `Basic ${basicAuth}`
        }
    })

    .then(res => res.json())
    .then(moradores => {
      const tbody = document.getElementById("corpoTabelaMoradores");
      tbody.innerHTML = "";

      moradores.forEach(m => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
              <td>${m.id}</td>
              <td>${m.nome}</td>
              <td>${m.bloco}</td>
              <td>${m.apartamento}</td>
              <td>${m.telefone}</td>
              <td>
            <div class="acaoGestao">
              <i class="fa-solid fa-gear engrenagem"></i>
              <i class="fa-solid fa-trash lixo" ></i>
            </div>
          </td>
            `;
        tbody.appendChild(tr);
      });
    });
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('lixo')) {
    const linha = event.target.closest('tr'); // pega a linha inteira
    const id = linha.querySelector('td').innerText; // assume que o ID está na primeira coluna (td)
    
    if (confirm(`Deseja excluir o morador com ID ${id}?`)) {
      excluirMorador(id);
    }
  }
});

function excluirMorador(id) {
  fetch("https://back-endbigcondominios-production.up.railway.app/morador/"+id, {

    method: "DELETE",
    headers: {
      "Authorization": `Basic ${basicAuth}`
    }
    
  })
  .then(() => {
    alert("Morador excluído com sucesso!");
    listarMoradores(); // Atualiza a lista de moradores
  })
  .catch(error => {
    alert("Erro ao excluir morador: " + error.message);
  });
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('engrenagem')) {
    const linha = event.target.closest('tr'); // pega a linha inteira
    const id = linha.querySelector('td').innerText; // assume que o ID está na primeira coluna (td)
    carregarCadastro(id);
  }
});

function carregarCadastro(id) {
  window.location.href = `/src/pages/cadastro.html?id=${id}`;
  if (id) {
  fetch("https://back-endbigcondominios-production.up.railway.app/morador/"+id, {

    method: "GET",
    headers: {
      "Authorization": `Basic ${btoa(basicAuth)}`
    }
    
  })
  .then(res => res.json())
  .then(morador => {
    // Preencha os campos do formulário com os dados recebidos
    document.getElementById('nome').value = morador.nome;
    document.getElementById('bloco').value = morador.bloco;
    document.getElementById('apartamento').value = morador.apartamento;
    document.getElementById('telefone').value = morador.telefone;
    // ...adicione outros campos conforme necessário
  });
}
  // Aqui você chama a lógica/endpoint de exclusão
}

