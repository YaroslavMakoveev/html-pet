const nameInput = document.getElementById('name__input');
const searchBtn = document.getElementById('search__btn');
const presonsBlock = document.getElementById('persons__block');
const noneBlock = document.getElementById('none__block');

getPersons();
searchBtn.addEventListener('click', getByName);
nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
        nameInput.blur();
    }
});

function getPersons() {
    noneBlock.innerHTML = `<div class="loader"></div>`;
    fetch('https://rickandmortyapi.com/api/character')
        .then((res) => res.json())
        .then((data) => displayPersons(data.results))
        .catch((err) => console.error(err));
}

function displayPersons(persons) {
    presonsBlock.innerHTML = '';
    noneBlock.innerHTML = '';
    persons.forEach((person) => {
        const card = `
            <div class="person__card">
                <img src="${person.image}" alt="img" />
                <h1> ${person.name} </h1>
                <p>Status: ${person.status} </p>
            </div>
        `;
        presonsBlock.innerHTML += card;
    });
}

async function getByName() {
    noneBlock.innerHTML = `<div class="loader"></div>`;
    presonsBlock.innerHTML = '';
    try {
        const name = nameInput.value.trim();
        if (!name) {
            getPersons();
        }
        const res = await fetch(
            `https://rickandmortyapi.com/api/character/?name=${name}`
        );
        const data = await res.json();
        displayPersons(data.results);
    } catch (error) {
        noneBlock.innerHTML = 'None...';
    }
}
