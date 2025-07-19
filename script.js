document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) return;

      ramo.classList.toggle("aprobado");

      // Revisa todos los ramos bloqueados para ver si se pueden desbloquear
      ramos.forEach(destino => {
        if (destino.classList.contains("bloqueado")) {
          const requisitos = obtenerRequisitos(destino.id);
          const todosAprobados = requisitos.every(idR => {
            const r = document.getElementById(idR);
            return r && r.classList.contains("aprobado");
          });

          if (todosAprobados) {
            destino.classList.remove("bloqueado");
          } else {
            destino.classList.add("bloqueado");
          }
        }
      });
    });
  });

  function obtenerRequisitos(idDestino) {
    let reqs = [];
    ramos.forEach(r => {
      if (r.dataset.abre) {
        const listaAbre = r.dataset.abre.split(",").map(s => s.trim());
        if (listaAbre.includes(idDestino)) {
          reqs.push(r.id);
        }
      }
    });
    return reqs;
  }
});

