const velas = [
  { id: 1, nombre: "vela lavanda", precio: 8000 },
  { id: 2, nombre: "vela vainilla", precio: 9500 },
  { id: 3, nombre: "vela canela", precio: 12000 }
];

const contenedor = document.querySelector("#contenedorProductos");
const feedback = document.querySelector("#feedback");
const form = document.querySelector("#formAgregar");
const busqueda = document.querySelector("#busqueda");

function renderizar(lista) {
  contenedor.innerHTML = "";
  lista.forEach(v => {
    const li = document.createElement("li");
    li.className = "producto";
    li.setAttribute("draggable", true);

    const titulo = document.createElement("h3");
    titulo.textContent = v.nombre;

    const precio = document.createElement("p");
    precio.textContent = `Precio: $${v.precio.toLocaleString()}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "eliminar";
    btnEliminar.addEventListener("click", () => eliminar(v.id));

    li.appendChild(titulo);
    li.appendChild(precio);
    li.appendChild(btnEliminar);

    li.addEventListener("mouseenter", () => {
      feedback.textContent = `sobre ${v.nombre}`;
      feedback.style.color = "coral";
    });

    li.addEventListener("dragstart", () => {
      feedback.textContent = `Arrastrando ${v.nombre}`;
      feedback.style.color = "orange";
    });

    contenedor.appendChild(li);
  });
}

renderizar(velas);

form.addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.querySelector("#nombre").value;
  const precio = parseInt(document.querySelector("#precio").value);

  const nueva = { id: Date.now(), nombre, precio };
  velas.push(nueva);
  renderizar(velas);

  feedback.textContent = `Vela "${nombre}" agregada`;
  feedback.style.color = "green";

  form.reset();
});

function eliminar(id) {
  const index = velas.findIndex(v => v.id === id);
  if (index !== -1) {
    const eliminada = velas.splice(index, 1)[0];
    renderizar(velas);
    feedback.textContent = `vela "${eliminada.nombre}" eliminada`;
    feedback.style.color = "red";
  }
}

busqueda.addEventListener("keyup", e => {
  const texto = e.target.value.toLowerCase();
  const filtradas = velas.filter(v => v.nombre.toLowerCase().includes(texto));
  renderizar(filtradas);
  feedback.textContent = texto ? `Resultados para "${texto}"` : "";
  feedback.style.color = "purple";
});

contenedor.addEventListener("drop", e => {
  e.preventDefault();
  feedback.textContent = "Elemento soltado";
  feedback.style.color = "brown";
});

contenedor.addEventListener("dragover", e => {
  e.preventDefault();
});
