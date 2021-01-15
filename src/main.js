window.addEventListener("DOMContentLoaded", function () {
  let card;
  let getPoster;
  let titleChange
  let yearChange
  let countryChange
  let ganreChange
  let actorsChange
  let actorsChange2
  let dscChange
  let posterChange
  let storeF
  let storeComm
  let arrayFilms = [];



  const addFilm = document.querySelector(".add__films"),
    formNewFilm = document.querySelector(".add__card__film"),
    mainContainer = document.querySelector(".container"),
    commentsView = document.querySelector('.all__comment')

  /////buttons
  const add = document.querySelector(".btn__add"),
    deleteBut = document.querySelector(".btn__delete"),
    addChange = document.querySelector(".btn__edit__film"),
    canselBut = document.querySelector(".btn__cansel");
  ///////value
  const allForms = document.querySelector(".block__add");
  const titleForm = document.querySelector(".title__val");
  const yearForm = document.querySelector(".year");
  const countryForm = document.querySelector(".country");
  const genreForm = document.querySelector(".genre");
  const posterForm = document.querySelector(".poster");
  const actorsForm = document.querySelector(".actors");
  const descForm = document.querySelector(".desc");



  function togle() {
    formNewFilm.style.display = formNewFilm.style.display == "none" ? "block" : "none";
    !addFilm.classList.contains("active") ? addFilm.classList.add("active") : addFilm.classList.remove("active");
    !addFilm.classList.contains("opacity") ? addFilm.classList.add("opacity") : addFilm.classList.remove("opacity");
    if (formNewFilm.style.display == "block") {addChange.style.display = "none"; add.style.display = "block";}
    allForms.reset();
  }

  function changeImg() {
    if(formNewFilm.style.display == "block" ){
      addFilm.classList.remove("active")
      addFilm.classList.remove("opacity")
    }
    if(formNewFilm.style.display == "none"){
      addFilm.classList.add("active")
      addFilm.classList.add("opacity")
    }
    
    
    // !addFilm.classList.contains("active") ? addFilm.classList.add("active") : addFilm.classList.remove("active");
    // !addFilm.classList.contains("opacity") ? addFilm.classList.add("opacity") : addFilm.classList.remove("opacity");
  }

  function ScrollUp() {
    let t, s;
    s = document.body.scrollTop || window.pageYOffset;
    t = setInterval(function () {
      if (s > 0) window.scroll(0, (s -= 10));
      else clearInterval(t);
    }, 5);
  }

  function handleCansel(e) {
    changeImg()
    e.preventDefault();
    formNewFilm.style.display = "none";
  };


  
  function getRandomID() {
    let int = `f${(~~(Math.random() * 1e8)).toString(16)}-`;
    return int.toString(36);
  }
  let id = getRandomID(0, 1679615);




////////////////delete film
  function deleteCardFilm(e) {
    e.preventDefault();
    if (e.target.classList.contains("btn__delete")) {
      arrayFilms = arrayFilms.filter(el => {
        return el.id !== e.target.dataset.id
      })

      store()
      mainContainer.innerHTML = ''
      saveCardFilms()
    }
  }

/////////////edit
  function editCardFilm(e) {
    e.preventDefault();
    if (e.target.classList.contains("btn__edit")) {
      changeImg()
      ScrollUp();
      formNewFilm.style.display = "block";
      if (formNewFilm.style.display == "block") {
        addChange.style.display = "block";
        add.style.display = "none";
      }

      card = e.target.parentElement;
      getPoster = e.target.parentElement.parentElement;

      titleChange = card.querySelector("h1")
      yearChange = card.querySelector(".dsc__year");
      countryChange = card.querySelector(".dsc__country");
      ganreChange = card.querySelector(".dsc__genre");
      actorsChange = card.querySelector(".dsc__actors");
      actorsChange2 = card.querySelector(".dsc__actors2");
      dscChange = card.querySelector(".dsc__film");
      posterChange = getPoster.querySelector(".img__poster");

      titleForm.value = titleChange.textContent
      yearForm.value = yearChange.textContent
      countryForm.value = countryChange.textContent
      genreForm.value = ganreChange.textContent
      actorsForm.value = actorsChange.textContent
      actorsForm.value = actorsChange2.textContent
      descForm.value = dscChange.textContent
      posterForm.value = posterChange.src

      arrayFilms = arrayFilms.map(el => {
        if (el.id == e.target.dataset.id) {
          storeF = el
        }
        return el
      })
    }
  }


  function addChangeFilm(e) {
    e.preventDefault();
    const err = /([^\s])/; 
    const yearErr = /^(19|20)\d{2}$/;
   
    if(err.test(titleForm.value) && yearErr.test(yearForm.value) && err.test(countryForm.value)
    && err.test(genreForm.value) && err.test(posterForm.value) && err.test(actorsForm.value)
     && err.test(descForm.value) ){
      storeF.title = titleForm.value;
      storeF.year = yearForm.value;
      storeF.country = countryForm.value;
      storeF.genre = genreForm.value;
      storeF.actors = actorsForm.value;
      storeF.desc = descForm.value;
      storeF.poster = posterForm.value;
  
      allForms.reset();
      store()
      mainContainer.innerHTML = ''
      saveCardFilms()
      formNewFilm.style.display = 'none'
      addFilm.classList.remove("active")
      addFilm.classList.remove("opacity")
      
    }else{
      alert("Для изменения необходимо правильно заполнить все формы")
    }
   
  }

  /////////////add new film
  function addCardFilm(e) {
    if (e) {
      e.preventDefault();
    }

    const err = /([^\s])/; 
    const yearErr = /^(19|20)\d{2}$/;
   
    if(err.test(titleForm.value) && yearErr.test(yearForm.value) && err.test(countryForm.value)
    && err.test(genreForm.value) && err.test(posterForm.value) && err.test(actorsForm.value)
     && err.test(descForm.value) ){
      let film = {
        title: titleForm.value,
        year: yearForm.value,
        country: countryForm.value,
        genre: genreForm.value,
        poster: posterForm.value,
        actors: actorsForm.value,
        desc: descForm.value,
        id: getRandomID(0, 1679615),
        comments: "",
        countComments: 0
      };
  
      arrayFilms.push(film);
      store()
      mainContainer.innerHTML = ""
      formNewFilm.style.display = 'none'
      addFilm.classList.remove("active")
      addFilm.classList.remove("opacity")
      saveCardFilms()
    }else{
        alert("Для добавления необходимо правильно заполнить все формы")
    }
  }

  function store() {
    localStorage.setItem('films', JSON.stringify(arrayFilms))
  }

  ////////render films
  function saveCardFilms() {
    
    arrayFilms = JSON.parse(localStorage.getItem('films'))
    if (arrayFilms) {
      mainContainer.innerHTML = ''

      arrayFilms.forEach((el, id) => {
        const element = document.createElement("div");
        element.classList.add("wrapper__film");
        element.innerHTML = `
          
              <div class="card__film">
                  <img class="img__poster" src="${el.poster}" alt="" />
                  <div class="card__descripton">
                  <h1>${el.title}</h1>
                  <p class="dsc__film">
                  ${el.desc.substr(0, 100)}...
                  </p>
                  <div class="dsc__block">
                      <p class="dsc__name">Country</p>
                      <div class="wrapp">
                          <p class="dsc__text dsc__country">${el.country}</p>
                      </div>
                      
                  </div>
                  <div class="dsc__block">
                      <p class="dsc__name">Year</p>
                      <div class="wrapp"> <p class="dsc__text dsc__year">${el.year}</p></div>
                      
                  </div>
                  <div class="dsc__block">
                      <p class="dsc__name">genre</p>
                      <div class="wrapp"> <p class="dsc__text dsc__genre">${el.genre}</p></div>
                      
                  </div>
                  <div class="dsc__block width__custom">
                      <p class="dsc__name">actors</p>
                      <p class="dsc__text  wrapp__custom">
                          <span class="desktop dsc__actors">${el.actors.substr(0, 13)}...</span>
                          <span class="mobile dsc__actors2">${el.actors}</span>
                      </p>
                  </div>
                  <button data-id=${el.id} class="btn__delete mt-10 btn">Delete</button>
                  <button data-id=${el.id} class="btn__edit mt-10 btn">Edit</button>
                  </div>
              </div>
              <div class="comments__block">
                  <div class="d-flex-m all__comment">
                  <p data-id=${el.id} class="comments__count">Comments: <span class="count">${el.countComments}</span> </p>
                  <img class="show arrow_show" src="./img/ar-u.png" alt="" />
                  <img class="hide arrow_hide" src="./img/d.png" alt="" />
                  </div>
                  <div class="comments">
                  <div class="newcomm"> ${el.comments}</div>
                  
                  <textarea
                  class="textarea"
                  placeholder="Add your comment"
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  ></textarea>
                  <button class="btn btn__add add__comm mb">Add</button>
                  </div>
              </div>
              `;

        mainContainer.append(element);
        allForms.reset();
      });
    }
  }

  function renderInitial() {
    arrayFilms = arrayFilms || [{
      title: "Martian",
      year: "2016",
      country: "USA",
      genre: "Fantasy",
      poster: "./img/Layer 9.png",
      actors: "Aksel Hennie, Chiwetel Ejiofor, Jeff Daniels, Jessica Chastain, Kate Mara, Kristen Wiig, Matt Damon, Michael Peña, Sean Bean, Sebastian Stan",
      desc: " Mars mission Ares-2 in the process was forced to urgently leave the planet because of the impending sandstorm. Engineer and Biolog mark Watney suffered an injury suit during a sand storm. The mission,considering him dead...",
      id: getRandomID(0, 1679615),
      comments: " <div class='border'></div> <p class='comment'>Test comment 1</p> <div class='border'></div> <p class='comment'>Test comment 1</p>  <div class='border'></div> <p class='comment'>Test comment 1</p>",
      countComments: 3
    }]
  }


///////////comments
  function openComments(e) {
    if (e.target.classList.contains('comments__count') || e.target.classList.contains('arrow_show') || e.target.classList.contains('arrow_hide') ) {
      const ev = e.target.parentElement.nextElementSibling

      if (ev.style.display == 'block') {
        ev.style.display = 'none'
      } else {
        ev.style.display = 'block'
      }

      if(ev.style.display == 'block'){
        ev.parentElement.querySelector('.arrow_show').style.display = 'none'
        ev.parentElement.querySelector('.arrow_hide').style.display = 'block'
      }else{
        ev.parentElement.querySelector('.arrow_show').style.display = 'block'
        ev.parentElement.querySelector('.arrow_hide').style.display = 'none'
      }

      arrayFilms = arrayFilms.map(el => {
        if (el.id == e.target.dataset.id) {
          storeComm = el
        }
        return el
      })
    }
  }

  function buttonAddComm(e) {
    if (e.target.classList.contains('add__comm')) {
      const ev = e.target
      const textareaVal = ev.previousElementSibling
      let blockcomms = ev.parentElement

      blockcomms = blockcomms.querySelector('.newcomm')
      const elComment = document.createElement("p");
      const elBorder = document.createElement("div");

      elComment.classList.add('comment')
      elBorder.classList.add('border')

      if (textareaVal.value.length > 1 && textareaVal.value !== " ") {
        elComment.innerHTML = textareaVal.value

        blockcomms.prepend(elComment)
        blockcomms.prepend(elBorder)

        textareaVal.value = ""

        let count = e.target.parentElement.previousElementSibling.querySelector(".count")
        count.textContent++

        storeComm.countComments = count.textContent++
        storeComm.comments = blockcomms.innerHTML

        store()
        mainContainer.innerHTML = ""
        saveCardFilms()

      }
    }

  }


  saveCardFilms()
  renderInitial()
  addFilm.addEventListener("click", togle);
  add.addEventListener("click", addCardFilm);
  mainContainer.addEventListener("click", deleteCardFilm);
  mainContainer.addEventListener("click", editCardFilm);
  addChange.addEventListener("click", addChangeFilm);
  canselBut.addEventListener("click", handleCansel);
  mainContainer.addEventListener("click", openComments);
  mainContainer.addEventListener("click", buttonAddComm);

  
  if(!JSON.parse(localStorage.getItem('films'))){
    let a =  document.querySelector('.btn__onecklick').click()    
  }
  
});
