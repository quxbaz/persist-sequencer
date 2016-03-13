import Store from 'store';
import LSAdapter from 'store/lib/adapters/ls/adapter';
import {initModels, setStore} from 'persist-sequencer/lib/localstore';

describe("Sequencer", () => {

  let store;
  let sequencer;

  beforeEach(() => {
    localStorage.clear();
    store = new Store({adapter: new LSAdapter()})
    setStore(store);
    initModels();
    return store.all(['sequencer', 'channel', 'blip']).then(() => {
      sequencer = store.Sequencer.create();
    });
  });

  it("plays and alters its state.", () => {
    sequencer.play();
    sequencer.state.playing.should.be.true;
  });

  it("pauses and alters its state.", () => {
    sequencer.pause();
    sequencer.state.playing.should.be.false;
  });

  it("ticks and advances the beat.", () => {
    let beat = sequencer.state.currentBeat;
    sequencer.tick();
    sequencer.state.currentBeat.should.eql(beat + 1);
    sequencer.tick();
    sequencer.state.currentBeat.should.eql(beat + 2);
  });

  it("ticks for sixteen beats and ends on the last beat.", () => {
    for (let i=0; i < 16; i++)
      sequencer.tick();
    sequencer.state.currentBeat.should.eql(15);
  });

  it("adds a channel.", () => {
    sequencer.take('channels').length.should.eql(0);
    sequencer.addChannel();
    sequencer.take('channels').length.should.eql(1);
  });

  it("publishes a 'playBlip' message.", () => {
    let i = 1;
    sequencer.on('playBlip', (n) => i += n);
    sequencer.trigger('playBlip', 2);
    i.should.eql(3);
  });

  it("expects a blipState and channel on a playBlip event.", (done) => {
    let channel = sequencer.addChannel();
    sequencer.on('playBlip', (blipState, ch) => {
      ch.should.eql(channel);
      done();
    });
    channel.take('blips')[0].play();
  });

});
