let keyword = 'нет пути домой'
let data
const items = document.querySelector('.items')

async function getData() {

    //search
    //`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}`

    const res = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/top', {
        method: 'GET',
        headers: {
            'X-API-KEY': 'fe77bc0c-1287-4d70-adb2-d5f3b64ee3e7',
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    showData(data);
}
getData();

function showData(data) {
    data.films.forEach((el, ind)=> {
        for (let keys in el) {
            let img = `<img class="gallery-img${ind}" src="${el.posterUrl}" alt="image${ind}">`;
            items.insertAdjacentHTML('beforeend', img);
            break;
        }
    });
    // console.log(data)
}
