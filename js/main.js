const listArea = document.querySelector('#list');
const addBtn = document.querySelector('#addBtn');
const itemText = document.querySelector('#itemText');
const deleteAll = document.querySelector('.delete_all');

document.addEventListener('DOMContentLoaded', function(){
    listInit();
    addBtn.addEventListener('click', addItem);
    
});

let list = [{
        text : "텍스트",
        state : false
    },{
        text : "텍스트2",
        state : true
    },{
        text : "텍스트3",
        state : true
    },
];

itemText.addEventListener('keypress', (e)=>{
    if(e.keyCode === 13) addItem();
});

function listInit(){
    while(listArea.firstChild){
        listArea.removeChild(listArea.firstChild);
    }
    if(list.length === 0) {
        let noData = document.createElement("div");
        noData.textContent = "목록없음"
        listArea.appendChild(noData);
        return;
    }
    list.forEach((item, idx)=>{
        createItem(item, idx);
    });
}

function addItem(){
    if(list.length === 0) {
        listArea.removeChild(listArea.firstChild);
    }
    let itemTextVal = itemText.value;
    if(itemTextVal){ 
        let newItem = {text : itemTextVal, state : false};
        list.push(newItem);
    }
    itemText.value = null;
    console.log(list)
    createItem(list[list.length-1], list.length-1)
}

function clickEvent(listItem, listItemState, listItemDeleteBtn, listItemEditBtn, listItemText, idx){

    listItemState.addEventListener('click', stateChange);
    listItemText.addEventListener('click', stateChange);
    function stateChange(){
        list[idx].state = !list[idx].state;
        (list[idx].state) ? listItemState.classList.add('on') : listItemState.classList.remove('on');
        (list[idx].state) ? listItemText.classList.add('on') : listItemText.classList.remove('on');
    }

    listItemDeleteBtn.addEventListener('click', function(){
        list.splice(idx, 1);
        listInit();
    });

    deleteAll.addEventListener('click', ()=>{
        list.length = 0;
        listInit();
    });

    listItemEditBtn.addEventListener('click', function(){
        var listItemTextEdit = document.querySelector('.text');
        listItemTextEdit.readOnly = true;
        console.log(listItemDeleteBtn)
        console.log(listItemDeleteBtn)
        listItemDeleteBtn.classList.add('d-none');
        listItemEditBtn.classList.add('d-none');
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

    listItem.appendChild(listItemState);
    listItem.appendChild(listItemText);
    // listItem.appendChild(listItemEditBtn);
    listItem.appendChild(listItemDeleteBtn);
    listArea.appendChild(listItem);
    
    clickEvent(listItem, listItemState, listItemDeleteBtn, listItemEditBtn, listItemText, idx);
}
