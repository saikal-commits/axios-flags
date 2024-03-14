const blocks = document.querySelector(".blocks");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const area = document.querySelector(".area");
const names = document.querySelector(".names");

let data = null;
const readAll = (all) => {
  console.log(all);
  blocks.innerHTML = "";
  all.map((el) => {
    blocks.innerHTML += `
    <div class="card">
    <img class="img1" src ="${el.flags.png}" alt="${el.flags.alt}"/>
    <img class="img2" src ="${el.coatOfArms.png}" alt=""/>
    <h2>${el.name.common}</h2>
    <h3>${el.capital}</h3>
    <h2>.....</h2>
    <h5>${el.altSpellings}</h5>
    <a target="_blank" href="${el.maps.googleMaps}">map</a>
    <ul class="tab">
    <li>Area - ${el.area} KM<sup>2</sup></li>
    <li>Region - ${el.region}</li>
    <li>Population - ${el.population}</li>  
    <li>Continents - ${el.continents}</li>  
    </ul>
    <button class=" button btn btn-danger">подробнее</button>
    </div>
    `;
  });
};

let getAll = () => {
  axios("https://restcountries.com/v3.1/all").then((res) => {
    res.data.sort((a, b) => {
      const nameA = a.name.common.toUpperCase();
      const nameB = b.name.common.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    readAll(res.data);
    data = res.data;
    console.log(res);
  });
};
getAll();

//populetion

population.addEventListener("change", (e) => {
  let tar = e.target.value;
  if (tar === "expensive") {
    result = data.sort((a, b) => {
      return a.population - b.population;
    });
    readAll(result);
  }
  if (tar === "cheap") {
    result = data.sort((a, b) => {
      return b.population - a.population;
    });
    readAll(result);
  }
});

// names.addEventListener("change", (e) => {
//   let tar = e.target.value;

//   if (tar === "expensive") {
//     result = data.sort((a, b) => {
//         const nameA = a.name.common
//         const nameB = b.name.common
//       if (nameA < nameB) {
//         return -1;
//       }
//     });
//     readAll(result);
//   }
//   if (tar === "cheap") {
//     result = data.sort((a, b) => {
//         const nameA = a.name.common
//         const nameB = b.name.common
//       if (nameA > nameB) {
//         return 1;
//       }
//     });
//     readAll(result);
//   }
// });

//area

area.addEventListener("change", (e) => {
  let tar = e.target.value;
  if (tar === "expensive") {
    result = data.sort((a, b) => {
      return a.area - b.area;
    });
    readAll(result);
  }
  if (tar === "cheap") {
    result = data.sort((a, b) => {
      return b.area - a.area;
    });
    readAll(result);
  }
});

//region

region.addEventListener("change", (e) => {
  let fil = e.target.value;
  if (fil === "Asia") {
    let res = data.filter((el) => el.region === "Asia");
    readAll(res);
  } else if (fil === "Africa") {
    let res = data.filter((el) => el.region === "Africa");
    readAll(res);
  } else if (fil === "Europe") {
    let res = data.filter((el) => el.region === "Europe");
    readAll(res);
  } else if (fil === "Americas") {
    let res = data.filter((el) => el.region === "Americas");
    readAll(res);
  }
});
