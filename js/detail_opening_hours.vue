<template>
  <v-list-group
    prepend-icon="osm-time"
    no-action
  >
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title>{{ $t(`details.opening_hours.${state}`) }}</v-list-item-title>
      </v-list-item-content>
    </template>

    <v-list-item
      v-for="(interval, day) in weekDays">
      <v-list-item-content>
        <v-list-item-title>
          {{ $t(`details.opening_hours.days.${day}`) }}:
          {{ interval }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-group>
</template>

<script>
import OpeningHours from 'opening_hours';

export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },

  computed: {
    openingHours() {
      return new OpeningHours(this.value);
    },
    state() {
      return this.openingHours.getState();
    },
    weekDays() {
      return ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].reduce((memo, day, index) => {
        memo[day] = this.formatIntervals(this.openingHours.getOpenIntervals(...this.getDayOfWeek(index + 1)));
        return memo;
      }, {});
    }
  },

  methods: {
    getDayOfWeek(day) {
      const start = new Date();
      start.setDate(start.getDate() + (day + 7 - start.getDay()) % 7);
      start.setHours(0, 0, 0, 0);
      const end = new Date();
      end.setDate(start.getDate() + (day + 7 - start.getDay()) % 7);
      end.setHours(24, 0, 0, 0);
      return [start, end];
    },
    formatIntervals(intervals) {
      if (intervals.length === 0) {
        return this.$t(`details.opening_hours.false`);
      }
      return intervals.map((interval) => {
        return interval.slice(0, 2).map(d => d.toLocaleString('fr', { hour: '2-digit', minute: '2-digit' })).join('-');
      }).join(' ');
    }
  }
}
</script>
