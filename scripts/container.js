export function buildContainer({ container_selector, environment, biome_display }) {
    let rows = '';

    environment.forEach((row, row_index) => {
        let columns = '';
        row.forEach((animal, column_index) => {
            columns += createColumn({
                display: animal,
                biome: biome_display[row_index][column_index]
            });
        });
        rows += createRow(columns);
    });

    container_selector.innerHTML = rows;
}

export function buildMinimap(minimap_selector) {
    const NUM_OF_ROWS = 5;
    const NUM_OF_COLUMNS = 5;
    let rows = '';

    for(let row = 0; row < NUM_OF_ROWS; row++) {
        let columns = '';
        for(let column = 0; column < NUM_OF_COLUMNS; column++) {
            columns += createDiv({
                class_name: 'minimap-col',
                children: ''
            });
        }
        rows += createDiv({
            class_name: 'minimap-row',
            children: columns
        });
    }

    minimap_selector.innerHTML = rows;
}

function createRow(columns) {
    return createDiv({
        class_name: 'row',
        children: columns
    });
}

function createColumn({display, biome}) {
    return createDiv({
        class_name: `column${' '.concat(biome)}`,
        children: display
    });
}

function createDiv({ class_name, children }) {
    return (
        `<div class=\"${class_name}\">${children}</div>`
    );
}