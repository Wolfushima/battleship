export default function createShip(length) {
    return {
        length,
        healthPoints: length,
        sunk: false,

        hit() {
            if (this.sunk === true) {
                return false;
            }

            this.healthPoints -= 1;

            if (this.healthPoints === 0) {
                this.sunk = true;
            }

            return true;
        },

        isSunk() {
            return this.sunk;
        },

        resetShip() {
            this.healthPoints = length;
            this.sunk = false;
        },
    };
}
