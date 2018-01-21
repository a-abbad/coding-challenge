import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../containers/nearby-shops/NearbyShops';

it('Home Component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Home
            onTest={() => {console.log('test')}}
        />,
        div
    );
});