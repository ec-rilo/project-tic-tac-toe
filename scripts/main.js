'use strict';

// Populates program with gameboard.
const gameboard = (function () {
    'use strict';

    let tileContainer = 'undefined';
    let gameboardArr = ['x', 'x', 'x', 'o', 'o', 'o', 'x', 'x', 'x'];

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

            for (let i = 0; i < _numOfTiles; ++i) {
                _tiles[i].innerHTML = gameboardArr[i];
            }
        }
    };

    app.initialize();
})();


