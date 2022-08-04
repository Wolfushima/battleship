const domControl = {
    gameBoardAttacksCoords: { row: null, collumn: null },

    createPlayerGameBoardElements: () => {
        const gameBoardElement = document.querySelector('.gameboard');
        const player1GameBoardElement = domControl.createGameBoardGridElement(10, 'player');
        const player2GameBoardElement = domControl.createGameBoardGridElement(10, 'computer');

        const player1TitleElement = document.createElement('div');
        player1TitleElement.classList.add('player-title');

        const player2TitleElement = document.createElement('div');
        player2TitleElement.classList.add('computer-title');

        const player1ContainerElement = document.createElement('div');
        const player2ContainerElement = document.createElement('div');
        player1ContainerElement.classList.add('player-container');
        player2ContainerElement.classList.add('computer-container');

        gameBoardElement.appendChild(player1ContainerElement);
        gameBoardElement.appendChild(player2ContainerElement);

        player1ContainerElement.appendChild(player1GameBoardElement);
        player2ContainerElement.appendChild(player2GameBoardElement);

        player1ContainerElement.insertBefore(player1TitleElement, player1GameBoardElement);
        player2ContainerElement.insertBefore(player2TitleElement, player2GameBoardElement);

        return {
            player1GameBoardElement,
            player2GameBoardElement,
        };
    },

    createGameBoardGridElement: (size, player) => {
        const gameBoard = document.createElement('div');
        gameBoard.classList.add(`gameboard__${player}`);

        let row = 0;
        let collumn = 0;

        for (let i = 0; i < size * size; i += 1) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', domControl.handleAttacks);
            gameBoard.appendChild(cell);
            if (collumn > 9) {
                collumn = 0;
                row += 1;
            }
            cell.dataset.row = row;
            cell.dataset.collumn = collumn;
            collumn += 1;
        }
        return gameBoard;
    },

    renderShipElements: (player, playerGameBoardElement) => {
        for (let i = 0; i < playerGameBoardElement.children.length; i += 1) {
            playerGameBoardElement.children[i].setAttribute('class', 'cell');
        }

        for (let i = 0; i < player.playerGameBoard.gameBoard.length; i += 1) {
            const indexOfShips = player.playerGameBoard.gameBoard[i].reduce((acc, curr, index) => {
                if (curr === 'destroyer' || curr === 'submarine' || curr === 'cruiser' || curr === 'battleship' || curr === 'carrier') {
                    acc.push([index, curr]);
                }
                return acc;
            }, []);

            indexOfShips.forEach((index) => {
                if (index[1] === 'destroyer') {
                    playerGameBoardElement.children[index[0] + (i * 10)].classList.add('gameboard__destroyer');
                }
                if (index[1] === 'submarine') {
                    playerGameBoardElement.children[index[0] + (i * 10)].classList.add('gameboard__submarine');
                }
                if (index[1] === 'cruiser') {
                    playerGameBoardElement.children[index[0] + (i * 10)].classList.add('gameboard__cruiser');
                }
                if (index[1] === 'battleship') {
                    playerGameBoardElement.children[index[0] + (i * 10)].classList.add('gameboard__battleship');
                }
                if (index[1] === 'carrier') {
                    playerGameBoardElement.children[index[0] + (i * 10)].classList.add('gameboard__carrier');
                }
            });
        }
    },

    renderAttacks: (player) => {
        const playerGameBoardElement = document.querySelector(`.gameboard__${player.name}`);
        const { gameBoard } = player.playerGameBoard;

        gameBoard.forEach((row, index) => {
            const indexOfAttacks = row.reduce((acc, curr, i) => {
                if (curr === 'miss' || curr === 'hit') {
                    acc.push([i, curr]);
                }
                return acc;
            }, []);

            indexOfAttacks.forEach((i) => {
                if (i[1] === 'miss') {
                    playerGameBoardElement.children[i[0] + (index * 10)].classList.add('gameboard__miss');
                }
                if (i[1] === 'hit') {
                    playerGameBoardElement.children[i[0] + (index * 10)].classList.add('gameboard__hit');
                }
            });
        });
    },

    handleAttacks: (e) => {
        domControl.gameBoardAttacksCoords = { row: null, collumn: null };
        domControl.gameBoardAttacksCoords.row = e.target.dataset.row;
        domControl.gameBoardAttacksCoords.collumn = e.target.dataset.collumn;
    },
};

export default domControl;
