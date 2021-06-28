'use strict';

const Player = (name, type) => {
    let _points = 0;

    let addPoint = () => {
        _points += 1;
    };

    let losePoint = () => {
        _points -= 1;
    };

    let getPoints = () => _points;

    let resetPoints = () => {
        _points = 0;
    };

    const winGame = () => {
        console.log(`Congradulations! ${name} wins!`)
    };

    return { name, type, winGame, addPoint, losePoint, getPoints, resetPoints };
};

const form = (i) => {
    
    const openForm = (i) => {
        let htmlBody = document.querySelector('body');

        let formContainer = document.createElement('form');
        formContainer.classList.add('form-container');
        formContainer.setAttribute('action', '#');
        formContainer.setAttribute('autocomplete', 'off');

        htmlBody.appendChild(formContainer);

        let _textLabel = document.createElement('label');
        _textLabel.classList.add('info-request');
        _textLabel.setAttribute('for', `player-${i}`);
        _textLabel.innerHTML = `Please enter player-${i}`;
        formContainer.appendChild(_textLabel);

        let _textContainer = document.createElement('div');
        _textContainer.classList.add('text-container');
        formContainer.appendChild(_textContainer);

        let _textBox = document.createElement('input');
        _textBox.setAttribute('type', 'text');
        _textBox.setAttribute('id', `player-${i}`);
        _textBox.setAttribute('placeholder', 'Name');
        _textBox.classList.add('input-text-box');
        _textBox.setAttribute('required', '');
        _textContainer.appendChild(_textBox);

        let _submitBtn = document.createElement('button');
        _submitBtn.innerHTML = 'Submit';
        _submitBtn.setAttribute('type', 'submit');
        _submitBtn.setAttribute('id', 'submit-btn');
        _submitBtn.classList.add('submit-btn');
        formContainer.appendChild(_submitBtn);
    };

    const closeForm = () => {
        
        let formContainer = document.querySelector('.form-container');
        formContainer.remove();
    };

    return { openForm, closeForm };
}

const introContent = (function () {
    'use strict';
    
    const htmlBody = document.querySelector('body');
    const gameboard = document.querySelector('.main-container');

    const _banner = document.createElement('h1');
    _banner.classList.add('banner');
    _banner.innerHTML = 'Project-Tic-Tac-Toe';
    htmlBody.appendChild(_banner);

    const _startBtn = document.createElement('button');
    _startBtn.setAttribute('type', 'button');
    _startBtn.classList.add('intro-start-btn');
    _startBtn.innerHTML = 'Start';
    htmlBody.appendChild(_startBtn);

    let _playerOne = {};
    let _playerTwo = {};

    function setPlayerOne() {
        let _formOne = form(1);
            _formOne.openForm(1);

        let formContainer = document.querySelector('.form-container');

        formContainer.addEventListener('submit', () => {
            let _name = document.getElementById(`player-1`).value;
            _playerOne = Player(_name, 'X');

            _formOne.closeForm();
            setPlayerTwo();
        });
    }

    function setPlayerTwo() {
        let _formTwo = form(2);
            _formTwo.openForm(2);

        let formContainer = document.querySelector('.form-container');
        formContainer.addEventListener('submit', () => {
            let _name = document.getElementById('player-2').value;
            _playerTwo = Player(_name, 'O');

            _formTwo.closeForm();

            startGame();
        });
    }

    function getPlayers() {
        _startBtn.remove();
        setPlayerOne();
    }

    _startBtn.addEventListener('click', () => getPlayers());

    const getPlayerOne = () => _playerOne;

    const getPlayerTwo = () => _playerTwo;

    function startGame() {
        _banner.remove();
        gameboard.style.display = 'block';
    }

    return { getPlayerOne, getPlayerTwo };

})();

// Populates program with gameboard.
const gameboard = (function () {
    'use strict';

    let tileContainer = 'undefined';

    let app = {
        initialize: function () {
            
            tileContainer = document.querySelector('.tile-container');
            const _numOfRows = 3;
            for (let i = 0; i < _numOfRows; ++i) {
                let _row = document.createElement('div');
                _row.classList.add('rows');
                _row.classList.add(`row-${i + 1}`);

                for (let j = 0; j < 3; ++j) {
                    let _tile = document.createElement('div');
                    _tile.setAttribute('class', 'tiles');
                    _row.appendChild(_tile);
                }

                tileContainer.appendChild(_row);
            }

            const _tiles = Array.from(document.querySelectorAll('.tiles'));
            const _numOfTiles = _tiles.length;
            for (let i = 0; i < _numOfTiles; ++i) {
                _tiles[i].classList.add(`tile-${i + 1}`);
                _tiles[i].setAttribute('data-tile-num', `${i + 1}`);
            }
        }, 
    };

    app.initialize();
    
})();

