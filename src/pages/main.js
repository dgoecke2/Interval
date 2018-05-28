import React, {Component} from 'react';
import { Text, View, ProgressViewIOS } from 'react-native';

// import LinearGradient from 'react-native-linear-gradient';
import { Header, Button, Card, CardSection, Input, Spinner, Footer, ConfirmPopup } from './../common';
import styles from './main-styles';
import SoundPlayer from 'react-native-sound-player';

class Main extends Component {

    //State values: 0 - stopped, 1 - started, 2 - paused, 3 - countdown
    state = { rounds: 0, timeOn: 0, timeOff: 0, appState: 0, progress: 0, timer: null, totalTimeInSeconds: 0, secondsPerRest: 0, secondsPerRound: 0, elapsedRounds: 0, elapsedSeconds: 0, roundCountDown: 0, inputErr: '', restStatus: false};

   // subscribe to the finished playing event in componentDidMount
    componentDidMount() {
        SoundPlayer.onFinishedPlaying((success) => { // success is true when the sound is played
            console.log('finished playing', success);
        });
    }
    
    // unsubscribe when unmount
    componentWillUnmount() {
        SoundPlayer.unmount();
    }

    renderButton() {
        if(this.state.appState === 0) {
            return (
                <Button onPress={this.startClicked.bind(this)}>
                    Start
                </Button>
            );
        } else if(this.state.appState === 1) {
            return (
                <Button onPress={this.pause.bind(this)}>
                    Pause
                </Button>
            );
        } else if(this.state.appState === 2) {
            return (
                <View style={styles.container}>
                    <View style={styles.flexContainer}>
                        <Button onPress={this.resume.bind(this)}>
                            Resume
                        </Button>
                    </View>
                    <View style={styles.flexContainer}>
                        <Button onPress={this.stop.bind(this)}>
                            End
                        </Button>
                    </View>
                </View>
            );
        } else {
            return(
                <View style={styles.flexContainer}>
                    <Text style={styles.readyText}>Ready...</Text>
                </View>
            );
        }
    }

    stop() {
        //TODO Show popup to confirm ending interval timer
        clearInterval(this.state.timer);
        this.setState({ rounds: 0, timeOn: 0, timeOff: 0, appState: 0, progress: 0, timer: null, totalTimeInSeconds: 0, secondsPerRest: 0, secondsPerRound: 0, elapsedRounds: 0, elapsedSeconds: 0, roundCountDown: 0, inputErr: '', restStatus: false });
    }

    countDown(onComplete) {
        //Play 3 beeps
        for(let num = 0; num < 4; num++) {
            setTimeout(() => {
                num < 3 ? this.playBeep() : onComplete();
            }, parseInt(`${num}000`, 10));        
        };
    }

    startClicked() {
        if(this.validateInput()) {
            this.countDown(this.start.bind(this));
            this.setState({appState: 3});
        }
    }

    start() {
        //Total seconds, including time on and off. Last round doesn't have time off
        let total = (this.state.timeOn * 60 * this.state.rounds) + (this.state.timeOff * 60 * this.state.rounds);
        this.setState({ 
            inputErr : '',
            appState: 1, 
            elapsedRounds: 1,
            elapsedSeconds: 0,
            totalTimeInSeconds : total, 
            secondsPerRound : total / this.state.rounds,
            secondsPerRest : this.state.timeOff * 60,
            roundCountDown: (total / this.state.rounds) - (this.state.timeOff * 60)
        });

        let timer = setInterval(this.tick.bind(this), 1000);
        this.setState({timer});
    }

    resume() {
        this.setState({ appState: 1 });

        let timer = setInterval(this.tick.bind(this), 1000);
        this.setState({timer});
    }

    pause() {
        clearInterval(this.state.timer);
        this.setState({ appState: 2 });
    }

    tick() {
        let timeValue = (this.state.elapsedSeconds - (this.state.secondsPerRound * (this.state.elapsedRounds-1)));

        if(timeValue === (this.state.secondsPerRound - this.state.secondsPerRest)) {
            //If complete round with timeOn is completed, now to complete rest timeOff
            this.playBeep();
            this.setState({roundCountDown: this.state.secondsPerRest, restStatus: true});
        } else if(timeValue === this.state.secondsPerRound - 3) {
            this.countDown(this.roundFinished.bind(this));
        }

         this.setState({
            elapsedSeconds: this.state.elapsedSeconds + 1,
            roundCountDown: this.state.roundCountDown - 1
        });
    }

