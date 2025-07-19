// script.js

document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Al hacer clic en un ramo
  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) return;

      ramo.classList.toggle("aprobado");

      // Recorremos todos los ramos para ver si alguno se puede desbloquear
      ramos.forEach(destino => {
        if (destino.classList.contains("bloqueado")) {
          const requisitos = obtenerRequisitos(destino.id);
          if (requisitos.every(reqId => document.getElementById(reqId).classList.contains("aprobado"))) {
            destino.classList.remove("bloqueado");
          }
        }
      });
    });
  });

  // Buscar todos los ramos que tienen como requisito el ID dado
  function obtenerRequisitos(idRamoDestino) {
    let requisitos = [];
    ramos.forEach(r => {
      const abre = r.dataset.abre;
      if (abre) {
        const abreList = abre.split(",").map(s => s.trim());
        if (abreList.includes(idRamoDestino)) {
          requisitos.push(r.id);
        }
      }
    });
    return requisitos;
  }
});