const game = (function () {

    let gameboardArr = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
    let playCounter = 0;

    let app = {

        start: function () {

            let playerOne = '';
            let playerTwo = '';
            let htmlBody = document.querySelector('body');

            function getPlayers() {
                playerOne = introContent.getPlayerOne();
                playerTwo = introContent.getPlayerTwo();
                mainContainer.removeEventListener('click', getPlayers);
            }

            let mainContainer = document.querySelector('.main-container');
            mainContainer.addEventListener('click', getPlayers);
            
            const tilesArr = Array.from(document.querySelectorAll('.tiles'));
            tilesArr.forEach(tile => {
                tile.addEventListener('click', () => {
                    if (tile.innerHTML !== '') {
                        return;
                    }
                    else if (playCounter % 2 === 0) {
                        tile.innerHTML = gameboardArr[playCounter];
                        ++playCounter;
                    }
                    else {
                        tile.innerHTML = gameboardArr[playCounter];
                        ++playCounter;
                    }

                    // Checks rows for a win
                    // i is the row we are checking.
                    const _numOfRows = 3;
                    for (let i = 0; i < _numOfRows; ++i) {
                        
                        if (i === 0) {

                            let _numOfTiles = 3;
                            for (let j = 0; j < _numOfTiles; ++j) {
                                
                                let _currTile = document.querySelector(`.tile-${j + 1}`);
                                if (_currTile.innerHTML === "X") {
                                    playerOne.addPoint();
                                }
                                else if (_currTile.innerHTML === "O") {
                                    playerTwo.addPoint();
                                }
                            }

                            if (playerOne.getPoints() === 3) {
                                restartGame(playerOne);
                            }
                            else if (playerTwo.getPoints() === 3) {
                                restartGame(playerTwo);
                            }

                            playerOne.resetPoints();
                            playerTwo.resetPoints();
                        }

                        if (i === 1) {

                            let _numOfTiles = 6;
                            for (let j = 3; j < _numOfTiles; ++j) {
                                
                                let _currTile = document.querySelector(`.tile-${j + 1}`);
                                if (_currTile.innerHTML === "X") {
                                    playerOne.addPoint();
                                }
                                else if (_currTile.innerHTML === "O") {
                                    playerTwo.addPoint();
                                }
                            }

                            if (playerOne.getPoints() === 3) {
                                restartGame(playerOne);
                            }
                            else if (playerTwo.getPoints() === 3) {
                                restartGame(playerTwo)
                            }
                            
                            playerOne.resetPoints();
                            playerTwo.resetPoints();
                        }

                        if (i === 2) {

                            let _numOfTiles = 9;
                            for (let j = 6; j < _numOfTiles; ++j) {
                                
                                let _currTile = document.querySelector(`.tile-${j + 1}`);
                                if (_currTile.innerHTML === "X") {
                                    playerOne.addPoint();
                                }
                                else if (_currTile.innerHTML === "O") {
                                    playerTwo.addPoint();
                                }
                            }

                            if (playerOne.getPoints() === 3) {
                                restartGame(playerOne);
                            }
                            else if (playerTwo.getPoints() === 3) {
                                restartGame(playerTwo);
                            }
                            
                            playerOne.resetPoints();
                            playerTwo.resetPoints();
                        }
                    };

                    // Diagonal win checks
                    const numOfDiags = 2;
                    for (let i = 0; i < numOfDiags; ++i) {

                        if (i === 0) {
                            const _numOfTiles = 9;
                            for (let j = 0; j < _numOfTiles; ++j) {
                                let _currTile = document.querySelector(`.tile-${j + 1}`);
                                let _currTileNum = _currTile.dataset.tileNum;
                                console.log(_currTileNum);
                                let _currTileClassName = _currTile.className;
                                
                                if (_currTileClassName === 'tiles tile-1' && _currTile.innerHTML === 'X') {
                                    playerOne.addPoint();
                                }
                                else if (_currTileClassName === 'tiles tile-1' && _currTile.innerHTML === 'O') {
                                    playerTwo.addPoint();
                                }
                                else if (_currTileClassName === "tiles tile-5" && _currTile.innerHTML === 'X') {
                                    playerOne.addPoint();
                                }
                                else if (_currTileClassName === 'tiles tile-5' && _currTile.innerHTML === 'O') {
                                    playerTwo.addPoint();
                                }
                                else if (_currTileClassName === 'tiles tile-9' && _currTile.innerHTML === 'X') {
                                    playerOne.addPoint();
                                } 
                                else if(_currTileClassName === 'tiles tile-9' && _currTile.innerHTML === 'O') {
                                    playerTwo.addPoint();
                                }
                            }

                            if (playerOne.getPoints() === 3) {
                                restartGame(playerOne);
                            }
                            else if (playerTwo.getPoints() === 3) {
                                restartGame(playerTwo);
                            }
                            
                            playerOne.resetPoints();
                            playerTwo.resetPoints();
                        }

                        if (i === 1) {
                            const _numOfTiles = 9;
                            for (let j = 0; j < _numOfTiles; ++j) {
                                let _currTile = document.querySelector(`.tile-${j + 1}`);
                                let _currTileClassName = _currTile.className;
                                
                                if (_currTileClassName === 'tiles tile-3' && _currTile.innerHTML === 'X') {
                                    playerOne.addPoint();
                                }
                                else if (_currTileClassName === 'tiles tile-3' && _currTile.innerHTML === 'O') {
                                    playerTwo.addPoint();
                                }
                                else if (_currTileClassName === "tiles tile-5" && _currTile.innerHTML === 'X') {
                                    playerOne.addPoint();
                                }
                                else if (_currTileClassName === 'tiles tile-5' && _currTile.innerHTML === 'O') {
                                    playerTwo.addPoint();
                                }
                                else if (_currTileClassName === 'tiles tile-7' && _currTile.innerHTML === 'X') {
                                    playerOne.addPoint();
                                } 
                                else if(_currTileClassName === 'tiles tile-7' && _currTile.innerHTML === 'O') {
                                    playerTwo.addPoint();
                                }
                            }

                            if (playerOne.getPoints() === 3) {
                                restartGame(playerOne);
                            }
                            else if (playerTwo.getPoints() === 3) {
                                restartGame(playerTwo);
                            }
                            
                            playerOne.resetPoints();
                            playerTwo.resetPoints();
                        }
                    }

                    // Column win checks
                    const _numOfColumns = 3;
                    for (let i = 0; i < _numOfColumns; ++i) {
                        
                        let _numOfTiles = 9;
                        if (i === 0) {
                            for (let j = 0; j < _numOfTiles; ++j) {
                                let _currTile = document.querySelector(`.tile-${j + 1}`);
                                let _currTileClassName = _currTile.className;
                                
                                if (_currTileClassName === 'tiles tile-1' && _currTile.innerHTML === 'X') {
                                    playerOne.addPoint();
                                }
                                else if (_currTileClassName === 'tiles tile-1' && _currTile.innerHTML === 'O') {
                                    playerTwo.addPoint();
                                }
                                else if (_currTileClassName === "tiles tile-4" && _currTile.innerHTML === 'X') {
                                    playerOne.addPoint();
                                }
                                else if (_currTileClassName === 'tiles tile-4' && _currTile.innerHTML === 'O') {
                                    playerTwo.addPoint();
                                }
                                else if (_currTileClassName === 'tiles tile-7' && _currTile.innerHTML === 'X') {
                                    playerOne.addPoint();
                                } 
                                else if(_currTileClassName === 'tiles tile-7' && _currTile.innerHTML === 'O') {
                                    playerTwo.addPoint();
                                }
                            }

                            if (playerOne.getPoints() === 3) {
                                restartGame(playerOne);
                            }
                            else if (playerTwo.getPoints() === 3) {
                                restartGame(playerTwo);
                            }
                            
                            playerOne.resetPoints();
                            playerTwo.resetPoints();
                        }
                    }
                });
            });

            function restartGame(player) {
                mainContainer.style.display = 'none';

                let winnerDisplay = document.createElement('div');
                winnerDisplay.classList.add('winner-display');
                winnerDisplay.innerHTML = `${player.name} wins!`;
                htmlBody.appendChild(winnerDisplay);
        
                let playAgainBtn = document.createElement('button');
                playAgainBtn.setAttribute('type', 'button');
                playAgainBtn.innerHTML = 'Play again?';
                playAgainBtn.classList.add('play-again-btn');
                htmlBody.appendChild(playAgainBtn);
        
                playAgainBtn.addEventListener('click', function test() {
                    winnerDisplay.style.display = 'none';
                    playAgainBtn.style.display = 'none';
                    mainContainer.style.display = 'block';
        
                    const tilesArr = Array.from(document.querySelectorAll('.tiles'));
                    tilesArr.forEach(tile => {
                        tile.innerHTML = '';
                    });
                    gameboardArr = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
                    playCounter = 0;
        
                    
                    playerOne.resetPoints();
                    playerTwo.resetPoints();
                });
            }
        }
    }

    app.start();

})();