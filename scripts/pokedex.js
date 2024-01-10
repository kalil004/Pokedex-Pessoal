

document.addEventListener('DOMContentLoaded', () => {
    const pokemonList = document.getElementById('pokemonList');


    const getPokemonDetails = async (name) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        return {
            name: data.name,
            types: data.types.map(type => type.type.name),
            imageUrl: data.sprites.other['official-artwork'].front_default,
        };
    };


    const addPokemonToList = async (pokemonName) => {
        const pokemonDetails = await getPokemonDetails(pokemonName);

        const listItem = document.createElement('li');
        listItem.classList.add('pokemon', pokemonDetails.types[0]);

        const numberSpan = document.createElement('span');
        numberSpan.classList.add('number');
        numberSpan.textContent = `#${String(pokemonList.childElementCount + 1).padStart(3, '0')}`;

        const nameSpan = document.createElement('span');
        nameSpan.classList.add('name');
        nameSpan.textContent = pokemonDetails.name;

        const typesList = document.createElement('ol');
        typesList.classList.add('types');
        pokemonDetails.types.forEach(type => {
            const typeItem = document.createElement('li');
            typeItem.classList.add('type');
            typeItem.textContent = type;
            typesList.appendChild(typeItem);
        });

        const detailDiv = document.createElement('div');
        detailDiv.classList.add('detail');

        const img = document.createElement('img');
        img.src = pokemonDetails.imageUrl;
        img.alt = pokemonDetails.name;

        detailDiv.appendChild(typesList);
        detailDiv.appendChild(img);

        listItem.appendChild(numberSpan);
        listItem.appendChild(nameSpan);
        listItem.appendChild(detailDiv);

        pokemonList.appendChild(listItem);
    };

    pokemonNames.forEach(pokemonName => addPokemonToList(pokemonName));
});

