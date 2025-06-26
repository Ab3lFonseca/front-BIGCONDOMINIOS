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
              <div>${m.id}</div>
              <div>${m.nome}</div>
              <div>${m.bloco}</div>
              <div>${m.apartamento}</div>
              <div>${m.telefone}</div>
              <div><div class = 'acaoGestao'><i class="fa-solid fa-gear engrenagem"></i>  <i class="fa-solid fa-trash lixo"></i></div></div>
            `;
        tbody.appendChild(tr);
      });
    });
}

function cancelarMorador(id) {
  if (!confirm("Deseja cancelar o cadastro?")) return;

  fetch(`https://back-endbigcondominios-production.up.railway.app/api/moradores/${id}/cancelar`, {
    method: "POST"
  }).then(() => listarReservas());
}
