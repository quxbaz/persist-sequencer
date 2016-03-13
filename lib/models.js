import {attr, belongsTo, hasMany} from 'store/lib/relations';
import Sequencer from './sequencer';
import Channel from './channel';
import Blip from './blip';

export function init(store) {

  store.define('sequencer', {
    RecordClass: Sequencer,
    schema: {
      id: attr(),
      playing: attr(false),
      currentBeat: attr(-1),
      beats: attr(16),
      beatDuration: attr(200),
      channels: hasMany('channel')
    }
  });

  store.define('channel', {
    RecordClass: Channel,
    schema: {
      id: attr(),
      number: attr(),
      title: attr(''),
      beats: attr(16),
      solo: attr(false),
      mute: attr(false),
      sample: attr(),
      color: attr('#ff00ff'),
      time_created: attr(),
      archived: attr(false),
      sequencer: belongsTo('sequencer'),
      blips: hasMany('blip'),
      preset: belongsTo('preset')
    }
  });

  store.define('blip', {
    RecordClass: Blip,
    schema: {
      id: attr(),
      beat: attr(),
      sample: attr(),
      mute: attr(false),
      duration: attr(0),
      offset: attr(0),
      minOffset: attr(0),
      maxOffset: attr(0),
      gain: attr(1),
      minGain: attr(0),
      maxGain: attr(10),
      rate: attr(1),
      minRate: attr(0),
      maxRate: attr(4),
      unmixed: attr(true),
      channel: belongsTo('channel')
    }
  });

}
