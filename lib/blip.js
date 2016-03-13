/*
  blip
*/

import {assign} from './util';
import {Record} from 'store';

export default class Blip extends Record {

  constructor(state={}, props) {
    super(state, props);
  }

  validateState(newState) {
    let state = super.validateState(newState);
    state.gain = Math.min(state.gain, state.maxGain);
    state.gain = Math.max(state.gain, state.minGain);
    state.rate = Math.min(state.rate, state.maxRate);
    state.rate = Math.max(state.rate, state.minRate);
    return state;
  }

  play() {
    this.trigger('play', this.state);
  }

}
