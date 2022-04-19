// Create Dino Constructor
function Dino(obj) {
    this.imageSrc = `./images/${obj.species.toLowerCase()}.png`;
    this.species = obj.species;
    this.weight = obj.weight;
    this.height = obj.height;
    this.diet = obj.diet;
    this.where = obj.where;
    this.when = obj.when;
    this.fact = obj.fact;
    this.getRandomFact = function (human) {
        // array of methods
        const facts = [
            obj.fact,
            'compareWeight',
            'compareHeight',
            'compareDiet',
            `The ${obj.species} lived in ${obj.where}.`,
            `The ${obj.species} lived during ${obj.when} era.`
        ];
        // get random fact from facts
        const factString = facts[Math.floor(Math.random() * facts.length)];
        if (factString === 'compareWeight' || factString === 'compareHeight' || factString === 'compareDiet') {
            this.fact = eval(`this.${factString}(human)`)
        } else {
            this.fact = factString;
        }
    };
    this.compareHeight = function (human) {
        if (this.height > human.height) {
            return `The ${this.species} is ${(this.height - human.height)} inches taller then you.`;
        }
        if (this.height = human.height) {
            return `You are tall like ${this.species}`;
        }
        return `You are ${(human.height-this.height)} inches taller then ${this.species}.`;
    };
    this.compareWeight = function (human) {
        if (this.weight > human.weight) {
            return `The ${this.species} is ${(this.weight - human.weight)} lbs heavier then you.`;
        }
        if (this.weight = human.weight) {
            return `You are heavy like ${this.species}.`;
        }
        return `You are ${(human.weight-this.weight)} lbs heavier then ${this.species}.`;
    };
    this.compareDiet = function (human) {
        if (this.diet = human.diet) {
            return `The ${this.species}'s diet is ${human.diet} like yours.`;
        }
        return `Unlike you the ${this.species}'s diet is ${this.diet}`;
    };
};

// Create Dino Objects
const dinos = [];
fetch("dino.json")
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    })
    .then(function (data) {
        data.Dinos.forEach(function (dino) {
            dinos.push(new Dino(dino));
        });
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
    });

// On button click, prepare and display infographic
// Use IIFE to keep variables in local scope
(function () {
    document.getElementById('btn').addEventListener("click", function (evt) {
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