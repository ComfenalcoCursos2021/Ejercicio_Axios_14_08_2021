
addEventListener("DOMContentLoaded", (e)=>{
    
    



    let tabla = document.querySelector("#datoPokemon");
    const worker = new Worker('./worker/main.js');
    for (let i = 1; i <= 1; i++) {
        worker.postMessage({id: i});
    }
    worker.addEventListener('message', (e)=>{

        tabla.insertAdjacentHTML('beforeend', e.data.plantilla);
    })
})

