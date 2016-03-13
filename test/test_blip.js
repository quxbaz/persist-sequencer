import Store from 'store';
import LSAdapter from 'store/lib/adapters/ls/adapter';
import {initModels, setStore} from 'persist-sequencer/lib/localstore';

describe('Blip', () => {

  let store;
  let blip;

  beforeEach(() => {
    localStorage.clear();
    store = new Store({adapter: new LSAdapter()})
    setStore(store);
    initModels();
    return store.all(['sequencer', 'channel', 'blip']).then(() => {
      blip = store.Blip.create();
    });
  });

  it("blips have unique ids.", () => {
    let ids = new Set();
    for (let i=0; i < 1000; i++)
      ids.add(store.Blip.create().id);
    ids.size.should.eql(1000);
  });

  it("sets gain.", () => {
    blip.setState({gain: 2});
    blip.state.gain.should.eql(2);
  });

  it("sets rate.", () => {
    blip.setState({rate: 2});
    blip.state.rate.should.eql(2);
  });

  it("enforces a max rate.", () => {
    blip.setState({rate: 99});
    blip.state.rate.should.eql(blip.state.maxRate);
  });

  it("enforces a min rate.", () => {
    blip.setState({rate: -1});
    blip.state.rate.should.eql(blip.state.minRate);
  });

  it("enforces a max gain.", () => {
    blip.setState({gain: 99});
    blip.state.gain.should.eql(blip.state.maxGain);
  });

  it("enforces a min gain.", () => {
    blip.setState({gain: -1});
    blip.state.gain.should.eql(blip.state.minGain);
  });

  it("sets a new max gain and validates again it.", () => {
    blip.setState({gain: 99, maxGain: 200});
    blip.state.gain.should.eql(99);
  });

  it("sets a new min gain and validates again it.", () => {
    blip.setState({gain: -2, minGain: -3});
    blip.state.gain.should.eql(-2);
  });

});
