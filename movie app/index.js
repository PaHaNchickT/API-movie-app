let data
const gallery = document.querySelector('.gallery')
const home = document.querySelector('.home')
const body = document.querySelector('body')
const inp = document.querySelector('input')
let link = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top'

// window.addEventListener('timeupdate', function() {
//     console.log('jopa')
// })

// function setLocalStorage() {
//     localStorage.setItem('link', link);
// }
// window.addEventListener('beforeunload', setLocalStorage)

async function getData(lin) {

    //search
    //`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}`

    const res = await fetch(`${lin}`, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'fe77bc0c-1287-4d70-adb2-d5f3b64ee3e7',
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    showData(data);
}
getData(link);

function showData(data) {
    data.films.forEach((el, ind) => {
        for (let keys in el) {
            // let img = `<img class="gallery-img${ind} items" src="${el.posterUrlPreview}" alt="image${ind}">`;
            let color
            if (el.rating >= 8) {
                color = 'lightgreen'
            } else if (el.rating >= 6) {
                color = 'orange'
            } else color = 'red'
            let div1 = `<div class="gallery-img${ind} items" style='background-image: url("${el.posterUrlPreview}")'>`;
            let div2 = `<div class="movie-info${ind} movie-info">`
            let p1 = `<p class="name">${el.nameRu}</p>`
            let p2
            if (el.rating === 'null') {
                p2 = `<p class="rait" style='color:${color}; box-shadow: 0px 0px 5px -1px ${color};'>-/-</p>`
            } else {
                p2 = `<p class="rait" style='color:${color}; box-shadow: 0px 0px 5px -1px ${color};'>${el.rating}</p>`
            }
            gallery.insertAdjacentHTML('beforeend', div1);
            document.querySelector(`.gallery-img${ind}`).insertAdjacentHTML('beforeend', div2);
            document.querySelector(`.movie-info${ind}`).insertAdjacentHTML('beforeend', p1);
            document.querySelector(`.movie-info${ind}`).insertAdjacentHTML('beforeend', p2);
            break;
        }
    });
    // console.log(data)
}

home.addEventListener('click', function () {
    let items = document.querySelectorAll('.items')
    items.forEach(e => {
        e.remove()
    })
    link = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top'
    getData(link);
})

inp.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
        let items = document.querySelectorAll('.items')
        items.forEach(e => {
            e.remove()
        })
        link = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${inp.value}`
        getData(link);
    }
})