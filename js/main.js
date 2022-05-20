const API = 'https://api.sellead.com/api/v1/country';

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
        const html = data
            .map(v => {
                return (`
                    <p class="item">
                        <span>${v.code}</span>
                        <span>|</span>
                        <span>${v.name_ptbr}</span>
                    </p>
                `);
            })
            .join('');

        const countryList = document.querySelector('.country-list');
        countryList.insertAdjacentHTML(
            'afterend', html);
    })
    .catch(error => console.log('ERROR -> dados não encontrados.'));