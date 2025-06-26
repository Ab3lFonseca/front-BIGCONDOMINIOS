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
  console.log("Excluindo morador com ID:", id);
  // Aqui você chama a lógica/endpoint de exclusão
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
  // Aqui você chama a lógica/endpoint de exclusão
}

