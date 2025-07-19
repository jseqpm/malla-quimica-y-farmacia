const ramos = [
  { nombre: "química general I", abre: ["química general II", "química inorgánica"] },
  { nombre: "biología celular", abre: ["histología"] },
  { nombre: "matemática I", abre: ["física general", "matemática II"] },
  { nombre: "anatomía y embriología humana", abre: ["histología"] },
  { nombre: "química general II", abre: ["química orgánica I", "química analítica"] },
  { nombre: "física general", abre: ["fisicoquímica I"] },
  { nombre: "matemática II", abre: ["fisicoquímica I"] },
  { nombre: "introducción a la química y farmacia", abre: [] },
  { nombre: "histología", abre: ["biomedicina I"] },
  { nombre: "electivo de formación general I", abre: [] },
  { nombre: "química orgánica I", abre: ["química orgánica II", "laboratorio de química orgánica"] },
  { nombre: "química analítica", abre: ["análisis instrumental"] },
  { nombre: "química inorgánica", abre: [] },
  { nombre: "fisicoquímica I", abre: ["fisicoquímica II"] },
  { nombre: "biomedicina I", abre: ["biomedicina II"] },
  { nombre: "electivo de formación general II", abre: [] },
  { nombre: "química orgánica II", abre: ["bioquímica general", "farmacoquímica I"] },
  { nombre: "análisis instrumental", abre: ["bioquímica general", "bromatología"] },
  { nombre: "fisicoquímica II", abre: ["operaciones unitarias"] },
  { nombre: "biomedicina II", abre: ["microbiología", "fisiopatología I"] },
  { nombre: "laboratorio de química orgánica", abre: [] },
  { nombre: "bioquímica general", abre: ["farmacología I", "bioquímica clínica"] },
  { nombre: "fisiopatología I", abre: ["farmacología I", "fisiopatología II"] },
  { nombre: "microbiología", abre: [] },
  { nombre: "operaciones unitarias", abre: ["tecnología farmacéutica I"] },
  { nombre: "bromatología", abre: [] },
  { nombre: "ética", abre: ["salud pública", "administración y gestión farmacéutica"] },
  { nombre: "farmacología I", abre: ["farmacología II"] },
  { nombre: "farmacoquÍmica I", abre: ["farmacoquímica II"] },
  { nombre: "fisiopatología II", abre: ["farmacología II"] },
  { nombre: "salud pública", abre: ["epidemiologia estadística"] },
  { nombre: "bioquímica clínica", abre: ["biología molecular"] },
  { nombre: "farmacología II", abre: ["farmacia clínica I", "toxicología"] },
  { nombre: "tecnología farmacéutica I", abre: ["tecnología farmacéutica II"] },
  { nombre: "biología molecular", abre: [] },
  { nombre: "farmacoquímica II", abre: [] },
  { nombre: "administración y gestión farmacéutica", abre: ["desarrollo comunicacional estadística"] },
  { nombre: "electivo de formación general III", abre: [] },
  { nombre: "farmacia clínica I", abre: ["farmacia clínica II", "nutrición clínica"] },
  { nombre: "tecnología farmacéutica II", abre: ["nutrición clínica", "legislación farmacéutica"] },
  { nombre: "epidemiologia estadística", abre: ["metodología de investigación"] },
  { nombre: "desarrollo comunicacional estadística", abre: [] },
  { nombre: "toxicología", abre: [] },
  { nombre: "electivo de formación general IV", abre: [] },
  { nombre: "farmacia clínica II", abre: ["internado clínico"] },
  { nombre: "nutrición clínica", abre: [] },
  { nombre: "metodología de investigación", abre: [] },
  { nombre: "legislación farmacéutica", abre: [] },
  { nombre: "electivo de especialidad I", abre: [] },
  { nombre: "internado clínico", abre: [] },
  { nombre: "electivo de especialidad II", abre: [] },
  { nombre: "electivo de especialidad III", abre: [] },
  { nombre: "actividad de titulación", abre: [] }, // Esto lo puedes mejorar para depender de todos los ramos
];

const malla = document.getElementById("malla");
const estadoRamos = {};

ramos.forEach(ramo => {
  estadoRamos[ramo.nombre] = "bloqueado";
});

// Desbloquear los iniciales
[
  "química general I",
  "biología celular",
  "matemática I",
  "anatomía y embriología humana"
].forEach(nombre => estadoRamos[nombre] = "desbloqueado");

function crearRamo(ramo) {
  const div = document.createElement("div");
  div.className = `ramo ${estadoRamos[ramo.nombre]}`;
  div.innerText = ramo.nombre;

  div.onclick = () => {
    if (estadoRamos[ramo.nombre] !== "desbloqueado") return;

    estadoRamos[ramo.nombre] = "aprobado";
    div.classList.remove("desbloqueado");
    div.classList.add("aprobado");

    ramo.abre.forEach(nombre => {
      if (estadoRamos[nombre] === "bloqueado") {
        estadoRamos[nombre] = "desbloqueado";
        const desbloquear = Array.from(document.querySelectorAll('.ramo'))
          .find(el => el.innerText === nombre);
        if (desbloquear) {
          desbloquear.classList.remove("bloqueado");
          desbloquear.classList.add("desbloqueado");
        }
      }
    });
  };

  malla.appendChild(div);
}

ramos.forEach(crearRamo);
