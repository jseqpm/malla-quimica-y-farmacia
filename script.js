document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) return;

      ramo.classList.toggle("aprobado"); // Esto agrega o quita el tachado

      actualizarBloqueos(); // Actualiza los bloqueos/desbloqueos según aprobados
    });
  });

  // Esta función actualiza todos los ramos bloqueados según si cumplen requisitos
  function actualizarBloqueos() {
    ramos.forEach(destino => {
      if (destino.dataset.abre) return; // Los que abren otros no se bloquean aquí (si quieres puedes cambiar esta lógica)

      if (destino.classList.contains("bloqueado") || !destino.classList.contains("aprobado")) {
        // Verificamos requisitos para cada ramo bloqueado o no aprobado
        const requisitos = obtenerRequisitos(destino.id);
        const todosAprobados = requisitos.every(idR => {
          const r = document.getElementById(idR);
          return r && r.classList.contains("aprobado");
        });

        if (todosAprobados) {
          destino.classList.remove("bloqueado");
        } else {
          destino.classList.add("bloqueado");
          destino.classList.remove("aprobado"); // Si bloqueas, desapruebas automáticamente
        }
      }
    });
  }

  // Obtener todos los IDs que son requisito para un ramo destino dado
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
