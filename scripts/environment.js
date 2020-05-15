export class Environment {
    constructor() {
        this._environment = this._createEnvironment();
        this._biomeDisplay = this._createBiomeDisplay();
    }

    getEnvironment() {
        return this._environment;
    }

    getBiomeDisplay() {
        return this._biomeDisplay;
    }

    addAnimal(animal) {
        const ANIMAL_NAVIGATION = animal.getNavigationalBehavior();
        const ROW = ANIMAL_NAVIGATION.getCurrentY();
        const COLUMN = ANIMAL_NAVIGATION.getCurrentX();
        this._environment[ROW][COLUMN] = animal.getDisplay();
    }

    getEnvironmentMinimap({start_pos_x, start_pos_y, end_pos_x, end_pos_y}) {
        return this._environment.filter((_, row_index) => {
            return row_index >= start_pos_y && row_index <= end_pos_y;
        }).map(row => {
            return row.filter((_, column_index) => {
                return column_index >= start_pos_x && column_index <= end_pos_x;
            });
        });
    }

    getBiomeMinimap({start_pos_x, start_pos_y, end_pos_x, end_pos_y}) {
        return this._biomeDisplay.filter((_, row_index) => {
            return row_index >= start_pos_y && row_index <= end_pos_y;
        }).map(row => {
            return row.filter((_, column_index) => {
                return column_index >= start_pos_x && column_index <= end_pos_x;
            });
        });
    }

    _createEnvironment() {
        const NUMBER_OF_ROWS = 50;
        const NUMBER_OF_COLUMNS = 50;
        return [...Array(NUMBER_OF_ROWS)].map(
            rows => Array(NUMBER_OF_COLUMNS).fill('')
        );
    }

    _createBiomeDisplay() {
        const NUMBER_OF_ROWS = this._environment.length;
        const NUMBER_OF_COLUMNS = this._environment[0].length;
        let biome_display = [];

        for(let row = 0; row < NUMBER_OF_ROWS; row++) {
            let row_container = [];
            for(let column = 0; column < NUMBER_OF_COLUMNS; column++) {
                const BIOME = this._generateBiome();
                row_container.push(BIOME);
            }
            biome_display.push(row_container);
        }

        return biome_display;
    }

    _generateBiome() {
        const BIOMES = this._getBiomes();
        const GENERATED_INDEX = Math.floor(Math.random() * BIOMES.length);
        const GENERATED_BIOME = BIOMES[GENERATED_INDEX];

        return GENERATED_BIOME;
    }

    _getBiomes() {
        return [
            'swamp',
            'freshwater',
            'mountains'
        ];
    }
}