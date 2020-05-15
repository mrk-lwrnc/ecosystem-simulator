import { buildContainer, buildMinimap } from './container.js';
import { Environment } from './environment.js';
import { Animal } from './animal.js';

let selected_minimap = {};
setSelectedMinimap({ x: 0, y: 0 });

function main() {
    const container = document.querySelector('.container');
    const minimap = document.querySelector('.minimap');

    let environment = new Environment();
    let animals = [
        new Animal({
            display: '🐇',
            initial_row: 3,
            initial_column: 3
        }),
        new Animal({
            display: '🦉',
            initial_row: 5,
            initial_column: 5
        }),
        new Animal({
            display: '🐅',
            initial_row: 10,
            initial_column: 5
        }),
        new Animal({
            display: '🐒',
            initial_row: 10,
            initial_column: 10
        }),
        new Animal({
            display: '🐑',
            initial_row: 15,
            initial_column: 15
        }),
        new Animal({
            display: '🦏',
            initial_row: 15,
            initial_column: 20
        }),
        new Animal({
            display: '🦌',
            initial_row: 20,
            initial_column: 20
        }),
        new Animal({
            display: '🐊',
            initial_row: 25,
            initial_column: 25
        }),
        new Animal({
            display: '🐍',
            initial_row: 25,
            initial_column: 30
        }),
        new Animal({
            display: '🦍',
            initial_row: 30,
            initial_column: 30
        }),
        new Animal({
            display: '🦔',
            initial_row: 35,
            initial_column: 35
        }),
        new Animal({
            display: '🐿️',
            initial_row: 35,
            initial_column: 40
        }),
        new Animal({
            display: '🐂',
            initial_row: 40,
            initial_column: 40
        }),
        new Animal({
            display: '🐦',
            initial_row: 45,
            initial_column: 20
        }),
        new Animal({
            display: '🐐',
            initial_row: 45,
            initial_column: 45
        })
    ];

    buildMinimap(minimap);
    addClickListeners(minimap);
    animals.forEach(animal => environment.addAnimal(animal));

    let timeInterval = setInterval(moveAnimals.bind(
        this, animals, environment, container
    ), 1000);
}

function moveAnimals(animals, environment, container) {
    animals.forEach(animal => {
        animal.move(environment.getEnvironment());
    });

    buildContainer({
        container_selector: container,
        environment: environment.getEnvironmentMinimap(selected_minimap),
        biome_display: environment.getBiomeMinimap(selected_minimap)
    });
}

function addClickListeners(minimap_selector) {
    minimap_selector.querySelectorAll('.minimap-row').forEach((row, row_index) => {
        row.querySelectorAll('.minimap-col').forEach((col, col_index) => {
            col.addEventListener('click', setSelectedMinimap.bind(
                this, { x: col_index, y: row_index }
            ));
        });
    });
}

function setSelectedMinimap({ x, y }) {
    const POSITIONS = [[0, 9], [10, 19], [20, 29], [30, 39], [40, 49]];
    selected_minimap = {
        start_pos_x: POSITIONS[x][0],
        start_pos_y: POSITIONS[y][0],
        end_pos_x: POSITIONS[x][1],
        end_pos_y: POSITIONS[y][1]
    };
}

main();