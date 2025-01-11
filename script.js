const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#boton-enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const linethrough = 'line-through'
let id
let LIST 


//Creación fecha

const FECHA = new Date ()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday: 'long', month: 'short', day:'numeric'})


// Funcion agregar tarea

function agregarTarea (tarea,id,Realizado,Eliminado)   {

    if(Eliminado)   {return}

    const REALIZADO = Realizado ?check :uncheck
    const LINE = Realizado ?linethrough :''


    const elemento = 
   ` 
    <li id="elemento">
      <i class="far ${REALIZADO}" data="Realizado" id="${id}"></i>
      <p class="text ${LINE}">${tarea} </p>
      <i class="fas fa-trash de" data="Eliminado" id="${id}"></i>
    </li>
   ` 
   lista.insertAdjacentHTML("beforeend",elemento)
}


//funcion de tarea Realizada

function tareaRealizada(element)    {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(linethrough)
    LIST[element.id].Realizado = LIST[element.id].Realizado ?false :true

}

//Funcion de tarea eliminada

function tareaEliminada(element)    {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].Eliminado = true
}

botonEnter.addEventListener('click', ()=>   {
    const tarea =input.value
    if(tarea)   {
        agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre:tarea,
            id:id,
            Realizado:false,
            Eliminado:false
        })
    }
    localStorage.setItem('TODO LIST',JSON.stringify(LIST))
    input.value=''
    id++
} )


document.addEventListener('keyup',function(event) {
    if(event.key=='Enter')  {
        const tarea = input.value 
        if(tarea)   {
            agregarTarea(tarea,id,false,false)
            LIST.push({
                nombre:tarea,
                id:id,
                Realizado:false,
                Eliminado:false
            })
        }
        localStorage.setItem('TO-DO LIST',JSON.stringify(LIST))
        input.value=''
        id++
    }
})

lista.addEventListener('click',function(event)  {
    const element = event.target
    const elemetData = element.attributes.data.value
    if(elemetData==='Realizado')    {
        tareaRealizada(element)
    }
    else if (elemetData==='Eliminado')  {
        tareaEliminada(element)
    }
    localStorage.setItem('TODO LIST',JSON.stringify(LIST))
})

let data = localStorage.getItem('TO-DO LIST')
if(data){
    LIST = JSON.parse(data)
    console.log(LIST)
    id = LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id = 0
}


function cargarLista(array) {
    array.forEach(function(item){
        agregarTarea(item.nombre,item.id,item.Realizadoalizado,item.Eliminado)
    })
}

