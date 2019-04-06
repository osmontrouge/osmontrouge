import { shallowMount } from '@vue/test-utils'

import MapillaryLayer from '../js/mapillary_layer';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}));

describe('MapillaryLayer', () => {
  let layer;

  beforeEach(() => {
    layer = shallowMount(MapillaryLayer);
  });

  it('filter nothing by default', () => {
    expect(layer.vm.filter).toEqual([]);
  });

  it('filter no pano', () => {
    layer.setProps({ pano: 0 });
    expect(layer.vm.filter).toEqual(['==', 'pano', 0]);
  });

  it('filter only pano', () => {
    layer.setProps({ pano: 1 });
    expect(layer.vm.filter).toEqual(['==', 'pano', 1]);
  });

  it('filter users', () => {
    layer.setProps({ users: ['1'] });
    expect(layer.vm.filter).toEqual(['in', 'userkey', '1']);
  });

  it('filter by users and pano', () => {
    layer.setProps({ pano: 1, users: ['1'] });
    expect(layer.vm.filter).toEqual(['all', ['==', 'pano', 1], ['in', 'userkey', '1']]);
  });

});
