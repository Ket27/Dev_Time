const toggle = document.getElementById('toggle')
const dark = document.getElementById('dark')
const body = document.querySelector("body");
const country = document.querySelector('.country')
const search = document.querySelector('.textsearch')
const filter = document.querySelector('.filter-by-region')

toggle.addEventListener('click', function(){
    this.classList.toggle('bi-moon-fill')
    if(this.classList.toggle('bi-brightness-high-fill')){
        body.style.backgroundColor = "black";
        body.style.color = "white"
        dark.innerHTML = "Light Mode"
        body.style.transition = "1s"
    }
    else{
        body.style.backgroundColor = "white";
        body.style.color = "black"
        dark.innerHTML = "Dark Mode"
        body.style.transition = "1s"
    }
})

async function getCountries(){
    const URL= await fetch('https://restcountries.com/v2/all');
    const res = await URL.json();
    console.log(res);
    res.forEach(element => {
        showCountry(element);
    });
}

getCountries();

function showCountry(data){
    const countries = document.createElement('div');
    countries.classList.add('countries');
    countries.innerHTML = `              
        <div class = "country-img">
            <img src=${data.flag} alt=""/>
        </div>
        <div class = "country-info">
            <h5 class= "country-name">${data.name}</h5>
            <p><strong>Population:</strong>${data.population}</p>
            <p class = "region"><strong>Region:</strong>${data.region}</p>
            <p><strong>Capital:</strong>${data.capital}</p>
        </div>`

    country.appendChild(countries);
}

const country_name = document.getElementsByClassName('country-name')
search.addEventListener('input', function(){
    Array.from(country_name).forEach(countries => {
        console.log(countries.parentElement.parentElement)
        if(countries.innerHTML.toLowerCase().includes(search.value.toLowerCase())){
            countries.parentElement.parentElement.style.display = "flex";
        }
        else{
            countries.parentElement.parentElement.style.display = "none";
        }
    })
})

const region = document.getElementsByClassName('region');
filter.addEventListener('change', function(){
    Array.from(region).forEach(countries => {
        if(countries.innerHTML.includes(filter.value) || filter.value == "All"){
            countries.parentElement.parentElement.style.display = "flex";
        }
        else{
            countries.parentElement.parentElement.style.display = "none";
        }
    })
})

