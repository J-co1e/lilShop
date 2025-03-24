<template>
  <template v-for="item in data" :key="item.name">
    <a-sub-menu v-if="item?.children?.length" :menu-info="item" :title="t(item?.meta?.title)">
      <template #icon>
        <component :is="item?.meta?.icon" />
      </template>
      <SubMenuItem :data="item.children" />
    </a-sub-menu>
    <a-menu-item
      v-else
      :class="item.path == route.path ? 'ant-menu-item-selected' : 'ant-menu-item-not-selected'"
      @click="router.push(item.path)"
    >
      <template #icon>
        <component :is="item?.meta?.icon" />
      </template>
      <span>{{ t(item?.meta?.title) }}</span>
    </a-menu-item>
  </template>
</template>
<script setup lang="ts">
import { t } from '@/utils/translate'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import SubMenuItem from './SubMenuItem.vue'
import { defineProps } from 'vue'
const props = defineProps<{
  data: RouteRecordRaw[]
}>()
const route = useRoute()
const router = useRouter()
</script>
<style lang="scss" scoped></style>
