// Create Dino Prototype
const Dino = {
    getRandomFact(human) {
        // array of methods
        const facts = [
            this.fact,
            'compareWeight',
            'compareHeight',
            'compareDiet',
            `The ${this.species} lived in ${this.where}.`,
            `The ${this.species} lived during ${this.when} era.`
        ];
        // get random fact from facts
        const factString = facts[Math.floor(Math.random() * facts.length)];
        if (factString === 'compareWeight' || factString === 'compareHeight' || factString === 'compareDiet') {
            this.fact = eval(`this.${factString}(human)`)
        } else {
            this.fact = factString;
        }
    },
    compareHeight(human) {
        if (this.height > human.height) {
            return `The ${this.species} is ${(this.height - human.height)} inches taller then you.`;
        }
        if (this.height = human.height) {
            return `You are tall like ${this.species}`;
        }
        return `You are ${(human.height-this.height)} inches taller then ${this.species}.`;
    },
    compareWeight(human) {
        if (this.weight > human.weight) {
            return `The ${this.species} is ${(this.weight - human.weight)} lbs heavier then you.`;
        }
        if (this.weight = human.weight) {
            return `You are heavy like ${this.species}.`;
        }
        return `You are ${(human.weight-this.weight)} lbs heavier then ${this.species}.`;
    },
    compareDiet(human) {
        if (this.diet = human.diet) {
            return `The ${this.species}'s diet is ${human.diet} like yours.`;
        }
        return `Unlike you the ${this.species}'s diet is ${this.diet}`;
    }
};

// TODO create Dino objects as Dino methods
// TODO handle events with Dino methods?
// TODO fetch with async/await synthax

function getDinos() {
    return fetch("dino.json")
    .then(response => response.json())
    .then(data => initDinos(data))
    .catch(error => console.log(error));
}

// Use Object.create Method to create new Dino objects and the properties
function createDinos(data) {
    let arr = [];
    data.Dinos.map(dino => {
        arr.push(Object.create(Dino, {
            species : { value: dino.species },
            weight : {value: dino.weight },
            height : {value: dino.height },
            diet : { value: dino.diet },
            where :{ value: dino.where },
            when : { value: dino.when },
            fact : { value: dino.fact },
            imageSrc : { value: `./images/${dino.species.toLowerCase()}.png` },
        }))
    })
    return arr;
}

// On button click, prepare and display infographic
// Use IIFE to keep variables in local scope
(function () {
    document.getElementById('btn').addEventListener("click", async function (evt) {
        const grid = document.getElementById('grid');
        // Create Human Object
        const human = {
            name: document.getElementById('name').value,
            imageSrc: './images/human.png',
            weight: document.getElementById('weight').value,
            height: document.getElementById('inches').value,
            diet: document.getElementById('diet').value,
        };

        if (human.name !== '' && human.weight !== 0 && human.weight !== 0) {
            // Generate Tiles for each Dino in Array and add them to the DOM
            let dinos = await getDinos();

            dinos.forEach(function (dino) {
                if (dino.species.toLowerCase() !== 'pigeon') {
                    dino.getRandomFact(human);
                }
                let dinoTile = document.createElement('div');
                dinoTile.classList.add(['grid-item']);
                dinoTile.innerHTML = `<h3>${dino.species}</h3><img src='${dino.imageSrc}'><p>${dino.fact}</p>`;
                grid.appendChild(dinoTile);
            })

            // Create human tile and add it in the middle of the grid
            const humanTile = document.createElement('div');
            humanTile.classList.add(['grid-item']);
            humanTile.innerHTML = `<h3>${human.name}</h3><img src='${human.imageSrc}'>`;
            grid.insertBefore(humanTile, grid.children[4]);

            // Remove form from screen
            document.getElementById('dino-compare').style.display = 'none';
        }
    });
})();