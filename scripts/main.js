'use strict';

const greeting = (function () {
    'use strict';
    const htmlBody = document.querySelector('body');

    const _greeting = document.createElement('h1');
    _greeting.classList.add('greeting');
    _greeting.innerHTML = 'Project-Tic-Tac-Toe';
    htmlBody.appendChild(_greeting);

    const _startBtn = document.createElement('button');
    _startBtn.setAttribute('type', 'button');
    _startBtn.classList.add('introStartBtn');
    _startBtn.innerHTML = 'Start';
    htmlBody.appendChild(_startBtn);

    function startGame() {
        const gameboard = document.querySelector('.main-container');
        
        _greeting.style.display = 'none';
        _startBtn.style.display = 'none';
        
        gameboard.style.display = 'block';
    }

    _startBtn.addEventListener('click', () => startGame());
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