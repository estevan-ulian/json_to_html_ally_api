const countriesAPI = 'https://api.sellead.com/country';
const nationalityAPI = 'https://api.sellead.com/nationality';
const cityAPI = 'https://api.sellead.com/api/v1/city';
const currencyAPI = '../data/currency.json';
const phoneAPI = '../data/phones.json';
const dddAPI = '../data/ddd.json';

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
    
    if (result.name_ptbr === null) {
        const html = `
    <div class="item">
        <span>${result.name}</span>
        <span>|</span>
        <span>${result.name}</span>
    </div>
    `
    return listHTML.insertAdjacentHTML('afterend', html);
        
    } else {
        const html = `
        <div class="item">
            <span>${result.name_ptbr}</span>
            <span>|</span>
            <span>${result.name}</span>
        </div>
        `
        return listHTML.insertAdjacentHTML('afterend', html);
    }
    

    
};

function createResultHTMLcurrency (result) {
    const listHTML = document.querySelector('.currency-list');

    const html = `
    <div class="item">
        <span>${result.name} (${result.symbol})</span>
        <span>|</span>
        <span>${result.code}</span>
    </div>
    `

    return listHTML.insertAdjacentHTML('afterend', html);
};

function createResultHTMLphone (result) {
    const listHTML = document.querySelector('.phone-list');

    const html = `
    <div class="item">
        <span>${result.name} (${result.dial_code})</span>
        <span>|</span>
        <span>${result.dial_code}</span>
    </div>
    `

    return listHTML.insertAdjacentHTML('afterend', html);
};

function createResultHTMLddd (result) {
    const listHTML = document.querySelector('.ddd-list');

    const html = `
    <div class="item">
        <span>(${result})</span>
        <span>|</span>
        <span>${result}</span>
    </div>
    `

    return listHTML.insertAdjacentHTML('afterend', html);
};

function addHiddenClass(item) {
    document.querySelector(item).classList.toggle('hidden');
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


    const currency = fetch(currencyAPI)
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

            createResultHTMLcurrency(result);
        
        });  

    })
    .catch(err => {
        const containerResult = document.querySelector('.currency-list');
        containerResult.innerHTML = `<p class="error">Não foi possível puxar os dados da Moeda Corrente.<p>`
        addHiddenClass('.container-currency')
        console.warn(`Não foi possível puxar os dados Moeda Corrente. -> ${err}`);    
    });
    
    const phone = fetch(phoneAPI)
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

            createResultHTMLphone(result);
        
        });  

    })
    .catch(err => {
        const containerResult = document.querySelector('.phone-list');
        containerResult.innerHTML = `<p class="error">Não foi possível puxar os dados dos Phones.<p>`
        addHiddenClass('.container-phone')
        c
        onsole.warn(`Não foi possível puxar os dados dos Phones. -> ${err}`);    
    });

    const DDD = fetch(dddAPI)
    .then(res => {
        return res.json();

    })
    .then(data => {
        const dataKeys = Object.keys(data.estadoPorDdd);

        const dataKeysSort = dataKeys.sort( (a, b) => {
            return b - a;
        })

        return (dataKeysSort.filter(result => {

            createResultHTMLddd(result);

        })
        )
    })
    .catch(err => {
        const containerResult = document.querySelector('.ddd-list');
        containerResult.innerHTML = `<p class="error">Não foi possível puxar os dados dos DDD's.<p>`
        addHiddenClass('.container-ddd')
        console.warn(`Não foi possível puxar os dados dos DDD's. -> ${err}`);    
    });