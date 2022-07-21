import createPlayer from './player/player';
import domControl from './dom-control';

const gameControl = {
    initGame: () => {
        const player1 = createPlayer('player');
        const player2 = createPlayer('computer');

        player1.positionShipsRandomly();
        player2.positionShipsRandomly();

        gameControl.renderGameElements(player1, player2);
    },
    renderGameElements: (player1, player2) => {
        const playerGameBoardElement = domControl.createPlayerGameBoardElements();
        domControl.renderShipElements(player1, playerGameBoardElement.player1GameBoardElement);
        domControl.renderShipElements(player2, playerGameBoardElement.player2GameBoardElement);
    },
};

export default gameControl;
