const listaTareas = [
    {
        id: 1657926278717,
        actividad: "Pasear al Lucky",
        realizado: false
    },
    {
        id: 1657926278734,
        actividad: "Estudiar",
        realizado: false
    },
    {
        id: 1657926278798,
        actividad: "Tocar instrumento",
        realizado: false
    }
];

function limpiarInputNuevaTarea() {
    const inputNuevaTarea = document.getElementById("nueva-tarea");
    inputNuevaTarea.value = " ";
}

function actualizarTareasRealizadas() {

    // 1 ir a buscar el span de tareas realizadas
    const tareasRealizadas = document.getElementById("span-realizadas");

    // 2 obtener total de tareas realizadas
    const totalTareasRealizadas = listaTareas.filter(tarea => tarea.realizado == true).length;

    // 3 actualizar el span de tareas realizadas con el total
    tareasRealizadas.innerHTML = totalTareasRealizadas;
}

function actualizarTotal() {

    // 1 ir a buscar el span de Total
    const totalTareas = document.getElementById("span-total");

    // 2 actualizar el span total con listaTarea
    totalTareas.innerHTML = listaTareas.length;
}

function limpiarLista() {
    const listaHtml = document.getElementById("lista-tareas");
    listaHtml.innerHTML = " ";
}

function agregarTarea() {

    // 1 buscar el texto input "nueva tarea"
    const tareaNueva = document.getElementById("nueva-tarea");

    // 1.1 validar si esta vacio
    if (tareaNueva.value.trim().length == 0) {
        alert("Ingrese tarea valida");
        return false;
    }

    // 2 sumar "nueva tarea" al arreglo ´listaTareas´
    listaTareas.push({
        id: Date.now(),
        actividad: tareaNueva.value,
        realizado: false
    });

    // 3 Llamar a la funcion "cargarTareas" pasando el arreglo con la tarea nueva
    cargarTareas(listaTareas);

    // 4 actualizar total
    actualizarTotal();

    // 5 limpio input
    limpiarInputNuevaTarea();
}

function cargarEventoBotonAgregar() {
    const botonAgregar = document.getElementById("btn-agregar");
    botonAgregar.addEventListener("click", function () {
        agregarTarea();
    });
}

function borrarTarea(idTarea) {

    // 1 buscar la posicion de la tarea que queremos eliminar
    const indiceEliminarTarea = listaTareas.findIndex(tarea => tarea.id == idTarea);

    // 2 eliminar la tarea encontrada segun el indice "indiceEliminarTarea"
    listaTareas.splice(indiceEliminarTarea, 1);

    // 3 cargar la lista html sin la tarea
    cargarTareas(listaTareas);

    // 4 actualizar total
    actualizarTotal();

    // 5 actualizar tareas realizadas
    actualizarTareasRealizadas();
}

function esRealizado(realizado) {
    if (realizado == true) {
        return "checked";
    }
}

function estadoActividad(idTarea) {

    // 1 encontrar la tarea en la lista de tareas que sea igual el id a idTarea
    const indiceTarea = listaTareas.findIndex(tarea => tarea.id == idTarea);

    const tareaEncontrada = listaTareas[indiceTarea];
    tareaEncontrada.realizado = !tareaEncontrada.realizado;

    listaTareas.splice(indiceTarea, 1, tareaEncontrada);

    // 4 actualizar total tareas realizadas
    actualizarTareasRealizadas();
}

function cargarTareas(tareas) {

    // Limpiar lista ul
    limpiarLista();

    // 1 buscar lista
    const listaHtml = document.getElementById("lista-tareas");

    // 2 recorrer lista de tareas
    tareas.forEach(tarea => {

        // 3 cada elemento de la lista de tareas se debe añadir a la tabla
        listaHtml.innerHTML += `
        <li>
            <input id="checkbox-${tarea.id}" type="checkbox" ${esRealizado(tarea.realizado)} onClick="estadoActividad(${tarea.id})"/>            
            <input class="btn-eliminar" type="image" onClick="borrarTarea(${tarea.id})" alt="eliminar" src="./assets/img/eliminar.png"/>
            ${tarea.id} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            ${tarea.actividad}
        </li>
        `;
    });
}

function cargaInicial() {
    cargarEventoBotonAgregar();
    cargarTareas(listaTareas);
    actualizarTotal();
    actualizarTareasRealizadas();
    limpiarInputNuevaTarea();
}

cargaInicial();