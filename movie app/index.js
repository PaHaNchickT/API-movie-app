let data
const gallery = document.querySelector('.gallery')
const home = document.querySelector('.home')
const body = document.querySelector('body')
const inp = document.querySelector('input')
let isMovie = false
let link = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top'

inp.value = ''

// window.addEventListener('timeupdate', function() {
//     console.log('jopa')
// })

// function setLocalStorage() {
//     localStorage.setItem('link', link);
// }
// window.addEventListener('beforeunload', setLocalStorage)

async function getData(lin, isMovie=false) {

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
    showData(data, isMovie);
}
getData(link);

function showData(data, isMovie=false) {
    if (isMovie === true) {
        let bg = `<div class="rev-bg items">`
        let div1 = `<div class="rev-img" style='background-image: url("${data.posterUrl}")'>`
        let div2 = `<div class="rev-info">`
        let h2 = `<h2>${data.nameRu} (${data.year})</h2>`
        let p1
        if (data.shortDescription === null) {
            p1 = `<p>Описание отсутствует</p>`
        } else {
            p1 = `<p>Описание: ${data.shortDescription}</p>`
        }
        let temp = ''
        for (let keys in data.genres) {
            temp = `${temp} ${data.genres[keys].genre},`
        }
        let p2 = `<p>Жанры:${temp}</p>`
        gallery.insertAdjacentHTML('beforeend', bg);
        document.querySelector('.rev-bg').insertAdjacentHTML('beforeend', div1)
        document.querySelector('.rev-bg').insertAdjacentHTML('beforeend', div2)
        document.querySelector('.rev-info').insertAdjacentHTML('beforeend', h2)
        document.querySelector('.rev-info').insertAdjacentHTML('beforeend', p1)
        document.querySelector('.rev-info').insertAdjacentHTML('beforeend', p2)
    } else {
        data.films.forEach((el, ind) => {
        for (let keys in el) {
            let color
            if (el.rating >= 8) {
                color = 'lightgreen'
            } else if (el.rating >= 6) {
                color = 'orange'
            } else color = 'red'
            let div1 = `<div class="gallery-img${ind} items" id='${el.filmId}' style='background-image: url("${el.posterUrlPreview}")'>`;
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
    if (data.films.length === 0) {

        let p = `<p class="error">К сожалению, поиск не дал результатов</p>`
        gallery.insertAdjacentHTML('beforeend', p);
    }
    }
    // console.log(data)
}

home.addEventListener('click', function () {
    isMovie = false
    let items = document.querySelectorAll('.items')
    items.forEach(e => {
        e.remove()
    })
    items = document.querySelectorAll('.error')
        items.forEach(e => {
            e.remove()
        })
    link = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top'
    getData(link);
    inp.value = ''
})

inp.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
        isMovie = false
        let items = document.querySelectorAll('.items')
        items.forEach(e => {
            e.remove()
        })
        items = document.querySelectorAll('.error')
        items.forEach(e => {
            e.remove()
        })
        link = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${inp.value}`
        getData(link);
    }
})

gallery.onclick = function openMovie(event) {
    if (event.target.classList.contains('items')) {
        isMovie = true
        let items = document.querySelectorAll('.items')
        items.forEach(e => {
            e.remove()
        })
        items = document.querySelectorAll('.error')
        items.forEach(e => {
            e.remove()
        })
        link = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${event.path[0].id}`
        getData(link, isMovie);
        // console.log(isMovie)
        // console.log(event.path[0].id)
    }
}

//genres