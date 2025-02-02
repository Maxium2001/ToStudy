import React from 'react';
import './Style.css';
import './Function.css';

function HomePage() {
    return (
        <div class="homepage">
        <div class="column">
            <div class="neutral-zone"></div>
            <hr class="separator" />
            <div class="box clickable"></div>
            <div class="box clickable"></div>
            <div class="box clickable"></div>
        </div>
        <div class="column">
            <div class="box clickable"></div>
            <div class="box clickable"></div>
            <div class="box clickable"></div>
        </div>
        <div class="column">
            <div class="box clickable"></div>
            <div class="box clickable"></div>
            <div class="box clickable"></div>
        </div>
    </div>
    );
}
export default HomePage;
