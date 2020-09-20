<script>
import { $helpers } from 'vue-mapbox/dist/vue-mapbox.umd.js';
import IndoorEqual from 'mapbox-gl-indoorequal';
import 'mapbox-gl-indoorequal/mapbox-gl-indoorequal.css';
import { indoorequal } from '../config';

export default {
  mixins: [$helpers.asControl],

  mounted() {
    this.control = new IndoorEqual(this.map, { apiKey: indoorequal });
    this.$_addControl();
    this.control.loadSprite('/indoorequal');
  }
};
</script>
