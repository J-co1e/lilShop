<template>
  <div>
    test
    <h2 v-show="modelValue">{{ props.msg }}</h2>
    <a-button @click="changeIsShow">click</a-button>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  msg: { type: String, default: '' },
  modelValue: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])
function changeIsShow() {
  emit('update:modelValue', !props.modelValue)
}
</script>
<style lang="less" scoped></style>
