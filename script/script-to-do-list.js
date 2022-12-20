// !deklarasi variabel
const inputAddList = document.querySelector('#input-add-list');
const buttonAddList = document.querySelector('#button-add-list');
const listField = document.querySelector('.list-field');
const alert = document.querySelector('.alert');
const buttonCLoseAlert = document.querySelector('.button-alert');

// !membuat variabel untuk menampung data list
let storeData = [];

// !memberi event click ke tombol tambah list
buttonAddList.addEventListener('click', function () {
  if (inputAddList.value !== "") { // !mengecek apakah user mengisi nama list atau tidak
    storeData.push({ // !memasukkan data list ke variabel storeData
      id: Date.now(), // !mengeset id list
      text: inputAddList.value, // !mengeset nama list
      isFinished: false // !mengeset apakah list sudah ditandai selesaei atau belum
    })
  
    inputAddList.value = ""; // !mereset input list
    saveData() // !menyimpan data list ke local storage
    renderList(); // !menampilkan list
  } else { // !ketika user tidak memasukkan nama list
    alert.classList.add('show'); // !tampilkan pesan alert
  }
})

buttonCLoseAlert.addEventListener('click', () => alert.classList.remove('show')) // !menyembunyikan pesan alert

// !membuat function utnuk menampilkan list
function renderList() {
  removeElement(); // !menghapus element pertama ketika menambahkan list yang selanjutnya
  storeData.forEach(element => {
    // !membuat element untuk list
    const list = document.createElement('div');
    const textList = document.createElement('div');
    const buttonList = document.createElement('div');
    const buttonFinishtList = document.createElement('button');
    const buttonDeleteList = document.createElement('button');
    const checkIcon = document.createElement('i');
    const deleteIcon = document.createElement('i');

    // !mengatur class dari element
    list.className = 'list';
    textList.className = 'text-list';
    buttonList.className = 'button-list';
    buttonFinishtList.className = 'button-finish-list';
    buttonDeleteList.className = 'button-delete-list';
    checkIcon.className = 'fa-solid fa-check';
    deleteIcon.className = 'fa-solid fa-trash';

    // !mengeset nama list 
    textList.textContent = element.text;

    // !menggabungkan element
    listField.appendChild(list);
    list.appendChild(textList);
    list.appendChild(buttonList);
    buttonList.appendChild(buttonFinishtList);
    buttonList.appendChild(buttonDeleteList);
    buttonFinishtList.appendChild(checkIcon);
    buttonDeleteList.appendChild(deleteIcon);

    // !mengubah tampilan list ketika data isFinished true
    if (element.isFinished === true) {
      list.style.background = '#38E54D';
      textList.style.color = '#FFFAFA';
      buttonFinishtList.style.background = '#ff9900';
      checkIcon.className = 'fa-solid fa-xmark';
    }
    
    // !menambahkan onclick ketika button delete di klik
    buttonDeleteList.onclick = () => deleteList(element.id);
    buttonFinishtList.onclick = () => { // !mengecek ketika button finish diklik
      if (element.isFinished === false) {
        element.isFinished = true; // !rubah data isFinished menjadi true

        // !ubah tampilan list
        list.style.background = '#38E54D';
        textList.style.color = '#FFFAFA';
        buttonFinishtList.style.background = '#ff9900';
        checkIcon.className = 'fa-solid fa-xmark';
      } else { // !ketika button finish dklik lagi dan data isFinished sedang true
        element.isFinished = false; // !kembalikan data isFinished menjadi false

        // !kembalikan tampilan list
        list.style.background = '#FFFAFA';
        textList.style.color = '#111827';
        buttonFinishtList.style.background = '#38E54D';
        checkIcon.className = 'fa-solid fa-check';
      }

      // !membamnggil function untuk menyimpan data ke local storage
      saveData();
    }
  })

}

// !membuat function untuk menghapus element list yang pertama pada saat menamabhkan list lagi
function removeElement() {
  while(listField.hasChildNodes()) {
    listField.removeChild(listField.firstChild);
  }
}

// !membuat function untuk men delete element
function deleteList(id) {
  storeData = storeData.filter(element => element.id !== id); // !filter data dengan ketentuan element list yang tidak sama dengan id list yang di klik
  saveData();  // !memanggil function untuk menyimpan data ke local storage
  renderList(); // !memanggil function untuk menampilkan list
}

// !membuat function untuk menyimpan data list ke local storage
function saveData() {
  localStorage.setItem('LIST', JSON.stringify(storeData));
  getData(); // !memanggil function untuk mengambil data dari local storage
  renderList(); // !memanggil function untuk menampilkan list
}

// !membuat function untuk mengambil data dari local storage
function getData() {
  storeData = JSON.parse(localStorage.getItem('LIST'));
}

// !mengecek apakah ada data list di local storage, jika ada tampilkan list tersebut
if(localStorage.getItem('LIST') !== null) {
  getData();
  renderList();
}