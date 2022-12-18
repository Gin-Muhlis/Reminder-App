const inputAddList = document.querySelector('#input-add-list');
const buttonAddList = document.querySelector('#button-add-list');
const listField = document.querySelector('.list-field');

let storeData = [];

buttonAddList.addEventListener('click', function () {
  if (inputAddList.value !== "") {
    storeData.push({
      id: Date.now(),
      text: inputAddList.value,
      isFinished: false
    })
  
    inputAddList.value = "";
    saveData()
    renderList();
  } else {
    alert('silahkan isi nama list terlebih dahulu!');
  }
})

function renderList() {
  removeElement();
  storeData.forEach(element => {
    const list = document.createElement('div');
    const textList = document.createElement('div');
    const buttonList = document.createElement('div');
    const buttonFinishtList = document.createElement('button');
    const buttonDeleteList = document.createElement('button');
    const checkIcon = document.createElement('i');
    const deleteIcon = document.createElement('i');

    list.className = 'list';
    textList.className = 'text-list';
    buttonList.className = 'button-list';
    buttonFinishtList.className = 'button-finish-list';
    buttonDeleteList.className = 'button-delete-list';
    checkIcon.className = 'fa-solid fa-check';
    deleteIcon.className = 'fa-solid fa-trash';

    textList.textContent = element.text;

    listField.appendChild(list);
    list.appendChild(textList);
    list.appendChild(buttonList);
    buttonList.appendChild(buttonFinishtList);
    buttonList.appendChild(buttonDeleteList);
    buttonFinishtList.appendChild(checkIcon);
    buttonDeleteList.appendChild(deleteIcon);

    if (element.isFinished === true) {
      list.style.background = '#38E54D';
      textList.style.color = '#FFFAFA';
      buttonFinishtList.style.background = '#ff9900';
      checkIcon.className = 'fa-solid fa-xmark';
    }
    
    buttonDeleteList.onclick = () => deleteList(element.id);
    buttonFinishtList.onclick = () => {
      if (element.isFinished === false) {
        element.isFinished = true;
        list.style.background = '#38E54D';
        textList.style.color = '#FFFAFA';
        buttonFinishtList.style.background = '#ff9900';
        checkIcon.className = 'fa-solid fa-xmark';
      } else {
        element.isFinished = false;
        list.style.background = '#FFFAFA';
        textList.style.color = '#111827';
        buttonFinishtList.style.background = '#38E54D';
        checkIcon.className = 'fa-solid fa-check';
      }

      saveData();
    }
  })

}

function removeElement() {
  while(listField.hasChildNodes()) {
    listField.removeChild(listField.firstChild);
  }
}

function deleteList(id) {
  storeData = storeData.filter(element => element.id !== id);
  saveData();
  renderList();
}

function saveData() {
  localStorage.setItem('LIST', JSON.stringify(storeData));
  getData();
  renderList();
}

function getData() {
  storeData = JSON.parse(localStorage.getItem('LIST'));
}

if(localStorage.getItem('LIST') !== null) {
  getData();
  renderList();
}