<template>
  <div class="marker-group-wrapper">
    <div class="marker-group-title">
      {{ title }}
    </div>
    <div class="items-block">
      <div
        v-for="item in items"
        :key="item.id"
        class="marker-group-item"
        :class="{ 'is-selected': selectedCatalogs?.includes(item.name) }"
        @click="$emit('select', item.name)"
      >
        <img :src="item.iconUrl" alt="" />
        <span>{{ item.name }}</span>
        <span>{{ item.landmarksCount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MarkerCatalogItem } from '@/types';

defineOptions({
  name: 'MarkerGroup',
});

defineProps<{
  title: string;
  items: MarkerCatalogItem[];
  selectedCatalogs: string[];
}>();

defineEmits<{
  select: [name: string];
}>();
</script>

<style lang="scss" scoped>
.marker-group-wrapper {
  margin-bottom: 20px;

  font-size: 14px;
  line-height: 1;

  .marker-group-title {
    display: flex;
    align-items: center;

    height: 32px;
    margin-bottom: 10px;

    color: #a7a7ad;

    font-size: 16px;
  }

  .items-block {
    display: grid;

    grid-template-columns: repeat(2, 1fr);
    gap: 10px 18px;

    .marker-group-item {
      display: flex;
      align-items: center;

      height: 20px;

      cursor: pointer;

      color: #fff9;

      &.is-selected {
        color: #eac27e;
      }

      > img {
        display: block;

        width: 20px;
        height: 20px;
        margin-right: 6px;

        opacity: 0.8;
        border-radius: 4px;
      }

      > span:nth-of-type(1) {
        max-width: 90px;

        @include singleline-ellipsis;
      }

      > span:nth-of-type(2) {
        margin-left: 6px;
      }
    }
  }
}
</style>
