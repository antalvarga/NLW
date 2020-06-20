
//console.log('hello world');
// https://servicodados.ibge.gov.br/api/docs/localidades?versao=1#api-UFs-estadosGet
// https://servicodados.ibge.gov.br/api/v1/localidades/estados

/* 

fetch( "https://servicodados.ibge.gov.br/api/v1/localidades/estados" ).then(function(res) {console.log(res.json())})

fetch( "https://servicodados.ibge.gov.br/api/v1/localidades/estados" ).then(function(res) {return res.json() }).then(function(data){console.log(data)})

*/

/*
    .then( (res) => { return res.json() } )
    ou 
    .then( res => res.json() )


document
    .querySelector("select[name=uf]")
    .addEventListener("change", () => { 
        console.log("mudei")
    }  )


    */

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch( "https://servicodados.ibge.gov.br/api/v1/localidades/estados" )
    .then( (res) => { return res.json() } )
    .then( states => {
        for( state of states ) {
            ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`;
        }
        
    } )
}

populateUFs();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");
    const ufValue = event.target.value;
    const indexOfSelectedState = event.target.selectedIndex;
 
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option value=''>Selecione a cidade</option>";
    citySelect.disabled = true;

    fetch( url )
    .then( (res) => { return res.json() } )
    .then( cities => {
        for( city of cities ) {
            citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`;
        }
        citySelect.disabled = false;
    } )

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities );   // passando a funcao getCities por referência

// Aula5 - 1:16:00 Explicação sobre o funcionamento    

// itens de coleta
// pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
}

// input hidden aonde ficarão armazenados todos os itens selecionados
const collectedItems = document.querySelector("input[name=items]");
    
let selectedItems = [];

function handleSelectedItem( event ) {
    const itemLi = event.target;

    // console.log();

    // adicionar ou remover uma classe com js
    itemLi.classList.toggle("selected");

    //const itemId = event.target.dataset.id; 
    const itemId = itemLi.dataset.id; 

    // verificar se existem itens selecionados
    // recuperar itens selecionados
    // const alreadySelected = selectedItems.findIndex.findIndex( function(item) {
    //     const itemFound = item == itemId;
    //     return itemFound;
    // });
    // ou usando uma arrow function
    const alreadySelected = selectedItems.findIndex( item => item == itemId );

    // se estiver selecionado remover da selecao
    if( alreadySelected >= 0 ) {
        // popular um novo array qd a instrucao abaixo for verdadeiro
        const filteredItems = selectedItems.filter( item => {
            const itemsIsDifferent = item !== itemId; // qd for false  elimina do array
            return itemsIsDifferent;
        })
        selectedItems = filteredItems;
    } else {
        // se não estiver adicionar
        selectedItems.push(itemId);

    }

    // atualizar o campo escondido
    collectedItems.value = selectedItems;
    
}
