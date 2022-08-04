import createPlayer from './player/player';
import domControl from './dom-control';

const gameControl = {
    initGame: () => {
        const resetGameBtn = document.querySelector('.resetgame-btn');

        const player1 = createPlayer('player');
        const player2 = createPlayer('computer');

        player1.positionShipsRandomly();
        player2.positionShipsRandomly();

        gameControl.renderGameElements(player1, player2);

        gameControl.handlePlayerAttack(player1, player2);

        player1.updateTurn(true);

        const player1GameBoardElement = document.querySelector('.gameboard__player');
        const player2GameBoardElement = document.querySelector('.gameboard__computer');

        resetGameBtn.addEventListener('click', () => {
            player1.playerGameBoard.resetGameBoard();
            player2.playerGameBoard.resetGameBoard();
            player1.positionShipsRandomly();
            player2.positionShipsRandomly();
            domControl.renderShipElements(player1, player1GameBoardElement);
            domControl.renderShipElements(player2, player2GameBoardElement);
            player1.updateTurn(true);
            player2.updateTurn(false);
            player1.resetRandomAttackCoords();
            player2.resetRandomAttackCoords();
        });
    },

    renderGameElements: (player1, player2) => {
        const playerGameBoardElement = domControl.createPlayerGameBoardElements();
        domControl.renderShipElements(player1, playerGameBoardElement.player1GameBoardElement);
        domControl.renderShipElements(player2, playerGameBoardElement.player2GameBoardElement);
    },

    handlePlayerAttack: (player1, player2) => {
        const gameBoardComputer = document.querySelector('.gameboard__computer');
        const computerCells = gameBoardComputer.querySelectorAll('.cell');

        computerCells.forEach((cell) => {
            cell.addEventListener('click', (e) => {
                const { row, collumn } = domControl.gameBoardAttacksCoords;

                if (player1.turn === false || e.target.classList.contains('gameboard__miss') || e.target.classList.contains('gameboard__hit')) {
                    return;
                }

                player1.attack(player2, row, collumn);
                domControl.renderAttacks(player2);

                if (gameControl.isGameOver(player1, player2)) {
                    alert('Game Over: You Won!');
                    return;
                }

                gameControl.handleComputerAttack(player1, player2);
            });
        });
    },

    handleComputerAttack: (player1, player2) => {
        player2.attackRandomly(player1);
        domControl.renderAttacks(player1);

        if (gameControl.isGameOver(player1, player2)) {
            alert('Game Over: You Lost!');
        }
    },

    isGameOver: (player1, player2) => {
        if (player1.playerGameBoard.areShipsSunk() !== true
        && player2.playerGameBoard.areShipsSunk() !== true) {
            return false;
        }
        return true;
    },
};

export default gameControl;
