/* eslint-disable vue/multi-word-component-names */
<script lang="ts" setup>
import {computed} from 'vue'

type Size = number | string

const props = withDefaults(defineProps<{
  size?: Size
  color?: string
  thickness?: number
  ariaLabel?: string
}>(), {
  size: 24,
  color: '#0B1739',
  thickness: 3,
  ariaLabel: 'Загрузка'
})

const styleVars = computed(() => {
  const size = typeof props.size === 'number' ? `${props.size}px` : props.size
  const thickness = `${props.thickness}px`
  return {
    '--size': size,
    '--thickness': thickness,
    '--color': props.color
  } as Record<string, string>
})
</script>

<template>
  <div :aria-label="ariaLabel" :style="styleVars" class="spinner" role="status">
    <span class="visually-hidden">{{ ariaLabel }}</span>
  </div>
</template>

<style lang="sass" scoped>
.spinner
  display: inline-block
  width: var(--size)
  height: var(--size)
  border-radius: 50%
  border: var(--thickness) solid transparent
  border-top-color: var(--color)
  animation: spin 0.8s linear infinite

.visually-hidden
  position: absolute
  width: 1px
  height: 1px
  padding: 0
  margin: -1px
  overflow: hidden
  clip: rect(0, 0, 0, 0)
  white-space: nowrap
  border: 0

@keyframes spin
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
</style>
