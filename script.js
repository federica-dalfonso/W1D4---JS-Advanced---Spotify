
window.onload = () => {
    // salvo le query di ricerca:
    let queries = ["eminem", "metallica", "queen",];
    // fetch per dati:
    for (let artist of queries) {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
    .then((response) => response.json())
    .then((json) => {
        let section = document.getElementById(`${artist}`);
        section.classList.toggle("d-none");

        let sectionRow = document.getElementById(`${artist}Section`);

        let album = json.data.slice(0, 4); // anche ordine random con randomAlbum(), però dà problemi con il modale 
        for (let a = 0; a < album.length; a++) {
            sectionRow.appendChild(createCard(album[a]));
        }
        // styling per player fixed bottom che si sovrappone
        let setMargin = document.querySelector(".container-fluid").classList.add("mb-5"); 
        // console.log(json.data)
    } )
    .catch((err) => console.log("Error detected: ", err) );
}
}

// funzione album random, da richiamare al posto del metodo slice;
// function randomAlbum (array, n) {
//     let result = [];
//     for (let i = 0; i < n; i++) {
//         let showRandom = Math.floor(Math.random() * array.length);
//         result.push(array[showRandom]);
//         array.splice(showRandom, 1);
//     }
//     return result;
// }

// funzione che crea le cards:
function createCard (album) {
    let col = document.createElement("div");
    col.classList.add("col", "g-2");

    let card = document.createElement("div");
    card.classList.add("card", "bg-transparent");

    let cardImg = document.createElement("img");
    cardImg.classList.add("card-img-top", "img-fluid", "w-100", "p-1"); 
    cardImg.src = album.album.cover_big;   

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "p-2");    

    let cardTitle = document.createElement("p");
    cardTitle.classList.add("card-title", "h6");
    cardTitle.innerText = album.title;

    let cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer", "p-2", "border-0", "bg-transparent");

    let cardArtist = document.createElement("p");
    cardArtist.classList.add("card-text", "font-weight-normal");
    cardArtist.innerText = album.artist.name;

    cardBody.appendChild(cardTitle);
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    cardFooter.appendChild(cardArtist);
    col.appendChild(card);
    return card;
}

// SEARCH:
function search() {
    let inputText = document.getElementById("searchField").value;
    let sectionRow = document.querySelectorAll("#eminem, #metallica, #queen");
    for (row of sectionRow) {
        row.innerHTML = ""; 
    };
    let searchResult = document.getElementById("searchResults");
    searchResult.style.display = "block";

    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${inputText}`)
    .then((response) => response.json())
    .then((json) => {
            let album = json.data.slice(0, 4);
            let newSection = document.querySelector("#searchResults div.row");
            //rimuovo vecchi risultati:
            newSection.innerHTML = "";
            for (let a = 0; a < album.length; a++) {
                newSection.appendChild(createCard(album[a]));
                };
            trackList(album);
      })
      .catch((err) => console.log("Error detected: ", err));
}               


// funzione che crea il pulsante e la lista canzoni: 
function trackList(album) {
    // controllo che il modale non esista, per crearlo: 
    let modal = document.getElementById('listModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.classList.add('modal', 'fade');
      modal.setAttribute('id', 'listModal');
      modal.setAttribute('data-backdrop', 'static');
      modal.setAttribute('data-keyboard', 'false');
      modal.setAttribute('tabindex', '1');
      modal.setAttribute('aria-labelledby', 'listModalLabel');
      modal.setAttribute('aria-hidden', 'true');
  
      let modalDiv = document.createElement('div');
      modalDiv.classList.add('modal-dialog');
      let modalDivTwo = document.createElement('div');
      modalDivTwo.classList.add('modal-content');
      let modalDivThree = document.createElement('div');
      modalDivThree.classList.add('modal-header');
      let modalText = document.createElement('h6');
      modalText.classList.add('modal-title');
      modalText.setAttribute('id', 'listModalLabel');
      modalText.innerText = "Here's your tracks:";
  
      let modalBody = document.createElement('div');
      modalBody.classList.add('modal-body');
  
      let modalFooter = document.createElement('div');
      modalFooter.classList.add('modal-footer', 'm-0');
      let closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.classList.add('btn', 'btn-danger');
      closeBtn.setAttribute('data-dismiss', 'modal');
      closeBtn.innerText = "Let's Rock!";
  
      modalDivThree.appendChild(modalText);
      modalDivTwo.appendChild(modalDivThree);
      modalDivTwo.appendChild(modalBody);
      modalFooter.appendChild(closeBtn);
      modalDivTwo.appendChild(modalFooter);
      modalDiv.appendChild(modalDivTwo);
      modal.appendChild(modalDiv);
      document.body.appendChild(modal);
  
      //tracklist btn in navbar:
      let listParent = document.querySelector('div.navbar-nav ul');
      let listChild = document.createElement('li');
  
      let listBtn = document.createElement('button');
      listBtn.type = 'button';
      listBtn.classList.add('btn', 'tracklist-btn');
      listBtn.setAttribute('data-toggle', 'modal');
      listBtn.setAttribute('data-target', '#listModal');
      listBtn.innerText = 'Create Tracklist';
      listChild.appendChild(listBtn);
      listChild.appendChild(listBtn);
      listParent.appendChild(listChild);
    }
  
    let modalBody = modal.querySelector('.modal-body');
    //svuoto:
    modalBody.innerHTML = '';
    let modalBodyUl = document.createElement('ul');
    for (let track of album) {
      let modalBodyList = document.createElement('li');
      modalBodyList.innerText = track.title;
      modalBodyUl.appendChild(modalBodyList);
    }
    modalBody.appendChild(modalBodyUl);
  }
  