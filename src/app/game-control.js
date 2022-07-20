import createPlayer from './player/player';
import domControl from './dom-control';

const gameControl = {
    initGame: () => {
        const player1 = createPlayer('player');
        const player2 = createPlayer('computer');

        player1.positionShip(1, 1, 'y', 'destroyer');
        player1.positionShip(1, 2, 'y', 'submarine');
        player1.positionShip(1, 3, 'y', 'cruiser');
        player1.positionShip(1, 4, 'y', 'battleship');
        player1.positionShip(1, 5, 'y', 'carrier');

        player2.positionShip(1, 1, 'x', 'destroyer');
        player2.positionShip(2, 1, 'x', 'submarine');
        player2.positionShip(3, 1, 'x', 'cruiser');
        player2.positionShip(4, 1, 'x', 'battleship');
        player2.positionShip(5, 1, 'x', 'carrier');

        gameControl.renderGameElements(player1, player2);
    },
    renderGameElements: (player1, player2) => {
        const playerGameBoardElement = domControl.createPlayerGameBoardElements();
        domControl.renderShipElements(player1, playerGameBoardElement.player1GameBoardElement);
        domControl.renderShipElements(player2, playerGameBoardElement.player2GameBoardElement);
    },
};

export default gameControl;
