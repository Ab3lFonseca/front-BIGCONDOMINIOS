let isLogado = false;

function redirecionar(event) {
        event.preventDefault(); // impede o envio padrão
        isLogado=dadosValidos();
        if (isLogado) {
            window.location.href = "index.html"; // redireciona
        }
    }

    function dadosValidos() {
        const email = document.getElementById("usuario").value;
        const senha = document.getElementById("senha").value;

        if (email === "admin" && senha === "123456") {
            return true;
        }
        alert("Email ou senha inválidos.");
        return false;
    }