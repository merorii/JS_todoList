const listArea = document.querySelector('#list');
const addBtn = document.querySelector('#addBtn');
const itemText = document.querySelector('#itemText');

document.addEventListener('DOMContentLoaded', function(){
    listPrint();
    addBtn.addEventListener('click', addItem);
    itemText.addEventListener('keypress', enterKey);
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

function enterKey(e){
    if(e.keyCode === 13) addItem();
}

function addItem(){
    let itemTextVal = itemText.value;
    if(itemTextVal){ 
        let newItem = {text : itemTextVal, state : false};
        list.push(newItem);
    }
    itemText.value = null
    listPrint();
}

function listPrint(){
    while(listArea.firstChild){
        listArea.removeChild(listArea.firstChild);
    }
    list.forEach((item, idx)=>{
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
        listItem.appendChild(listItemEditBtn);
        listItem.appendChild(listItemDeleteBtn);
        listArea.appendChild(listItem);

        clickEvent(listItem, listItemDeleteBtn, listItemEditBtn, idx);
    });
    
}

function clickEvent(listItem, listItemDeleteBtn, listItemEditBtn, idx){
    listItem.addEventListener('click', function(){
        list[idx].state = !list[idx].state;
        listPrint();
    });
    listItemDeleteBtn.addEventListener('click', function(){
        list.splice(idx, 1);
        listPrint();
    });

    listItemEditBtn.addEventListener('click', function(){
    });
}