const AllRoute = [
  {
    title: "People",
    route: "people",
  },
  {
    title: "Starships",
    route: "starships",
  },
  {
    title: "Planets",
    route: "planets",
  },
  {
    title: "Films",
    route: "films",
  },
];

const $container = document.querySelector(".row");
const $prev = document.querySelector(".prev");
const $next = document.querySelector(".next");
const $allPages = document.querySelector(".allPages");
const $currentPage = document.querySelector(".currentPage");
const $buttons = document.querySelector(".buttons");
const $back = document.querySelector(".back");

const BASE_URL = "https://swapi.dev/api/";

let currentPage = 1;

function counterPage(n) {
  let all_Pages = Math.ceil(n / 10);
  return all_Pages;
}

window.addEventListener("load", () => {
  localStorage.clear();
  const card = AllRoute.map(({ title, route }) =>
    RouteTemplate(title, route)
  ).join("");
  $container.innerHTML = card;
  $buttons.classList.add("active");
  $back.classList.add("active");
});

window.addEventListener("load", () => {
  $currentPage.innerHTML = currentPage;
  $prev.setAttribute("disabled", true);
});

function getURL(url, query, cb) {
  fetch(`${url}?${query}`)
    .then((r) => r.json())
    .then((res) => cb(res));
}

function RouteTemplate(title, route) {
  return `
    <div class = "card" onclick="chooseTheme('${route}')">
        <h2>${title}</h2>
    </div>
  `;
}

function chooseTheme(route) {
  $buttons.classList.remove("active");
  localStorage.setItem("route", route);
  $back.style.display = "block";
  if (route === "people") {
    getURL(`${BASE_URL}/people`, `page=${currentPage}`, (cb) => {
      template(cb.results);
      localStorage.setItem("pageCount", cb.count);
      $allPages.innerHTML = counterPage(cb.count);
    });
  } else if (route === "starships") {
    getURL(`${BASE_URL}/starships`, `page=${currentPage}`, (cb) => {
      starshipsTemplate(cb.results);
      localStorage.setItem("pageCount", cb.count);
      $allPages.innerHTML = counterPage(cb.count);
    });
  } else if (route === "planets") {
    getURL(`${BASE_URL}/planets`, `page=${currentPage}`, (cb) => {
      planetsTemplate(cb.results);
      localStorage.setItem("pageCount", cb.count);
      $allPages.innerHTML = counterPage(cb.count);
    });
  } else if (route === "films") {
    getURL(`${BASE_URL}/films`, `page=${currentPage}`, (cb) => {
      filmsTemplate(cb.results);
      localStorage.setItem("pageCount", cb.count);
      $allPages.innerHTML = counterPage(cb.count);
    });
  }
}

function template(base) {
  const template = base
    .map((item) => {
      return card(item);
    })
    .join("");

  $container.innerHTML = template;
  $back.style.display = "block";
}

function card(item) {
  return `
    <div class="cards">
      <div class="card_header">
        <h1>${item.name}</h1>
      </div>
      <div class="card_body">
        <img src="https://www.giantfreakinrobot.com/wp-content/uploads/2021/04/star-wars-logo.jpg">
      </div>
      <div class="card_footer">
        <button class="card_btn" onclick="templateMore('${item.url}')">More</button>
      </div>
    </div>
`;
}

function templateMore(url) {
  getURL(url, "", (cb) => {
    cardMore(cb);
  });
}

function cardMore(cb) {
  $container.innerHTML = `
      <div class="cardMore">
        <div class="cardMore_header">
          <h1>${cb.name}</h1>
        </div>
        <div class="cardMore_body">
          <ul class="card_list">
            <li><span>birthday:</span> <span>${cb.birth_year}</span></li>
            <li><span>Gender:</span> <span>${cb.gender}</span></li>
            <li><span>Width:</span> <span>${cb.mass}</span></li>
            <li><span>Height:</span> <span>${cb.height}</span></li>
            <li><span>Hair:</span> <span>${cb.hair_color}</span> </li>
            <li><span>Eyes:</span> <span>${cb.eye_color} </span> </li>
            <li><span>Skin-color:</span> <span>${cb.skin_color} </span> </li>
          </ul>
        </div>
       
      </div>
    `;
}

function starshipsTemplate(arr) {
  const shipsCard = arr
    .map((item) => {
      return `
      <div class="cardMore">
        <div class="cardMore_header">
          <h1>${item.name}</h1>
        </div>
        <div class="cardMore_body">
          <ul class="card_list">
            <li><span>Model:</span> <span>${item.model}</span></li>
            <li><span>Length:</span> <span>${item.length}</span></li>
            <li><span>Max Atmosphere speed:</span> <span>${item.max_atmosphering_speed}</span></li>
            <li><span>Passengers:</span> <span>${item.passengers}</span> </li>
          </ul>
        </div>
      </div>
    `;
    })
    .join("");

  $container.innerHTML = shipsCard;
}

function planetsTemplate(arr) {
  const planetsCard = arr
    .map((item) => {
      return `
      <div class="cardMore">
        <div class="cardMore_header">
          <h1>${item.name}</h1>
        </div>
        <div class="cardMore_body">
          <ul class="card_list">
            <li><span>Rotation period:</span> <span>${item.rotation_period}</span></li>
            <li><span>orbital period:</span> <span>${item.orbital_period}</span></li>
            <li><span>Diameter:</span> <span>${item.diameter} km</span></li>
            <li><span>Climate:</span> <span>${item.climate}</span> </li>
            <li><span>Gravity:</span> <span>${item.gravity}</span> </li>
            <li><span>Population:</span> <span>${item.population}</span> </li>
          </ul>
        </div>
      </div>
    `;
    })
    .join("");

  $container.innerHTML = planetsCard;
}

function filmsTemplate(arr) {
  const films = arr
    .map((item) => {
      return `
      <div class="cardMore">
        <div class="cardMore_header">
          <h1>${item.title}</h1>
        </div>
        <div class="cardMore_body">
          <ul class="card_list">
            <li><span>Director:</span> <span>${item.director}</span></li>
            <li><span>Producer:</span> <span>${item.producer}</span></li>
            <li><span>Release date:</span> <span>${item.release_date} km</span></li>
          </ul>
        </div>
      </div>
    `;
    })
    .join("");
  $container.innerHTML = films;
}

$prev.addEventListener("click", (e) => {
  e.preventDefault();
  currentPage--;
  $currentPage.innerHTML = currentPage;

  if (currentPage === 1) {
    $prev.setAttribute("disabled", true);
  }
  $next.removeAttribute("disabled");
  const route = localStorage.getItem("route");
  getURL(`${BASE_URL}${route}`, `page=${currentPage}`, (cb) => {
    if (route === "people") {
      template(cb.results);
    } else if (route === "planets") {
      planetsTemplate(cb.results);
    } else if (route === "starships") {
      starhipsTemplate(cb.results);
    }
  });
});

$next.addEventListener("click", (e) => {
  e.preventDefault();
  currentPage++;
  $currentPage.innerHTML = currentPage;

  const count = localStorage.getItem("pageCount");

  if (currentPage === counterPage(count)) {
    $next.setAttribute("disabled", true);
  }

  $prev.removeAttribute("disabled");
  const route = localStorage.getItem("route");
  getURL(`${BASE_URL}${route}`, `page=${currentPage}`, (cb) => {
    if (route === "people") {
      template(cb.results);
    } else if (route === "planets") {
      planetsTemplate(cb.results);
    } else if (route === "starships") {
      starhipsTemplate(cb.results);
    }
  });
});
