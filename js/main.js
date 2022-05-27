const countriesAPI = 'https://api.sellead.com/country';
const nationalityAPI = 'https://api.sellead.com/nationality';
const cityAPI = 'https://api.sellead.com/api/v1/city';

function createResultHTMLcountries (value) {
    const listHTML = document.querySelector('.country-list');

    const html = `
    <div class="item">
        <span>${value.name_ptbr}</span>
        <span>|</span>
        <span>${value.code}</span>
    </div>
    `

    return listHTML.insertAdjacentHTML('afterend', html);
};

function createResultHTMLnationalities (result) {
    const listHTML = document.querySelector('.nationality-list');

    const html = `
    <div class="item">
        <span>${result.country}</span>
        <span>|</span>
        <span>${result.nationality}</span>
    </div>
    `

    return listHTML.insertAdjacentHTML('afterend', html);
};

function createResultHTMLcities (result) {
    const listHTML = document.querySelector('.city-list');

    const html = `
    <div class="item">
        <span>${result.name_ptbr}</span>
        <span>|</span>
        <span>${result.name}</span>
    </div>
    `

    return listHTML.insertAdjacentHTML('afterend', html);
};

function addHiddenClass(item) {
    document.querySelector(item).classList.add('hidden');
}

const countries = fetch(countriesAPI)
    .then(res => {

        return res.json();

    })
    .then(data => {

        const dataSort = data.sort( (a, b) => {

            let nameA = a.name_ptbr.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            let nameB = b.name_ptbr.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

            if (nameA > nameB) return -1;
            if (nameA < nameB) return 1;
            return 0;

        });

        dataSort.filter(result => {

            createResultHTMLcountries(result);
        
        });  

    })
    .catch(err => {
        const containerResult = document.querySelector('.country-list');
        containerResult.innerHTML = `<p class="error">Não foi possível puxar os dados dos Países.<p>`
        addHiddenClass('.container-legend')
        console.warn(`Não foi possível puxar os dados dos Países.`);    
        console.log(err);    
    });


    const nationalities = fetch(nationalityAPI)
    .then(res => {

        return res.json();

    })
    .then(data => {
        const dataSort = data.sort( (a, b) => {

            let nameA = a.country.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            let nameB = b.country.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

            if (nameA > nameB) return -1;
            if (nameA < nameB) return 1;
            return 0;

        });

        dataSort.filter(result => {

            createResultHTMLnationalities(result);
        
        });  

    })
    .catch(err => {
        const containerResult = document.querySelector('.nationality-list');
        containerResult.innerHTML = `<p class="error">Não foi possível puxar os dados das Nacionalidades.<p>`
        addHiddenClass('.container-legend-nationality')
        console.warn(`Não foi possível puxar os dados das Nacionalidades. -> ${err}`);    
    });


    const cities = fetch(cityAPI)
    .then(res => {

        return res.json();

    })
    .then(data => {
        const dataSort = data.sort( (a, b) => {

            let nameA = a.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            let nameB = b.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

            if (nameA > nameB) return -1;
            if (nameA < nameB) return 1;
            return 0;

        });

        dataSort.filter(result => {

            createResultHTMLcities(result);
        
        });  

    })
    .catch(err => {
        const containerResult = document.querySelector('.city-list');
        containerResult.innerHTML = `<p class="error">Não foi possível puxar os dados das Nacionalidades.<p>`
        addHiddenClass('.container-legend-city')
        console.warn(`Não foi possível puxar os dados das Cidades. -> ${err}`);    
    });