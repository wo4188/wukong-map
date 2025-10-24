<template>
  <div class="map-selector-wrapper">
    <div
      v-for="item in items"
      :key="item.id"
      class="map-selector-item"
      :class="{ 'is-actived': item.id === currId }"
      @click="$emit('select', item.id)"
    >
      {{ item.regionName }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MapListItem } from '@/types';

defineOptions({
  name: 'MapSelector',
});

defineProps<{
  items: MapListItem[];
  currId: number;
}>();

defineEmits<{
  select: [id: number];
}>();
</script>

<style lang="scss" scoped>
.map-selector-wrapper {
  display: grid;

  margin-bottom: 20px;
  padding: 40px 0 20px;

  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  gap: 16px 18px;

  .map-selector-item {
    overflow: hidden;

    height: 32px;

    cursor: pointer;
    text-align: center;

    color: #d7d7d9;
    border-radius: 4px;
    background-color: #46464c;

    font-size: 16px;
    font-weight: var(--font-weight-bold);
    line-height: 32px;

    &.is-actived {
      color: #222;
      background-color: #eac27e;
    }
  }
}
</style>
