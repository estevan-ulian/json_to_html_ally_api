const API = 'https://api.sellead.com/api/v1/country';

function createListInHTML (value) {
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

const countries = fetch(API)
    .then(res => {

        if(res.ok) {
            console.log('success')
        } else {
            console.log('not successful')
        }

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

            createListInHTML(result)
        
        });  

    })
    .catch(err => console.log(`ERRO! Não foi possível exibir os dados. ${err}`));


    // .then(data => {
    //     const html = data
    //         .map(v => {
    //             return (`
    //                 <p class="item">
    //                     <span>${v.code}</span>
    //                     <span>|</span>
    //                     <span>${v.name_ptbr}</span>
    //                 </p>
    //             `);
    //         })
    //         .join('');

    //     const countryList = document.querySelector('.country-list');
    //     countryList.insertAdjacentHTML(
    //         'afterend', html);
    // })
    // .catch(error => console.log('ERROR -> dados não encontrados.'));