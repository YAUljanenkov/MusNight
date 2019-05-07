import React from 'react';
import './App.scss';
import './checkbox.min.css';
import KeyHandler, { KEYDOWN, KEYUP } from 'react-key-handler';
import A from './notes/1.wav'
import B from './notes/2.wav'
import C from './notes/3.wav'
import D from './notes/4.wav'
import E from './notes/5.wav'
import F from './notes/6.wav'
import G from './notes/7.wav'
import Fullscreen from './Fullscreen';

let $ = require("jquery");

HTMLAudioElement.prototype.stop = function()
{
    this.pause();
    this.currentTime = 0.0;
};

const notes = [A, B, C, D, E, F, G];
const classes = [ 'flame-red', 'flame-orange', 'flame-yellow',
    "flame-green", 'flame-blue', 'flame-darkblue', 'flame-violet'];
const elements = [['H', 'Li', "Sr"], ['Ti', 'Cl'], ['Na', 'He'], ['Cu', 'Ba', 'B'], ['Mg'], ['Ca'], ['F']];


class App extends React.Component {
    state = {
        Viz: true,
        Audio: true,
        El: true
    };

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

    toggleViz = () => {
        this.setState({Viz: !this.state.Viz});
    };

    toggleAudio = () => {
        this.setState({Audio: !this.state.Audio});
    };

    toggleElements = () => {
        this.setState({El: !this.state.El});
    };

    render() {
    return(

        <div className="flame_handler">
            {Array(7).fill(0).map((val, index) =>
                <div key={index+1} className="candle-handler" id={index+1}>
                    {this.state.Audio?<audio src={notes[index]} controls id={`audio${index+1}`} className="audio"/>:''}
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
                  {this.state.Viz? <div className={`${classes[index]}`} >
                      <div className="shadows"></div>
                      <div className="top"></div>
                  </div>:''}
                    {this.state.El? <div className="Elements">
                        {elements[index].map((val, index) => <h1 className="element" key={index}>{val}</h1>)}
                    </div>:''}
                </div>
                </div>)}
                <div className="switches">
                    <div className="switch">
                        <span className="text">Визуализация</span>
                        <label className="el-switch">
                            <input type="checkbox" name="switch" defaultChecked onClick={this.toggleViz}/>
                            <span className="el-switch-style"/>
                        </label>
                    </div>
                    <div className="switch">
                        <span className="text">Звук</span>
                        <label className="el-switch">
                            <input type="checkbox" name="switch" defaultChecked onClick={this.toggleAudio}/>
                            <span className="el-switch-style"/>
                        </label>
                    </div>
                    <div className="switch">
                        <span className="text">Элементы</span>
                        <label className="el-switch">
                            <input type="checkbox" name="switch" defaultChecked onClick={this.toggleElements}/>
                            <span className="el-switch-style"/>
                        </label>
                    </div>
                </div>
            <Fullscreen/>
        </div>
    )
  }
}

export default App;
