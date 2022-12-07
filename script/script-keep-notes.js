// !declare variable
let regularStar = '<i class="fa-regular fa-star"></i>';
let stared = false;


// !show pop up for add notes
document.querySelector('#addNote').onclick = function() {
  document.querySelector('.pop-up').classList.add('show');
}

// !hide pop up for add notes
document.querySelector('#batal').onclick = function() {
  document.querySelector('.pop-up').classList.remove('show');
}

// !make a dinamis notes
document.querySelector('#tambah').onclick = function() {
  let judulNotes = document.querySelector('#titleNotes');
  let contentNotes = document.querySelector('#contentNotes');
  let date = new Date();
  let tanggal = date.getDate();
  let bulanNumber = date.getMonth();
  let tahun = date.getFullYear();
  let bulanTeks = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];


  document.querySelector('.notes .row').innerHTML += 
  ` <div class="col">
  <div class="content">
    <div class="notes-title">
      ${judulNotes.value};
    </div>
    <div class="notes-content">
      ${contentNotes.value};
    </div>
  </div>
  <div class="bottom-note">
    <div class="date">
      ${tanggal} ${bulanTeks[bulanNumber]} ${tahun};
    </div>
    <div class="button">
      <i class="fa-solid fa-star" id="star"></i>
      <span id="edit">
        <i class="fa-solid fa-pen"></i>
      </span>
    </div>
  </div>
</div>`

  document.querySelector('.pop-up').classList.remove('show');
  judulNotes.value = "";
  contentNotes.value = "";
}