import Store from 'store';
import LSAdapter from 'store/lib/adapters/ls/adapter';
import {initModels, setStore} from 'persist-sequencer/lib/localstore';

describe('Channel', () => {

  let store;
  let channel;

  beforeEach(() => {
    localStorage.clear();
    store = new Store({adapter: new LSAdapter()})
    setStore(store);
    initModels();
    return store.all(['sequencer', 'channel', 'blip']).then(() => {
      channel = store.Channel.create();
    });
  });

  it("creates default Blip objects that are mute.", () => {
    channel.take('blips').forEach((blip) => {
      blip.state.mute.should.be.true;
    });
  });

  it("creates default Blip objects with the same @sample state as its own.", () => {
    channel = store.Channel.create({sample: 'kick'})
    channel.take('blips').forEach((blip) => {
      blip.state.sample.should.eql('kick');
    });
  });

  it("does not play a beat if it's mute.", () => {
    let i = 0;
    channel.take('blips')[0].play = () => i++;
    channel.playBeat(0);
    i.should.eql(1);
    channel.setState({mute: true});
    channel.playBeat(0);
    i.should.eql(1);
    channel.setState({mute: false});
    channel.playBeat(0);
    i.should.eql(2);
  });

  it("creates blips with the correct beat property.", () => {
    for (let i=0; i < channel.state.beats; i++)
      channel.take('blips')[i].state.beat.should.eql(i);
  });

});
