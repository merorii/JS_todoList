const listArea = document.querySelector('#list');
const addBtn = document.querySelector('#addBtn');
const itemText = document.querySelector('#itemText');
const listFilter = document.querySelector('.listFilter');
const deleteAll = document.querySelector('.delete_all');

document.addEventListener('DOMContentLoaded', function(){
    listInit();
    listFilter.addEventListener('click', listFilterItem);
    addBtn.addEventListener('click', addItem);
    itemText.addEventListener('keypress', (e)=>{
        if(e.keyCode === 13) addItem();
    });
    deleteAll.addEventListener('click', ()=>{
        if(!listArr.length){
            alert("삭제할 데이터가 없습니다!");
            return;
        }
        if(!confirm("정말 모두 삭제하시겠습니까?")) return;
        listArr.length = 0;
        saveArr(listArr);
        listInit();
    });
});

let listArr=[];

function saveArr(value){
    localStorage.setItem("list", JSON.stringify(value));
}

function listInit(){
    
    listArr = JSON.parse(localStorage.getItem("list"));
    while(listArea.firstChild){
        listArea.removeChild(listArea.firstChild);
    }
    if(!listArr.length) {
        let noData = document.createElement("div");
        noData.textContent = "목록없음";
        listArea.appendChild(noData);
        return;
    }
    listArr.forEach((item, idx)=>{
        createItem(item, idx);
    });
}

function listFilterItem(){
    if(!listFilter.classList.contains('filter')){
        let cnt=0;
        listFilter.classList.add('filter');
        listFilter.textContent = "✓ 모든 LIST 보기";

        listFavArr = JSON.parse(localStorage.getItem("list"));
        // console.log(listFavArr)
        while(listArea.firstChild){
            listArea.removeChild(listArea.firstChild);
        }
        listFavArr.forEach((item, idx)=>{
            if(item.fav) {
                createItem(item, idx);
                cnt++;
            }
        });
        if(cnt == 0) {
            let noData = document.createElement("div");
            noData.textContent = "중요 LIST 없음";
            listArea.appendChild(noData);
            return;
        }
    }else{
        listFilter.classList.remove('filter');
        listFilter.textContent = "✓ 중요 LIST만 보기";        
        listInit();
    }

}

function addItem(){
    if(!listArr.length) {
        listArea.removeChild(listArea.firstChild);
    }
    let itemTextVal = itemText.value;
    if(itemTextVal){ 
        let newItem = {text : itemTextVal, state : false, fav : false};
        listArr.push(newItem);
        saveArr(listArr);
        createItem(listArr[listArr.length-1], listArr.length-1);
    }
    itemText.value = null;
}

function clickEvent(itemNow){
    itemNow.itemState.addEventListener('click', stateChange);
    itemNow.itemText.addEventListener('click', stateChange);
    function stateChange(){
        listArr[itemNow.idx].state = !listArr[itemNow.idx].state;
        (listArr[itemNow.idx].state) ? itemNow.itemState.classList.add('on') : itemNow.itemState.classList.remove('on');
        (listArr[itemNow.idx].state) ? itemNow.itemText.classList.add('on') : itemNow.itemText.classList.remove('on');       
        saveArr(listArr);
    }

    itemNow.itemDeleteBtn.addEventListener('click', ()=>{
        listArr.splice(itemNow.idx, 1);
        saveArr(listArr);
        listInit();
    });

    itemNow.itemFavBtn.addEventListener('click', (e)=>{
        // console.log(itemNow)
        let favItem = listArr[itemNow.idx];
        // console.log(favItem)
        listArr[itemNow.idx].fav = !listArr[itemNow.idx].fav;
        (listArr[itemNow.idx].fav) ? itemNow.itemFavBtn.classList.add('on') : itemNow.itemFavBtn.classList.remove('on');
        saveArr(listArr);
    });
}

function createItem(item, idx){
    let listItem = document.createElement('div');
    let listItemText = document.createElement('div');
    let listItemState = document.createElement('div');
    let listItemEditBtn = document.createElement('div');
    let listItemEditIcon = document.createElement('i');
    let listItemDeleteBtn = document.createElement('div');
    let listItemDeleteIcon = document.createElement('i');
    let listItemFavBtn = document.createElement('div');
    let listItemFavIcon = document.createElement('i');


    listItem.className = 'item';

    listItemText.className = 'text';
    listItemText.textContent = item.text;

    listItemState.className = 'state';
    listItemState.textContent = '✓';
    if(item.state) listItemState.classList.add('on');
    if(item.state) listItemText.classList.add('on');

    listItemEditBtn.className = 'edit';
    listItemEditIcon.className = 'far fa-edit ';
    listItemEditBtn.appendChild(listItemEditIcon);

    listItemDeleteBtn.className = 'delete';
    listItemDeleteIcon.className = 'far fa-trash-alt';
    listItemDeleteBtn.appendChild(listItemDeleteIcon);

    listItemFavBtn.className = 'fav';
    listItemFavIcon.className = 'fas fa-star';
    listItemFavBtn.appendChild(listItemFavIcon);
    if(item.fav) listItemFavBtn.classList.add('on');

    listItem.appendChild(listItemState);
    listItem.appendChild(listItemText);
    listItem.appendChild(listItemFavBtn);
    listItem.appendChild(listItemDeleteBtn);
    listArea.appendChild(listItem);

    let listItemAll = {
        idx : idx,
        item : listItem,
        itemText : listItemText,
        itemState : listItemState,
        itemEditBtn : listItemEditBtn,
        itemDeleteBtn : listItemDeleteBtn,
        itemFavBtn : listItemFavBtn,
    }
    clickEvent(listItemAll);
}
