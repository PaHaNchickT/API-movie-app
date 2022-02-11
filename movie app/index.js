let keyword = 'нет пути домой'
let data
const gallery = document.querySelector('.gallery')

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
            // let img = `<img class="gallery-img${ind} items" src="${el.posterUrlPreview}" alt="image${ind}">`;
            let div = `<div class="gallery-img${ind} items" style='background-image: url("${el.posterUrlPreview}")'>`;
            gallery.insertAdjacentHTML('beforeend', div);
            break;
        }
    });
    console.log(data)
}
