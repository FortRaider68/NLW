
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states =>{
       for(const state of states){
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
       }
    })
}

populateUFs();

function populateCitys(event){
    const citySelect = document.querySelector("[name=city]");
    const stateInput = document.querySelector("[name=state]");

    const UfID = event.target.value

    const indexOfSelectedState = event.target.selectedIndex;

    stateInput.value = event.target.options[indexOfSelectedState].text;

    citySelect.innerHTML = "<option>Selecione a cidade.</option>";
    citySelect.disabled = true;

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UfID}/municipios`)
    .then(res => res.json())
    .then(cities =>{
        
        for( const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false;
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change",populateCitys)





let selectedItems = []

const ItensToCollect = document.querySelectorAll(".itens-grid ul li");

for(const Item of ItensToCollect){
    Item.addEventListener("click",handleSelectedItems)
}

function handleSelectedItems(event){
    const collectedItems = document.querySelector("input[name=items]")
    
    const ItemLI = event.target
    
    ItemLI.classList.toggle("selected")
    
    const itemID = ItemLI.dataset.id


    const AlreadySelected = selectedItems.findIndex((item)=> item == itemID)

    if (AlreadySelected >=0){
        const filteredItens =  selectedItems.filter(item => {
            const ItemIsDiferent = item != itemID
            return ItemIsDiferent
        })
        selectedItems = filteredItens
    }else{
        selectedItems.push(itemID)
    }
    collectedItems.value = selectedItems;
    
}