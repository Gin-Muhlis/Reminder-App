// !deklarasi variabel
const addButtonPopupAdd = document.querySelector("#addNote");
const addTitle = document.querySelector('#titleNotes');
const addText = document.querySelector('#contentNotes');
const addPopup = document.querySelector(".pop-up");
const addButtonNote = document.querySelector('#tambah')
const closeButtonPopupAdd = document.querySelector('#batal');
const alertTextAdd = document.querySelector('.form .alert');
const popupDelete = document.querySelector('.pop-up-delete');
const closeButtonPopupDelete = document.querySelector('#batal-delete');
const deleteButtonNote = document.querySelector('#delete');

addButtonPopupAdd.addEventListener('click', () => {
  addPopup.classList.add('show'); // !menampilkan popup untuk menambahkan note
  closeButtonPopupAdd.classList.add('available');
  addButtonNote.textContent = 'Tambah';
})

closeButtonPopupAdd.addEventListener('click', () => {
  addPopup.classList.remove('show'); // !menyembunyikan popup untuk menambahkan note
})

closeButtonPopupDelete.addEventListener('click', function() {
  popupDelete.classList.remove('show'); // !menyembunyikan popup untuk mendelete note
})


addButtonNote.addEventListener('click', () => {
  let notes = localStorage.getItem('NOTES'); // !mengambil data dari local storage


  if (addTitle.value.length === 0 || addText.value.length === "") { // !mengecek jika user tidak mengisi judul atau isi note
    alertTextAdd.style.opacity = 1; // !tampilkan pesan peringatan untuk mengisi judul dan isi note

    setTimeout(() => {
      alertTextAdd.style.opacity = 0; // !hilangkan kembali pesan peringatan setelah 5 detik
    }, 5000);
  } else {

    if (notes === null) { // !mengecek apakah ada data atau tidak di local storage
      noteObj = []; // !jika tidak ada kembalikan array kosong di noteObj
    } else {
      noteObj = JSON.parse(notes); // !Jika ada kembalikan datanya dalanya dengan mengubah datanya dari string menjadi object
    }

    let myObj = { // !membuat object untuk menyimpan data judul dan isi note
      title: addTitle.value,
      text: addText.value,
      bgColor: randomColor()
    }

    noteObj.unshift(myObj); // !menyimpan data setiap note didalam array

    localStorage.setItem('NOTES', JSON.stringify(noteObj)); // !mengirim data setiap note dalam bentuk string

    addTitle.value = ""; // !mereset input field dengan string kosong
    addText.value = ""; // !mereset input field dengan string kosong

    addPopup.classList.remove('show'); // !menyembunyikan pop up menambahkan note

    renderNotes(); // !memanggil functin untuk menampilkan note

  }

})

// !membuat function untuk menampilkan notes
function renderNotes() {
  let notes = localStorage.getItem('NOTES'); // !mengambil data dari local storage 

  if (notes === null) { // !mengecek apakah ada data atau tidak di local storage
    noteObj = []; // !jika tidak ada kembalikan array kosong di noteObj
  } else {
    noteObj = JSON.parse(notes); // !Jika ada kembalikan datanya dalanya dengan mengubah datanya dari string menjadi object
  }

  let templeteHTML = "";

  noteObj.forEach((element, index) => {
    templeteHTML += `<div class="col" style="background: ${element.bgColor};">
      <div class="content">
        <div class="notes-title" id="title${index}">${element.title}</div>
        <div class="notes-content" id="content${index}">${element.text}</div>
      </div>
      <div class="bottom-note">
        <div class="date">
          ${dateNow()}
        </div>
        <div class="button">
          <div class="deleteField" id="${index}" onclick="deleteNote(this.id)">
          <i class="fa-solid fa-trash"></i>
          </div>
          <span class="edit" id="${index}" onclick="editNote(this.id)">
            <i class="fa-solid fa-pen"></i>
          </span>
        </div>
      </div>
    </div>`
  });

  let rowElement = document.querySelector('.row');
  if (noteObj.length != 0) {
    rowElement.innerHTML = templeteHTML;
  } else {
    rowElement.innerHTML = "";
  }
}

// !membuat function untuk mengedit note
function editNote(index) {
  let notes = localStorage.getItem('NOTES'); // !mengambil data dari local storage 

  closeButtonPopupAdd.classList.remove('available');
  addButtonNote.textContent = 'Edit';
  addPopup.classList.add('show');

  if (notes === null) { // !mengecek apakah ada data atau tidak di local storage
    noteObj = []; // !jika tidak ada kembalikan array kosong di noteObj
  } else {
    noteObj = JSON.parse(notes); // !Jika ada kembalikan datanya dalanya dengan mengubah datanya dari string menjadi object
  }

  addTitle.value = noteObj[index].title;
  addText.value = noteObj[index].text;

  noteObj.splice(index, 1);
  localStorage.setItem("NOTES", JSON.stringify(noteObj));

  renderNotes();

}

// !membuat function untuk menghapus note
function deleteNote(index) {
  popupDelete.classList.add('show');

  deleteButtonNote.addEventListener('click', function() {
    let notes = localStorage.getItem('NOTES'); // !mengambil data dari local storage 
  
    if (notes === null) { // !mengecek apakah ada data atau tidak di local storage
      noteObj = []; // !jika tidak ada kembalikan array kosong di noteObj
    } else {
      noteObj = JSON.parse(notes); // !Jika ada kembalikan datanya dalanya dengan mengubah datanya dari string menjadi object
    }
  
  
  
    noteObj.splice(index, 1);
    localStorage.setItem("NOTES", JSON.stringify(noteObj));
  
    renderNotes();

    popupDelete.classList.remove('show');

  })
}

// !membuat function untuk merandom warna background note
function randomColor() {
  let randomNumber = Math.floor(Math.random() * 10);
  let colors = ['FAEAB1', 'D09CFA', 'E6DDC4', '97DECE', 'FFCAC8', 'FCF9BE', 'FFADBC', 'BA94D1', 'B6E2A1', 'CFB997'];

  let bgColor = `#${colors[randomNumber]}`;

  return bgColor;
}

// !membuat function untuk mencetak tanggal sekarang
function dateNow() {
  let now = new Date;
  let date = now.getDate();
  let monthNumber = now.getMonth();
  let year = now.getFullYear();
  let monthText = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  return `${date} ${monthText[monthNumber]} ${year}`;
}

renderNotes();