    roundFinished() {
        //Check if total number of rounds have completed
        if(this.state.elapsedSeconds === this.state.totalTimeInSeconds) {
            //TODO Play celebratory sound

            //All intervals are completed
            clearInterval(this.state.timer);
            this.stop();
        } else {
            //Once a round is complete, increment rounds completed and reset roundCountDown seconds
            this.setState({
                elapsedRounds: this.state.elapsedRounds + 1, 
                roundCountDown: this.state.secondsPerRound-this.state.secondsPerRest, 
                restStatus: false
            });
        }
    }

    getProgress() {
        return this.state.elapsedSeconds / this.state.totalTimeInSeconds;
    }

    getRoundTitle() {
        return 'Round ' + (this.state.elapsedRounds > 0 ? this.state.elapsedRounds: '');
    }

    playBeep() {
        try {
            SoundPlayer.playSoundFile('Beep_Short', 'mp3');
        } catch (e) {
            console.log(`cannot play Beep_Short sound file`, e);
        }
    }

    errText() {
        if(this.state.inputErr.length > 0) {
            return (
                <CardSection>
                    <Text style={styles.errTextStyle} >{this.state.inputErr}</Text>
                </CardSection>
            );
        }
    }

    validateInput() {
        let err = '';
        let valid = true;
        //Make sure all input info is there
        if(this.state.timeOn === 0 || this.state.timeOff === 0  || !this.state.rounds === 0 ) {
            err = 'Oops! Looks like you missed some info';
            valid = false;
        }
        this.setState({inputErr : err});
        return valid;

    }

    convertMMSS(time) {
        let sec_num = parseInt(time, 10);
        let hours   = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);

        //Prepend 0 for single digit times
        hours < 10 ? hours = "0" + hours : '';
        minutes< 10 ? minutes = "0" + minutes: '';
        seconds < 10 ? seconds = "0" + seconds: '';

        return `${minutes} : ${seconds}`;
    }

    render() {
        return (
            <View style={styles.flexContainer}>
                <View>
                    <Card>
                        <CardSection>
                            <View style={styles.progressContainer}>
                                <Text style={styles.roundInfo}>Round {this.state.elapsedRounds} / {this.state.rounds} </Text>
                                <ProgressViewIOS progress={this.getProgress()} progressTintColor={ '#ffc600' }  trackTintColor={ '#F66' } style={styles.progressBar} />
                            </View>
                        </CardSection>

                        <CardSection>
                            <View style={styles.clockContainer}>
                                {
                                    this.state.restStatus && <Text style={[styles.clockTitle, styles.restText]}>REST</Text>
                                }
                                {
                                    !this.state.restStatus && <Text style={styles.clockTitle}>{this.getRoundTitle()}</Text>
                                }
                                <Text style={[styles.clock, this.state.restStatus ? styles.restText : '']}>{ this.convertMMSS(this.state.roundCountDown) }</Text>
                            </View>
                            <View style={styles.clockContainer}>
                                <Text style={styles.clockTitle}>Total Time</Text>
                                <Text style={styles.clock}>{ this.convertMMSS(this.state.elapsedSeconds) }</Text>
                            </View>
                        </CardSection>

                        <CardSection>
                            <Input
                                placeholder="rounds"
                                label="Rounds"
                                value={this.state.rounds}
                                onChangeText={rounds => this.setState({ rounds })}
                                editable={(this.state.appState === 0)}
                                keyboardType="numeric"
                            />
                        </CardSection>

                        <CardSection>
                            <Input
                                placeholder="minutes"
                                label="Time On"
                                value={this.state.timeOn}
                                onChangeText={timeOn => this.setState({ timeOn })}
                                editable={(this.state.appState === 0)}
                                keyboardType="numeric"
                            />
                        </CardSection>

                        <CardSection>
                            <Input
                                placeholder="minutes"
                                label="Time Off"
                                value={this.state.timeOff}
                                onChangeText={timeOff => this.setState({ timeOff })}
                                editable={(this.state.appState === 0)}
                                keyboardType="numeric"
                            />
                        </CardSection>

                        { this.errText() }
                    </Card>
                </View>
                <View style={styles.stickyFooter}>{this.renderButton()}</View>
            </View>
        );
    };
};

export default Main;