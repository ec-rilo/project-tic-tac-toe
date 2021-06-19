'use strict';

const Player = (name, type) => {
    const win = () => {
        console.log(`Congradulations! ${name} wins!`)
    }
    return { name, type, win }
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

    let playerOne = {};
    let playerTwo = {};

    function getPlayerOne() {
        let _formOne = form(1);
            _formOne.openForm(1);

        let formContainer = document.querySelector('.form-container');

        formContainer.addEventListener('submit', () => {
            let _name = document.getElementById(`player-1`).value;
            playerOne = Player(_name, 'X');

            _formOne.closeForm();
            getPlayerTwo();
        });
    }

    function getPlayerTwo() {
        let _formTwo = form(2);
            _formTwo.openForm(2);

        let formContainer = document.querySelector('.form-container');
        formContainer.addEventListener('submit', () => {
            let _name = document.getElementById('player-2').value;
            playerTwo = Player(_name, 'O');

            _formTwo.closeForm();

            startGame();
        });
    }

    function getPlayers() {
        _startBtn.remove();
        getPlayerOne();
    }

    _startBtn.addEventListener('click', () => getPlayers());


    function startGame() {
        _banner.remove();
        gameboard.style.display = 'block';
    }

    return { playerOne, playerTwo };

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

                    // Checks first row for a win
                    const rowOneTiles = 3;
                    for (let i = 0; i < rowOneTiles; ++i) {
                        // Check if horizontal tiles are matching
                        // Check if tiles 1-3 match
                        let _tile = tilesArr[i];
                        if (_tile.innerHTML === 'null') {
                            return;
                        }
                        else if(_tile) {
                            
                        }
                        
                        // if (_tile.value)
                    };
                });
            });
        }
    }

    app.start();

})();