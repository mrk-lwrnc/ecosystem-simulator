export class Animal {
    constructor({display, initial_row, initial_column}) {
        this._display = display;
        this._navigationBehavior = new NavigationBehavior({
            current_x: initial_column,
            current_y: initial_row}
        );
    }

    getDisplay() {
        return this._display;
    }

    getNavigationalBehavior() {
        return this._navigationBehavior;
    }

    move(environment) {
        this._navigationBehavior.navigate(environment);
    }
}

class NavigationBehavior {
    constructor({current_x, current_y}) {
        this._current_x = current_x;
        this._current_y = current_y;
    }

    getCurrentX() {
        return this._current_x;
    }

    getCurrentY() {
        return this._current_y;
    }

    navigate(environment) {
        const GENERATED_DIRECTION = this._generateDirection(environment);
        this._tryToMove(GENERATED_DIRECTION, environment);
    }

    _generateDirection(environment) {
        const DIRECTIONS = this._getDirections();
        const GENERATED_INDEX =  Math.floor(Math.random() * DIRECTIONS.length);
        const GENERATED_DIRECTION = DIRECTIONS[GENERATED_INDEX];

        return this._validateGeneratedDirection(GENERATED_DIRECTION, environment);
    }

    _tryToMove({x, y}, environment) {
        const IS_SPACE_OCCUPIED = this._isSpaceOccupied({x, y}, environment);

        if(!IS_SPACE_OCCUPIED) {
            this._move({x, y}, environment);
            this._current_x = x;
            this._current_y = y;
        }
    }

    _validateGeneratedDirection(generated_direction, environment) {
        const MIN = 0;
        const MAX_Y = environment.length - 1;
        const MAX_X = environment[0].length - 1
        let direction = generated_direction;

        if(direction.x < MIN || direction.x > MAX_X){
            direction.x = this._current_x;
        }
        if(direction.y < MIN || direction.y > MAX_Y){
            direction.y = this._current_y;
        }

        return direction;
    }

    _isSpaceOccupied({x, y}, environment) {
        return environment[y][x];
    }

    _move({x, y}, environment) {
        const TRACE = this._getNavigationalTrace(environment);
        const TRACE_COUNT = 1;
        environment[y].splice(x, TRACE_COUNT, TRACE);
    }

    _getNavigationalTrace(environment) {
        const TRACE_COUNT = 1;
        const LEAVING_TRACE = null;

        return environment[this._current_y].splice(
            this._current_x, TRACE_COUNT, LEAVING_TRACE
        )[0];
    }

    _getDirections() {
        const CALCULATIONS = this._getCalculations();

        return [
            {
                name: 'northwest',
                y: CALCULATIONS.decremented_y,
                x: CALCULATIONS.decremented_x
            }, {
                name: 'north',
                y: CALCULATIONS.decremented_y,
                x: this._current_x
            }, {
                name: 'northeast',
                y: CALCULATIONS.decremented_y,
                x: CALCULATIONS.incremented_x
            }, {
                name: 'east',
                y: this._current_y,
                x: CALCULATIONS.incremented_x
            }, {
                name: 'southeast',
                y: CALCULATIONS.incremented_y,
                x: CALCULATIONS.incremented_x
            }, {
                name: 'south',
                y: CALCULATIONS.incremented_y,
                x: this._current_x
            }, {
                name: 'southwest',
                y: CALCULATIONS.incremented_y,
                x: CALCULATIONS.decremented_x
            }, {
                name: 'west',
                y: this._current_y,
                x: CALCULATIONS.decremented_x
            }
        ];
    }

    _getCalculations() {
        return {
            decremented_y: this._current_y - 1,
            decremented_x: this._current_x - 1,
            incremented_y: this._current_y + 1,
            incremented_x: this._current_x + 1,
        };
    }
}