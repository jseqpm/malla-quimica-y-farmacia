// script.js

document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) return;

      ramo.classList.toggle("aprobado");

      const abre = ramo.dataset.abre;
      if (abre) {
        const abreList = abre.split(",").map(id => id.trim());
        abreList.forEach(id => {
          const destino = document.getElementById(id);
          if (destino && requisitosAprobados(destino)) {
            destino.classList.remove("bloqueado");
          }
        });
      }
    });
  });

  function requisitosAprobados(ramo) {
    const requisitos = Array.from(document.querySelectorAll(`[data-abre*="${ramo.id}"]`));
    return requisitos.every(req => req.classList.contains("aprobado"));
  }
});
