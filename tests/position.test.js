import { encode, decode } from '../js/position';

describe('Position', () => {
  it('decode the position with the default values', () => {
    const { lat, lng, zoom } = decode('', {
      mapCenter: [1, 2],
      mapZoom: 4
    });
    expect(lat).toEqual(2);
    expect(lng).toEqual(1);
    expect(zoom).toEqual(4);
  });

  it('decode the position', () => {
    const { lat, lng, zoom } = decode('@1.23,4.32,6', {
      mapCenter: [1, 2],
      mapZoom: 4
    });
    expect(lat).toEqual(1.23);
    expect(lng).toEqual(4.32);
    expect(zoom).toEqual(6);
  });

  it('encode the position', () => {
    const position = encode(1.12345678, 3.67891234, 4.321);
    expect(position).toEqual('@1.123457,3.678912,4.32');
  });
});
