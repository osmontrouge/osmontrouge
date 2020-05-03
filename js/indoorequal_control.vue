<script>
import { $helpers } from 'vue-mapbox/dist/vue-mapbox.umd.js';
import IndoorEqual from 'mapbox-gl-indoorequal';
import 'mapbox-gl-indoorequal/mapbox-gl-indoorequal.css';

export default {
  mixins: [$helpers.asControl],

  mounted() {
    this.control = new IndoorEqual(this.map);
    this.$_addControl();
  }
};
</script>
