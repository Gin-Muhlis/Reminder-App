// !deklarasi variabel
const inputAddList = document.querySelector('#input-add-list');
const buttonAddList = document.querySelector('#button-add-list');


// !menambahkan event ke button untuk menambahkan list
buttonAddList.addEventListener('click', function() {
  if (inputAddList.value.length === 0) {
    alert('silahkan isi nama list terlebih dahulu');
  } else {
    let notes = localStorage.getItem('LIST');
  
    if (notes === null) {
      lists = [];
    } else {
      lists = JSON.parse(notes);
    }

    let myObj = {
      listName: inputAddList.value,
      isFinished: false
    }

    lists.unshift(myObj);

    localStorage.setItem('LIST', JSON.stringify(lists));

    inputAddList.value = "";

    renderList();
  }

})

// !membuat function untuk menampilkan list
function renderList() {
  let notes = localStorage.getItem('LIST');
  
    if (notes === null) {
      lists = [];
    } else {
      lists = JSON.parse(notes);
    }

    let templeteHTML = "";

    lists.forEach((element, index) => {
      templeteHTML += ` <div class="list" id="list${index}">
      <div class="text-list">${element.listName}</div>
      <div class="button-list">
        <button type="button" class="button-finish-list" onclick="finishedList(${index}, ${element.isFinished})">
          <i class="fa-solid fa-check"></i>
        </button>
        <button type="button" class="button-delete-list" onclick="deleteList(${index})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>`;
    });

    const listField = document.querySelector('.list-field');

    if (lists.length !== 0) {
      listField.innerHTML = templeteHTML;
    } else {
      listField.innerHTML = "";
    }
}

renderList();

// !membuat functin untuk menghapus list
function deleteList(index) {
  let notes = localStorage.getItem('LIST');
  
  if (notes === null) {
    lists = [];
  } else {
    lists = JSON.parse(notes);
  }

  lists.splice(index, 1);
  localStorage.setItem('LIST', JSON.stringify(lists));

  renderList();
}

// !membuat function untuk list yang sudah beres
function finishedList(index, isFinished) {
  let notes = localStorage.getItem('LIST');
  
  if (notes === null) {
    lists = [];
  } else {
    lists = JSON.parse(notes);
  }

  if (isFinished) {
    lists[index].isFinished = false;
    localStorage.setItem('LIST', JSON.stringify(lists));
    renderList();
  } else {
    lists[index].isFinished = true;
    localStorage.setItem('LIST', JSON.stringify(lists));
    renderList();
  }

  renderList();

  if (lists[index].isFinished) {
    document.getElementById(`list${index}`).classList.add('finish');
  } else {
    document.getElementById(`list${index}`).classList.remove('finish');
  }

}