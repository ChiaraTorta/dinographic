
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


    // Create Human Object

    // Use IIFE to get human data from form


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
