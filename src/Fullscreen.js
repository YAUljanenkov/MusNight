import React from 'react';
import './App.scss';
import open from './pics/open-fullscreen.png';
import close from './pics/close-fullscreen.png';

class Fullscreen extends React.Component {
    state = {
        isFullScreen: false
    };

    changeView = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            this.setState({isFullScreen: true});
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                this.setState({isFullScreen: false});
            }
        }
    };

    render() {
        return (
            <div className="fullscreen-button">
                {this.state.isFullScreen?
                    <img className="fullscreen-icon" onClick={this.changeView} src={close} alt="close-icon"/>
                    :<img className="fullscreen-icon" onClick={this.changeView} src={open} alt="close-icon"/>}
            </div>
        )
    }
}

export default Fullscreen;