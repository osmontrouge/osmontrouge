import { shallowMount } from '@vue/test-utils';
import MapillaryControl from '../js/mapillary_control';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}));

describe('MapillaryControl', () => {
  let control;

  beforeEach(() => {
    control = shallowMount(MapillaryControl, {
      provide: {
        actions: {},
        map: {},
        mapbox: {}
      },
      stubs: {
        'v-icon': '<div />',
        'v-tooltip': '<div><slot name="activator" /></div>'
      }
    });
  });

  it('create a container', () => {
    expect(control.contains('.mapboxgl-ctrl')).toBe(true);
    expect(control.contains('.mapboxgl-ctrl-group')).toBe(true);
  });

});
