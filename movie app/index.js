let keyword = 'нет пути домой'
let data

    // .then(res => res.json())
    // .then(json => console.log(json))
    // .catch(err => console.log(err))

async function getData() {
    const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}`, {
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
    console.log(data)
}
