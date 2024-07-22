<template>
  <van-nav-bar fixed placeholder>
    <template #title>
      <div>{{ title }}</div>
    </template>
  </van-nav-bar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, RouteLocationNormalized } from "vue-router";

const route: RouteLocationNormalized = useRoute();
const title = ref<string>(route?.meta?.title as string);
</script>

<style scoped></style>
