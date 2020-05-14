import { buildContainer, moveContainer } from './container.js';
import { Environment } from './environment.js';
import { Animal } from './animal.js';

function main() {
    const container = document.querySelector('.container');

    let environment = new Environment();
    let animals = [
        new Animal({
            display: '🐝',
            initial_row: 0,
            initial_column: 0
        }),
        new Animal({
            display: '🦋',
            initial_row: 1,
            initial_column: 1
        }),
        new Animal({
            display: '🐞',
            initial_row: 0,
            initial_column: 2
        }),
        new Animal({
            display: '🐛',
            initial_row: 1,
            initial_column: 2
        })
    ];

    animals.forEach(animal => environment.addAnimal(animal));

    let timeInterval = setInterval(moveAnimals.bind(
        this, animals, environment.getEnvironment(), container
    ), 1000);
}

function moveAnimals(animals, environment, container) {
    animals.forEach(animal => {
        animal.move(environment);
    });

    buildContainer(container);
    environment.forEach((row, row_index) => {
        row.forEach((animal, column_index) => {
            if (animal) {
                moveContainer(animal, row_index, column_index);
            }
        });
    });
}

main();