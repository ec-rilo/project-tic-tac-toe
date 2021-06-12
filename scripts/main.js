'use strict';

const Player = (i) => {
    const htmlBody = document.querySelector('body');

    function openNewForm() {

        let clicked = false;

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
        _textBox.setAttribute('required', '');
        _textBox.setAttribute('id', `player-${i}`);
        _textBox.setAttribute('placeholder', 'Name');
        _textBox.classList.add('input-text-box');
        _textContainer.appendChild(_textBox);

        let submitBtn = document.createElement('button');
        submitBtn.innerHTML = 'Submit';
        submitBtn.setAttribute('type', 'submit');
        submitBtn.classList.add('submit-btn');
        formContainer.appendChild(submitBtn);
        console.log(_textBox.value);
    }

        return {
            openForm: openNewForm()
        }
}

const intro = (function () {
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

    function startGame() {
        banner.remove();
        gameboard.style.display = 'block';
    }

    function getPlayerInfo() {
        _startBtn.remove();

        const player1 = Player(1);
        player1.openNewForm;
    }


    _startBtn.addEventListener('click', () => getPlayerInfo());
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

    let gameboardArr = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'];
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
                        console.log(playCounter);
                    }
                    else {
                        tile.innerHTML = gameboardArr[playCounter];
                        ++playCounter;
                        console.log(playCounter)
                    }
                });
            });
        }
    }

    app.start();

})();