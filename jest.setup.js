import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useLocation: jest.fn().mockReturnValue({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: '5nvxpbdafa'
    }),
    useHistory: jest.fn().mockReturnValue({
      length: 2,
      action: 'POP',
      push: jest.fn(),
      location: {
        pathname: '/',
        search: '',
        hash: ''
      }
    })
  };
});
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn(() => {
    return {
      matches: true,
      addListener: jest.fn(),
      removeListener: jest.fn()
    };
  })
});

global.window.HTMLMediaElement.prototype._mock = {
  paused: true
};

// Get "paused" value, it is automatically set to true / false when we play / pause the audio.
Object.defineProperty(global.window.HTMLMediaElement.prototype, 'paused', {
  get() {
    return this._mock.paused;
  }
});

// Start the playback.
global.window.HTMLMediaElement.prototype.play = function playMock() {
  this._mock.paused = false;
};

// Start the playback.
global.window.HTMLMediaElement.prototype.pause = function pauseMock() {
  this._mock.paused = true;
};
