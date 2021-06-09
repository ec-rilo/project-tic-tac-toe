'use strict';

(function () {
    'use strict';

    let tileContainer = 'undefined';

    let app = {
        initialize: function () {
            
            tileContainer = document.querySelector('.tile-container');
            const _numOfTiles = 3;
            for (let i = 0; i < _numOfTiles; ++i) {
                let _row = document.createElement('div');
                _row.setAttribute('class', 'row');

                for (let j = 0; j < 3; ++j) {
                    let _tile = document.createElement('div');
                    _tile.setAttribute('class', 'tiles');
                    _row.appendChild(_tile);
                }

                tileContainer.appendChild(_row);
            }
        },
    };

    app.initialize();
})();
