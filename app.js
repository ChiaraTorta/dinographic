(function () {
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

    /* Helper functions */

    function getDinos() {
        return fetch("dino.json")
            .then(response => response.json())
            .then(data => createDinos(data))
            .catch(error => console.log(error));
    }

    function createDinos(data) {
        let arr = [];
        data.Dinos.map(dino => {
            arr.push(Object.create(Dino, {
                species: {
                    value: dino.species
                },
                weight: {
                    value: dino.weight
                },
                height: {
                    value: dino.height
                },
                diet: {
                    value: dino.diet
                },
                where: {
                    value: dino.where
                },
                when: {
                    value: dino.when
                },
                fact: {
                    value: dino.fact
                },
                imageSrc: {
                    value: `./images/${dino.species.toLowerCase()}.png`
                },
            }))
        })
        return arr;
    }

    function createHuman() {
        return Object.create(null, {
            name: {
                value: getValue('name')
            },
            imageSrc: {
                value: './images/human.png'
            },
            weight: {
                value: getValue('weight')
            },
            height: {
                value: getValue('inches')
            },
            diet: {
                value: getValue('diet')
            },
        });
    }

    function validateForm() {
        if (getValue('name') === '' && getValue('inches') !== 0 && getValue('weight') !== 0) {
            alert("All inputs must be filled out");
            return false;
        }
    }

    function getValue(name) {
        return document.getElementById(name.toString()).value
    }

    /* HTML Views */
    function humanTile(human) {
        const humanHtml = document.createElement('div');
        humanHtml.classList.add(['grid-item']);
        humanHtml.innerHTML = `<h3>${human.name}</h3><img src='${human.imageSrc}'>`;
        return humanHtml;
    }

    function dinoTile(dino) {
        const dinoHtml = document.createElement('div');
        dinoHtml.classList.add(['grid-item']);
        dinoHtml.innerHTML = `<h3>${dino.species}</h3><img src='${dino.imageSrc}'><p>${dino.fact}</p>`;
        return dinoHtml;
    }

    // On button click, prepare and display infographic
    document.getElementById('btn').addEventListener("click", async function (evt) {
        try {
            validateForm()
            const grid = document.getElementById('grid');
            // Create Human Object
            const human = createHuman();
            // Generate Tiles for each Dino in Array and add them to the DOM
            let dinos = await getDinos();

            dinos.forEach(function (dino) {
                if (dino.species.toLowerCase() !== 'pigeon') {
                    dino.getRandomFact(human);
                }
                grid.appendChild(dinoTile(dino));
            })

            grid.insertBefore(humanTile(human), grid.children[4]);

            // Remove form from screen
            document.getElementById('dino-compare').style.display = 'none';
        } catch (error) {
            console.log(error)
        }
    });
})();