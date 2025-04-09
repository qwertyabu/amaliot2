// Темная тема
document.getElementById("dark-mode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Хранилище стран
let allCountries = [];

// Загрузка стран
fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region")
  .then((res) => res.json())
  .then((countries) => {
    allCountries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    displayCountries(allCountries);
  })
  .catch((err) => console.error("Ошибка при загрузке стран:", err));

// Отображение стран
function displayCountries(countries) {
  const countriesDiv = document.getElementById("countries");
  countriesDiv.innerHTML = "";

  countries.forEach((country) => {
    const div = document.createElement("div");
    div.classList.add("country");

    div.innerHTML = `
      <img src="${country.flags?.png || country.flags?.svg}" alt="Flag of ${country.name.common}">
      <h3>${country.name.common}</h3>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> ${country.region}</p>
    `;

    countriesDiv.appendChild(div);
  });
}

// Поиск по названию
document.getElementById("text").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(value)
  );

  displayCountries(filtered);
});

// Фильтрация по региону
document.getElementById("region-filter").addEventListener("change", (e) => {
  const region = e.target.value;

  const filtered = region
    ? allCountries.filter((country) => country.region === region)
    : allCountries;

  displayCountries(filtered);
});
