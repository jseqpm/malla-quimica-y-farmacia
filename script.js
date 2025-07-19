
const container = document.getElementById("network");

let savedData = JSON.parse(localStorage.getItem("malla_qyf_data")) || {};

const nodes = new vis.DataSet([
  { id: "QG1", label: "Química General I", group: "nivel1", color: getColor("QG1") },
  { id: "QG2", label: "Química General II", group: "nivel2", color: getColor("QG2") },
]);

const edges = new vis.DataSet([
  { from: "QG1", to: "QG2", arrows: "to" },
]);

const data = { nodes, edges };
const options = {
  nodes: {
    shape: "box",
    margin: 10,
    font: { multi: true }
  },
  physics: { stabilization: false },
};

const network = new vis.Network(container, data, options);

// Guardar progreso
network.on("click", function (params) {
  if (params.nodes.length > 0) {
    const nodeId = params.nodes[0];
    const current = savedData[nodeId] || {};
    const nuevoEstado = prompt("¿Aprobado? (si/no)\nEstado actual: " + (current.estado || "pendiente"), current.estado || "");
    if (nuevoEstado === "si" || nuevoEstado === "no") {
      savedData[nodeId] = { ...current, estado: nuevoEstado };
      localStorage.setItem("malla_qyf_data", JSON.stringify(savedData));
      nodes.update({ id: nodeId, color: getColor(nodeId) });
    }
  }
});

function getColor(id) {
  const estado = savedData[id]?.estado;
  if (estado === "si") return "lightgreen";
  if (estado === "no") return "lightcoral";
  return "#D2E5FF";
}
