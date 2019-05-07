import React from 'react';
import './App.scss';
import KeyHandler, { KEYDOWN, KEYUP } from 'react-key-handler';
import A from './notes/1.wav'
import B from './notes/2.wav'
import C from './notes/3.wav'
import D from './notes/4.wav'
import E from './notes/5.wav'
import F from './notes/6.wav'
import G from './notes/7.wav'

let $ = require("jquery");

HTMLAudioElement.prototype.stop = function()
{
    this.pause();
    this.currentTime = 0.0;
};

const notes = [A, B, C, D, E, F, G];

class App extends React.Component {


    show_flame = (id) => {
        console.log(`keydown #${id}`);
        $(`#${id}`).animate({opacity: '100'}, 0);
        $(`#audio${id}`).trigger('stop');
        $(`#audio${id}`).trigger('play');
    };

    hide_flame = (id) => {
        console.log(`keyup #${id}`);
        $(`#${id}`).animate({opacity: '0'}, 400);

    };




    render() {
    return(

        <div className="flame_handler">
            {Array(7).fill(0).map((val, index) =>
                <div key={index+1}>
                    <audio src={notes[index]} controls id={`audio${index+1}`} className="audio"/>
                    <KeyHandler
                        keyEventName={KEYDOWN}
                        keyValue={`${index+1}`}
                        onKeyHandle={() => this.show_flame(index+1)}
                    />
                    <KeyHandler
                        keyEventName={KEYUP}
                        keyValue={`${index+1}`}
                        onKeyHandle={() => this.hide_flame(index+1)}
                    />
                <div className="candle" >
                  <div className="flame" id={index+1}>
                    <div className="shadows"></div>
                    <div className="top"></div>
                  </div>
                </div>
                </div>)}
        </div>
    )
  }
}

export default App;
