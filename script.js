
// }


function setup() {
  // const allEpisodes = tvMaze();
  // makePageForEpisodes(allEpisodes)
  // let allEpisodes;
  fetch("https://api.tvmaze.com/shows/527/episodes")
    .then((response) => {
       
        console.log(response);
        return response.json();
      
    })
    .then((jsonResponse) => {
      // do whatever you want with the JSON response
      allEpisodes = jsonResponse;
      makePageForEpisodes(allEpisodes);
      console.log(allEpisodes);
    })
    .catch((error) => {
      // Handle the error
      console.log(error);
    });
};

function makePageForEpisodes(episodeList) {
 
  const rootElem = document.getElementById("root");

  const firsDiv = document.createElement('div');
  firsDiv.classList.add('container')

  let Display = document.getElementById("results");

  const container = document.createElement('div');
  container.classList.add('container')
  const row = document.createElement('div');
  row.classList.add('row')
  
  episodeList.forEach((episode) => {
    
    const movies = `${episode.name} - S0${episode.season}E0${episode.number}`;
    console.log(movies);

    const image = episode.image.medium;
    console.log(image);

    const summary = episode.summary.replace(/(<([^>]+)>)/gi, "");
    console.log(summary);
    const template = `<div class="grid text-center column-12 sm-column-6 md-column-4 lg-column-3">
    <div class="episodeDiv">
                <div class="title g-col-4">
                    <h5>${movies}</h5>
                </div>
                <div class="images g-col-4">
                    <img src=${image}>
                </div>
                <div class="summary g-col-4">
                    <p>${summary}</p>
                </div>
            </div> 
            </div>`;
    row.innerHTML = row.innerHTML + template;
   
  });
  
  rootElem.appendChild(row) 

  
  const options = document.createElement('option');
  options.classList.add('select')
  
  let episode = episodeList

  let searchName = [];
  let searchSummery = [];
  let displayCount = document.getElementById('results');
  displayCount.textContent = `Showing ${episode.length}`
  for (let i = 0; i < episode.length; i++) {
    let movies = `${episode[i].name} - S0${episode[i].season}E0${episode[i].number}`;

   
    searchName.push(episode[i].name);
    searchSummery.push(episode[i].summary)

    
    const image = episode[i].image['medium'];
    
    const summery = episode[i].summary.replace(/(<([^>]+)>)/gi, "");
   
    const rate = episode[i].rating.average;
    console.log(rate)

    
    const template = `<div class="column-12 sm-column-6 md-column-4 lg-column-3">
        <div class="episodeDiv">
                    <div class="title">
                        <h5>${movies}</h5>
                    </div>
                    <div class="images">
                        <img src=${image}>
                    </div>
                    <div class="summery">
                        <p>${summery}</p>
                    </div>
                     
                </div>
                </div>`;
    row.innerHTML = row.innerHTML + template;
   
  }
  rootElem.appendChild(row)

  document.getElementById('search-input').addEventListener('keyup', function (e) {

   
    let title = document.querySelectorAll('.title'),
      images = document.querySelectorAll('.images'),
      summery = document.querySelectorAll('.summery'),
      row = document.querySelectorAll('.column-12'),
      rate = document.querySelectorAll(".rating")
    
    let search_query = document.getElementById("search-input").value,
      countResults = episode.length;
   
    for (var i = 0; i < title.length; i++) {
     

      let checkTitle = title[i].innerText.toLowerCase().includes(search_query.toLowerCase());
      let checkSummery = summery[i].innerText.toLowerCase().includes(search_query.toLowerCase());


      console.log(typeof (checkSummery));
      if (checkTitle || checkSummery) {
        
        title[i].classList.remove("is-hidden");
        images[i].classList.remove("is-hidden");
        summery[i].classList.remove("is-hidden");
        rate[i].classList.remove("is-hidden");

        let howManyTitles = checkTitle.length;
        let howManySummery = checkSummery.length;
       
      } else {
       
        title[i].classList.add("is-hidden");
        images[i].classList.add("is-hidden");
        summery[i].classList.add("is-hidden");
        row[i].classList.add('is-hidden');
      }
    };


    e.preventDefault();
    
  });
 
  for (let i = 0; i < episode.length; i++) {
    let movies = `S0${episode[i].season}E0${episode[i].number} - ${episode[i].name}`;
    const option = document.createElement('option');
    const optionText = document.createTextNode(movies);
   
    option.classList.add('Options')
   
    option.appendChild(optionText);
   
    option.setAttribute('value', `${episode[i].name}`);
    const select = document.querySelector('#select-show');
    select.appendChild(option);
  };

  
  document.getElementById('select-show').addEventListener('change', (e) => {
    let title = document.querySelectorAll('.title'),
      images = document.querySelectorAll('.images'),
      summery = document.querySelectorAll('.summery'),
      row = document.querySelectorAll('.column-12'),
      rating = document.querySelectorAll(".is-hidden")

    console.log(e.target.value)
    for (var i = 0; i < title.length; i++) {
    
      if (title[i].innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
      
        title[i].classList.remove("is-hidden");
        images[i].classList.remove("is-hidden");
        summery[i].classList.remove("is-hidden");
       
      } else {
      
        title[i].classList.add("is-hidden");
        images[i].classList.add("is-hidden");
        summery[i].classList.add("is-hidden");
        row[i].classList.add('is-hidden');
      }
      if (e.target.value === 'All episodes') {
        location.reload();
      }
    }
    e.preventDefault();
  });

 
  function Onchange() {
    let value = document.getElementById('select-show').value;
    alert(`you have Selected: ${value}`)

    for (var i = 0; i < title.length; i++) {
     
      
      if (title[i] === value || summery[i] === value) {
       
        
        title[i].classList.remove("is-hidden");
        images[i].classList.remove("is-hidden");
        summery[i].classList.remove("is-hidden");
        title[i].classList.add("on-Screen");
        
      } else {
       
        title[i].classList.add("is-hidden");
        images[i].classList.add("is-hidden");
        summery[i].classList.add("is-hidden");
        row[i].classList.add('is-hidden');
      }
    };

  };

};
window.onload = setup;
