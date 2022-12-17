// // !deklarasi variabel
// const inputAddList = document.querySelector('#input-add-list');
// const buttonAddList = document.querySelector('#button-add-list');


// // !menambahkan event ke button untuk menambahkan list
// buttonAddList.addEventListener('click', function() {
//   if (inputAddList.value.length === 0) {
//     alert('silahkan isi nama list terlebih dahulu');
//   } else {
//     let notes = localStorage.getItem('LIST');

//     if (notes === null) {
//       lists = [];
//     } else {
//       lists = JSON.parse(notes);
//     }

//     let myObj = {
//       listName: inputAddList.value,
//       isFinished: false
//     }

//     lists.unshift(myObj);

//     localStorage.setItem('LIST', JSON.stringify(lists));

//     inputAddList.value = "";

//     renderList();

//   }

// })

// // !membuat function untuk menampilkan list
// function renderList() {
//   let notes = localStorage.getItem('LIST');

//     if (notes === null) {
//       lists = [];
//     } else {
//       lists = JSON.parse(notes);
//     }

//     let templeteHTML = "";

//     lists.forEach((element, index) => {
//       templeteHTML += ` <div class="list" id="list${index}">
//       <div class="text-list">${element.listName}</div>
//       <div class="button-list">
//         <button type="button" class="button-finish-list" onclick="finishedList(${index})">
//           <i class="fa-solid fa-check"></i>
//         </button>
//         <button type="button" class="button-delete-list" onclick="deleteList(${index})">
//           <i class="fa-solid fa-trash"></i>
//         </button>
//       </div>
//     </div>`;

//     if (element.isFinished == true) {
//       document.querySelector().style.background = 'green';
//     }
//     });



//     const listField = document.querySelector('.list-field');

//     if (lists.length !== 0) {
//       listField.innerHTML = templeteHTML;
//     } else {
//       listField.innerHTML = "";
//     }
// }

// renderList();

// // !membuat functin untuk menghapus list
// function deleteList(index) {
//   let notes = localStorage.getItem('LIST');

//   if (notes === null) {
//     lists = [];
//   } else {
//     lists = JSON.parse(notes);
//   }

//   lists.splice(index, 1);
//   localStorage.setItem('LIST', JSON.stringify(lists));

//   renderList();
// }

// // !membuat function untuk list yang sudah beres
// function finishedList(index) {
//   let notes = localStorage.getItem('LIST');

//   if (notes === null) {
//     lists = [];
//   } else {
//     lists = JSON.parse(notes);
//   }

//   if (lists[index].isFinished == false) {
//     lists[index].isFinished = true;
//     document.querySelector(`#list${index}`).style.background = 'green';
//   } else {
//     lists[index].isFinished = false;
//     document.getElementById(`list${index}`).style.background = "#FFFAFA";
//   }

//   localStorage.setItem('LIST', JSON.stringify(lists));

// }

const inputAddList = document.querySelector('#input-add-list');
const buttonAddList = document.querySelector('#button-add-list');
const listField = document.querySelector('.list-field');

let storeData = [];

buttonAddList.addEventListener('click', function () {
  let lists = localStorage.getItem('LIST');

  if (lists === null) {
    storeData = []
  } else {
    storeData = JSON.parse(lists);
  }

  renderList();
  inputAddList.value = "";
})

function renderList() {
  console.log('hallo')
  if (inputAddList.value.length === 0) {
    alert('Silahkan isi nama list terlebih dahulu!');
  } else {
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

      textList.textContent = inputAddList.value;

      listField.appendChild(list);
      list.appendChild(textList);
      list.appendChild(buttonList);
      buttonList.appendChild(buttonFinishtList);
      buttonList.appendChild(buttonDeleteList);
      buttonFinishtList.appendChild(checkIcon);
      buttonDeleteList.appendChild(deleteIcon);

    })

  }
}