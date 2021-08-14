self.importScripts('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js');
const getPokemon = async({...arg})=>{
    let Pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${arg.id}`);
    return Pokemon.data;
}
const crearImg = async(idImg,valueImg)=>{
    let img = await fetch(`${valueImg}`).then(res=>res.blob());
    return `<img src="${URL.createObjectURL(img)}" alt="${idImg}">`;
}
const plantilla = (()=>{
    let plantillaString = "";
    return ({...arg})=>{
        let cadena = "<tr>";
        let cajaImg = "<td>";
        for(let [id,value] of Object.entries(arg.data)){
            if(id!='img'){
                cadena += `<td>${value}</td>`;
            }else if(id=="img"){
                for(let [idImg,valueImg] of Object.entries(value)){
                    //Arreglar
                    crearImg(idImg,valueImg).then((res)=>{
                        cajaImg += res;
                    })
                }
            }
        }
        
        cajaImg += '</td>';
        console.log(cajaImg);
        cadena += cajaImg+'</tr>';
        plantillaString = cadena;
        return {plantilla:plantillaString, data: arg.data};
    }
})();

addEventListener('message', (e)=>{
    getPokemon(e.data).then((res)=>{
        var {
            other,
            versions,
            back_female,
            back_shiny_female, 
            front_female,
            front_shiny_female,
            ...img} = res.sprites;
        let data = {id: res.id, name: res.name, img};
        postMessage(plantilla({data}));
    })
})
    

