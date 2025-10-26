<template>
  <router-view />
</template>

<script setup lang="ts">
console.groupCollapsed('🚩 [env] 环境变量');
console.log(import.meta.env);
console.groupEnd();
</script>
