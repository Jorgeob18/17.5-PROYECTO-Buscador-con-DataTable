// Selectores
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const btnReset = document.querySelector('#reset');
const dTable = document.querySelector('#tableresult');

// Conteedor años
const resultado = document.querySelector('#resultado');
const maxyear = new Date().getFullYear();
const minyear = maxyear - 30;

// Generar un objeto con la busqueda
const datosBusqueda = {
  marca: '',
  year: '',
  minimo: '',
  maximo: '',
  puertas: '',
  transmision: '',
  color: '',
};

// Eventos
document.addEventListener('DOMContentLoaded', () => {
  // muestra los autos al cargar
  llenarMarcas(autos);
  llenarSelect();
  llenarColores(autos);
  // mostrarAutos(autos);
  mostrarDatatable(autos);
});

// Event Listener para los select de busqueda
marca.addEventListener('change', (e) => {
  datosBusqueda.marca = e.target.value;

  filtrarAuto();
});
year.addEventListener('change', (e) => {
  datosBusqueda.year = parseInt(e.target.value);
  filtrarAuto();
});
minimo.addEventListener('change', (e) => {
  datosBusqueda.minimo = e.target.value;
  filtrarAuto();
});
maximo.addEventListener('change', (e) => {
  datosBusqueda.maximo = e.target.value;
  filtrarAuto();
});
puertas.addEventListener('change', (e) => {
  datosBusqueda.puertas = parseInt(e.target.value);
  filtrarAuto();
});
transmision.addEventListener('change', (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrarAuto();
});
color.addEventListener('change', (e) => {
  datosBusqueda.color = e.target.value;
  filtrarAuto();
  // console.log(datosBusqueda);
});
btnReset.addEventListener('click', () => {
  (datosBusqueda.marca = undefined),
    (datosBusqueda.year = undefined),
    (datosBusqueda.minimo = undefined),
    (datosBusqueda.maximo = undefined),
    (datosBusqueda.puertas = undefined),
    (datosBusqueda.transmision = undefined),
    (datosBusqueda.color = undefined);
  marca.value = '';
  year.value = '';
  minimo.value = '';
  maximo.value = '';
  puertas.value = '';
  transmision.value = '';
  color.value = '';
  filtrarAuto();
  // console.log(datosBusqueda);
});

// Funciones
function mostrarAutos(autos) {
  // Elimina el html previo
  limpiarHTML();
  autos.forEach((auto) => {
    const { marca, modelo, year, precio, puertas, color, transmision } = auto;
    const autoHTML = document.createElement('p');

    autoHTML.textContent = `
    ${marca}, ${modelo}, ${year}, ${precio}, ${puertas}, ${color}, ${transmision}
    `;

    // Insertar en el HTML
    resultado.appendChild(autoHTML);
  });
}
function limpiarHTML() {
  dTable.innerHTML = '';
}

// Genera las marcas del select
function llenarMarcas(autos) {
  const data = autos.map((coche) => coche.marca);
  const dataArr = new Set(data);
  const result = [...dataArr];
  // console.log(result);
  result.sort().forEach((res) => {
    const opcion1 = document.createElement('option');
    opcion1.value = res;
    opcion1.textContent = res;
    // Agregar las opciones al select
    marca.appendChild(opcion1);
  });
}

// Genera los colores del select
function llenarColores(autos) {
  const data = autos.map((coche) => coche.color);
  const dataArr = new Set(data);
  const result = [...dataArr];
  // console.log(result);
  result.sort().forEach((res) => {
    const opcion1 = document.createElement('option');
    opcion1.value = res;
    opcion1.textContent = res;
    // Agregar las opciones al select
    color.appendChild(opcion1);
  });
}

// Genera los años del select
function llenarSelect() {
  for (let i = maxyear; i >= minyear; i--) {
    const opcion = document.createElement('option');
    opcion.value = i;
    opcion.textContent = i;
    // Agregar las opciones al select
    year.appendChild(opcion);
  }
}

// Funcion para filtrar en base a busqueda
function filtrarAuto() {
  // Automaticamente pasa los valores filtrados a la funcion dentro de filter
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);
  mostrarDatatable(resultado);
  // mostrarAutos(resultado);
  // console.log(resultado);
}

function filtrarMarca(auto) {
  if (datosBusqueda.marca) {
    return auto.marca === datosBusqueda.marca;
  }
  return auto;
}

function filtrarYear(auto) {
  const { year } = datosBusqueda; // Lo mismo que filtrar marca pero con Distructuring
  if (year) {
    return auto.year === year;
  }
  return auto;
}

function filtrarMinimo(auto) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
}

function filtrarMaximo(auto) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
}

function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return auto.puertas === puertas;
  }
  return auto;
}

function filtrarTransmision(auto) {
  const { transmision } = datosBusqueda;
  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  const { color } = datosBusqueda; // Lo mismo que filtrarMarca pero con Distructuring
  if (color) {
    return auto.color === color;
  }
  return auto;
}
let example;
function mostrarDatatable(dataSet) {
  limpiarHTML();
  example = $(document).ready(() => {
    $('#example').DataTable({
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json',
      },
      data: dataSet,
      bDestroy: true,
      dom: 'lBfrtlip',
      responsive: true,
      columns: [
        { data: 'marca' },
        { data: 'modelo' },
        { data: 'year' },
        { data: 'precio' },
        { data: 'puertas' },
        { data: 'transmision' },
        { data: 'color' },
      ],
    });
  });
}
