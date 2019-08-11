import { shallowMount, createLocalVue } from '@vue/test-utils';
import MapillaryControl from '../../js/mapillary/mapillary_control';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}));

describe('MapillaryControl', () => {
  let control;
  beforeEach(() => {
    let localVue = createLocalVue();
    localVue.prototype.$t = () => {};
    control = shallowMount(MapillaryControl, {
      localVue,
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
