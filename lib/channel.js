/*
  channel
*/

import {Record} from 'store';
import {getStore} from './localstore';
import {assign} from './util';

export default class Channel extends Record {

  constructor(state={}, props) {
    super(state, props);
    if (this.state.id === undefined)
      this._addBlips();
    // this._listenToBlips();
  }

  take(attr) {
    // Blips can be cached since they are never expected to be
    // destroyed unless this record is also destroyed.
    if (!this._cachedBlips)
      this._cachedBlips = super.take(attr);
    return this._cachedBlips;
  }

  _addBlips() {
    for (let i=0; i < this.state.beats; i++) {
      getStore().Blip.create({
        channel: this.cid,
        beat: i,
        mute: true,
        sample: this.state.sample
      });
    }
  }

  _listenToBlips() {
    this.take('blips').forEach((blip) => {
      blip.on('play', () => this.trigger('playBlip', blip, this));
    });
  }

  playBeat(beat) {
    if (!this.state.mute) {
      this.take('blips').forEach((blip) => {
        blip.play();
      });
    }
  }

}
