import React from 'react';
import './App.scss';
import './checkbox.min.css';
import KeyHandler, { KEYDOWN, KEYUP } from 'react-key-handler';
import A from './notes/1.wav';
import B from './notes/2.wav';
import C from './notes/3.wav';
import D from './notes/4.wav';
import E from './notes/5.wav';
import F from './notes/6.wav';
import G from './notes/7.wav';
import beethoven from './files/beetohoven.mp3';
import Fullscreen from './Fullscreen';
import playIcon from './pics/play.png';

let $ = require("jquery");

HTMLAudioElement.prototype.stop = function()
{
    this.pause();
    this.currentTime = 0.0;
};

const notes = [A, B, C, D, E, F, G];
const classes = [ 'flame-red', 'flame-orange', 'flame-yellow',
    "flame-green", 'flame-blue', 'flame-darkblue', 'flame-violet'];
const elements = [['H'], [ 'Cl'], ['Na', ], ['Cu'], ['Mg'], ['Ca'], ['F']];


class App extends React.Component {
    state = {
        Viz: true,
        Audio: true,
        El: true,
        context: false
    };

    Analyse =  () => {
        this.flame_timeouts = Array(8);
        console.log('started')
        if(!this.state.context) {
            let AudioContext = window.AudioContext || window.webkitAudioContext;
            //Создание источника
            this.audio = document.getElementById('beethoven');
            //Создаем аудио-контекст
            this.context = new AudioContext();
            console.log('created')

            this.node = this.context.createScriptProcessor(2048, 1, 1);
            //Создаем анализатор
            this.analyser = this.context.createAnalyser();
            this.analyser.smoothingTimeConstant = 0.3;
            this.analyser.fftSize = 32;
            this.bands = new Uint8Array(this.analyser.frequencyBinCount);
            //Подписываемся на событие
            this.source = this.context.createMediaElementSource(this.audio);
            //связываем источник и анализатором
            this.source.connect(this.analyser);
            //связываем анализатор с интерфейсом, из которого он будет получать данные
            this.analyser.connect(this.node);
            //Связываем все с выходом
            this.node.connect(this.context.destination);
            this.source.connect(this.context.destination);
            //отправляем на обработку в  AudioContext
        }
        else {
            this.context = this.state.context;
        }
        this.setState({Audio: false});
        $('#beethoven').trigger('play');
        //подписываемся на событие изменения входных данных
        this.node.onaudioprocess = () => {
            this.analyser.getByteFrequencyData(this.bands);
            if (!this.audio.paused) {
                for(let i=1; i<=7; i++) {
                    if(this.bands[i] * i *0.8 >=200) {
                        this.show_flame(i);
                        clearTimeout( this.flame_timeouts[i]);
                        this.flame_timeouts[i] = setTimeout(this.hide_flame, 90, i);
                    }
                }
            }
        };
        this.setState({context: this.context});

        return this;
    };

    show_flame = (id) => {
        $(`#${id}`).animate({opacity: '100'}, 0);
        $(`#audio${id}`).trigger('stop');
        $(`#audio${id}`).trigger('play');
    };

    hide_flame = (id) => {
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
            <audio src={beethoven} controls className="audio" id="beethoven"/>
            <div className="play"> <img onClick={this.Analyse} className="play-icon" src={playIcon} alt="play"/> </div>
            <Fullscreen/>
        </div>
    )
  }
}

export default App;
