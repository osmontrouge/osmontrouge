import { encode, decode, encodePosition, decodePosition, encodeFeatures, decodeFeatures } from '../js/url';

describe('URL Params', () => {
  describe('encode', () => {
    it('the features and the position from an empty screen', () => {
      const url = encode('', '');
      expect(url).toEqual('');
    });

    it('the features and the position', () => {
      const url = encode('test=test1', '@1');
      expect(url).toEqual('test=test1@1');
    });
  });

  describe('decode', () => {
    it('an empty an empty string', () => {
      const { features, location } = decode('');
      expect(features).toEqual('');
      expect(location).toEqual('');
    });

    it('only the position', () => {
      const { features, location } = decode('@1.23,4.32,6');
      expect(features).toEqual('');
      expect(location).toEqual('@1.23,4.32,6');
    });

    it('only the features', () => {
      const { features, location } = decode('test=A');
      expect(features).toEqual('test=A');
      expect(location).toEqual('');
    });

    it('the features and the location', () => {
      const { features, location } = decode('test=A@1.23');
      expect(features).toEqual('test=A');
      expect(location).toEqual('@1.23');
    });
  });

  describe('decodePosition', () => {
    it('with the default values', () => {
      const { lat, lng, zoom } = decodePosition('', {
        mapCenter: [1, 2],
        mapZoom: 4
      });
      expect(lat).toEqual(2);
      expect(lng).toEqual(1);
      expect(zoom).toEqual(4);
    });

    it('with a correct url', () => {
      const { lat, lng, zoom } = decodePosition('@1.23,4.32,6', {
        mapCenter: [1, 2],
        mapZoom: 4
      });
      expect(lat).toEqual(1.23);
      expect(lng).toEqual(4.32);
      expect(zoom).toEqual(6);
    });
  });

  describe('encodePosition', () => {
    it('encode the position', () => {
      const position = encodePosition(1.12345678, 3.67891234, 4.321);
      expect(position).toEqual('@1.123457,3.678912,4.32');
    });
  });

  describe('encodeFeatures', () => {
    it('encode the features selected', () => {
      const taxonomy = {
        test: {
          features: {
            testA: {
              selected: true
            },
            testB: {
              selected: true
            },
            testC: {
              selected: false
            }
          }
        },
        test2: {
          features: {
            testA: {
              selected: true
            }
          }
        }
      };
      expect(encodeFeatures(taxonomy)).toEqual('test=testA&test=testB&test2=testA');
    });
  });

  describe('decodeFeatures', () => {
    it('do nothing with empty features', () => {
      const taxonomy = {
        test: {
          features: {
            testA: {
              selected: false
            },
          }
        }
      };
      decodeFeatures('', taxonomy);
      expect(taxonomy.test.features.testA.selected).toEqual(false);
    });

    it('apply selected feature', () => {
       const taxonomy = {
        test: {
          features: {
            testA: {
              selected: false
            },
            testB: {
              selected: false
            },
            testC: {
              selected: false
            }
          }
        },
        test2: {
          features: {
            testA: {
              selected: false
            }
          }
        }
       };
      decodeFeatures('test=testA&test=testB&test2=testA', taxonomy);
      expect(taxonomy).toEqual({
        test: {
          features: {
            testA: {
              selected: true
            },
            testB: {
              selected: true
            },
            testC: {
              selected: false
            }
          }
        },
        test2: {
          features: {
            testA: {
              selected: true
            }
          }
        }
      });
    });
  });
});
