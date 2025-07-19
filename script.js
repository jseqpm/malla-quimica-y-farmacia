document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) return;

      // Alternar aprobado
      ramo.classList.toggle("aprobado");

      // Actualizar bloqueo/desbloqueo de otros ramos según requisitos
      ramos.forEach(destino => {
        if (destino.dataset.abre) {
          const requisitos = obtenerRequisitos(destino.id);
          const todosAprobados = requisitos.every(idR => {
            const r = document.getElementById(idR);
            return r && r.classList.contains("aprobado");
          });

          if (todosAprobados) {
            destino.classList.remove("bloqueado");
          } else {
            destino.classList.add("bloqueado");
            destino.classList.remove("aprobado"); // si está bloqueado no puede estar aprobado
          }
        }
      });
    });
  });

  // Función para obtener requisitos (los que "abren" el ramo)
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

