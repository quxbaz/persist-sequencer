/*
  sequencer
*/

import {getStore} from './localstore';
import {assign} from './util';
import {Record} from 'store';
import Timer from 'timer.js';

export default class Sequencer extends Record {

  constructor(state={}, props) {
    super(state, props);
    this._createTimer();
  }

  _createTimer() {
    this.timer = new Timer({tickInterval: this.state.beatDuration});
    this.timer.on('tick', () => {
      if (this.state.playing)
        this.tick();
    });
    this.timerStarted = false;
  }

  play() {
    this.setState({playing: true});
    if (!this.timerStarted) {
      this.timer.start();
      this.timerStarted = true;
    }
  }

  pause() {
    this.setState({playing: false});
  }

  tick() {
    /*
      Plays a beat and moves onto the next one.
    */
    this.advanceBeat();
    this.playCurrentBeat();
  }

  playCurrentBeat() {
    this.take('channels').forEach((channel) => {
      channel.playBeat(this.state.currentBeat);
    });
  }

  advanceBeat() {
    this.setState({
      currentBeat: (this.state.currentBeat + 1) % this.state.beats
    });
  }

  addChannel(state={}) {
    let channel = getStore().Channel.create(assign(state, {
      sequencer: this.cid
    }));
    channel.on('playBlip', (blip, channel) => {
      this.trigger('playBlip', blip.state, channel);
    });
    return channel;
  }

}
