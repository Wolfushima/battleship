const domControl = {
    createPlayerGameBoardElements: () => {
        const gameBoardElement = document.querySelector('.gameboard');
        const player1GameBoardElement = domControl.createGameBoardGridElement(10, 'player');
        const player2GameBoardElement = domControl.createGameBoardGridElement(10, 'computer');

        gameBoardElement.appendChild(player1GameBoardElement);
        gameBoardElement.appendChild(player2GameBoardElement);

        return {
            player1GameBoardElement,
            player2GameBoardElement,
        };
    },
    createGameBoardGridElement: (size, player) => {
        const gameBoard = document.createElement('div');
        gameBoard.classList.add(`gameboard__${player}`);

        for (let i = 0; i < size * size; i += 1) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            gameBoard.appendChild(cell);
        }
        return gameBoard;
    },
    renderShipElements: (player, playerGameBoardElement) => {
        for (let i = 0; i < player.playerGameBoard.gameBoard.length; i += 1) {
            const indexOfShips = player.playerGameBoard.gameBoard[i].reduce((acc, curr, index) => {
                if (curr === 'destroyer' || curr === 'submarine' || curr === 'cruiser' || curr === 'battleship' || curr === 'carrier') {
                    acc.push(index);
                }
                return acc;
            }, []);

            indexOfShips.forEach((index) => {
                playerGameBoardElement.children[index + (i * 10)].style.backgroundColor = 'red';
            });
        }
    },
};

export default domControl;
