import { mapillaryViewerFilter } from '../js/mapillary';

describe('mapillaryViewerFilter', () => {
  it('create the filter', () => {
    expect(mapillaryViewerFilter(['2', '3', '4'], true)).toEqual([
      'all',
      ['in', 'userKey', '2', '3', '4'],
      ['==', 'pano', true],
    ]);
  });
});
