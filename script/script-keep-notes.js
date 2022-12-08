// !show pop up for add notes
document.querySelector('#addNote').onclick = function () {
  document.querySelector('.pop-up').classList.add('show');
}

// !hide pop up for add notes
document.querySelector('#batal').onclick = function () {
  document.querySelector('.pop-up').classList.remove('show');

  document.querySelector('#titleNotes').value = "";
  document.querySelector('#contentNotes').value = "";
  document.querySelector('.alert').style.opacity = 0;
}

// !make a dinamis notes
document.querySelector('#tambah').onclick = function () {
  addNote();
}

// !add note function
function addNote() {
  let judulNotes = document.querySelector('#titleNotes');
  let contentNotes = document.querySelector('#contentNotes');

  if (judulNotes.value.length == 0 || contentNotes.value.length == 0) {
    document.querySelector('.alert').style.opacity = 1;

    setTimeout(() => {
      document.querySelector('.alert').style.opacity = 0;
    }, 5000)
  } else {
    document.querySelector('.notes .row').innerHTML +=
      ` <div class="col" style="background: #${randomColor()};">
    <div class="content">
      <div class="notes-title">${judulNotes.value}</div>
      <div class="notes-content">${contentNotes.value}</div>
    </div>
    <div class="bottom-note">
      <div class="date">
        ${dateNow()}
      </div>
      <div class="button">
        <div class="starField">
          <i class="fa-regular fa-star star"></i>
        </div>
        <span class="edit">
          <i class="fa-solid fa-pen"></i>
        </span>
      </div>
    </div>
  </div>`

    // !hidden popup add notes
    document.querySelector('.pop-up').classList.remove('show');
    document.querySelector('.alert').style.opacity = 0;

    // !Reset field input
    judulNotes.value = "";
    contentNotes.value = "";

    // !starred notes
    starredNotes();

    // !edit notes
    editNote();

  }
}

// !edit note function 
function editNote() {
  let editButton = document.querySelectorAll('.edit');
    let titleNotesEdit = document.querySelectorAll('.notes-title');
    let contentNotesEdit = document.querySelectorAll('.notes-content');

    for (let i = 0; i < editButton.length; i++) {
      editButton[i].onclick = function() {
        let titleEdit = document.querySelector('#title-edit');
        let contentEdit = document.querySelector('#content-edit');

        document.querySelector('.pop-up-edit').classList.add('show');

        document.querySelector('#title-edit').value = titleNotesEdit[i].textContent;
        document.querySelector('#content-edit').value = contentNotesEdit[i].textContent;

        document.querySelector('#edit').onclick = function() {
        document.querySelector('.pop-up-edit').classList.remove('show');

        titleNotesEdit[i].textContent = titleEdit.value;
        contentNotesEdit[i].textContent = contentEdit.value;

        titleEdit.value = "";
        contentEdit.value = "";

        }
      }
    }
}

// !date function
function dateNow() {
  let date = new Date();
  let tanggal = date.getDate();
  let bulanNumber = date.getMonth();
  let tahun = date.getFullYear();
  let bulanTeks = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  return `${tanggal} ${bulanTeks[bulanNumber]} ${tahun}`;
}

// !starred note function
function starredNotes() {
  let starField = document.querySelectorAll('.starField');
  let star = document.querySelectorAll('.starField i');

  for (let i = 0; i < starField.length; i++) {
    starField[i].onclick = function () {
      
      if (this.classList.contains('starred')) {
        this.innerHTML = '<i class="fa-regular fa-star star"></i>'
        this.classList.remove('starred')
      } else {
        this.innerHTML = '<i class="fa-solid fa-star star starred"></i>';
        this.classList.add('starred')
      }
    }
  }

}

// !random color function
function randomColor() {
  let colors = ['FAEAB1', 'F8F988', 'E5B8F4', 'A5F1E9', 'C7BCA1', 'A4BE7B', 'BA94D1', 'CFF5E7', '8D72E1', 'B8E8FC'];
  let randomNumber = Math.floor(Math.random() * 10);
  let bgColor = colors[randomNumber]

  return bgColor;
}

