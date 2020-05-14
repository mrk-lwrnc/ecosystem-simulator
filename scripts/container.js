export function buildContainer(container_selector) {
    const NUMBER_OF_ROWS = 50;
    const NUMBER_OF_COLUMNS = 50;
    let rows = '';

    loopEvery(NUMBER_OF_ROWS, () => {
        let columns = '';
        loopEvery(NUMBER_OF_COLUMNS, () => {
            columns += createColumn();
        });
        rows += createRow(columns);
    });

    container_selector.innerHTML = rows;
}

export function moveContainer(animal, row, column) {
    const row_selector = document.querySelectorAll('.row')[row];
    const column_selector = row_selector.querySelectorAll('.column')[column];
    column_selector.innerHTML = animal;
}

function loopEvery(num_of_loops, callback) {
    for (let index = 0; index < num_of_loops; index++) {
        callback();
    }
}

function createRow(columns) {
    return createDiv({
        className: 'row',
        children: columns
    });
}

function createColumn() {
    return createDiv({
        className: 'column',
        children: ''
    });
}

function createDiv(properties) {
    return (
        `<div class=${properties.className}>${properties.children}</div>`
    );
}