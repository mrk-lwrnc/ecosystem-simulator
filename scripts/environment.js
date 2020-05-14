export class Environment {
    constructor() {
        this._environment = this._createEnvironment();
    }

    addAnimal(animal) {
        const ANIMAL_NAVIGATION = animal.getNavigationalBehavior();
        const ROW = ANIMAL_NAVIGATION.getCurrentY();
        const COLUMN = ANIMAL_NAVIGATION.getCurrentX();
        this._environment[ROW][COLUMN] = animal.getDisplay();
    }

    getEnvironment() {
        return this._environment;
    }

    _createEnvironment() {
        const NUMBER_OF_ROWS = 50;
        const NUMBER_OF_COLUMNS = 50;
        return [...Array(NUMBER_OF_ROWS)].map(
            rows => Array(NUMBER_OF_COLUMNS)
        );
    }
}