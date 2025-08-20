<script lang="ts" setup>
import {computed} from 'vue'

const props = withDefaults(defineProps<{
  direction?: 'none' | 'asc' | 'desc'
  width?: number
  height?: number
  defaultColor?: string
  accentColor?: string
  inactiveOpacity?: number
}>(), {
  direction: 'none',
  width: 7,
  height: 10,
  defaultColor: '#0B1739',
  accentColor: '#3EB57C',
  inactiveOpacity: 0.4,
})

const upColor = computed(() => props.direction === 'asc' ? props.accentColor : props.defaultColor)
const downColor = computed(() => props.direction === 'desc' ? props.accentColor : props.defaultColor)
const upOpacity = computed(() => props.direction === 'asc' ? 1 : props.inactiveOpacity)
const downOpacity = computed(() => props.direction === 'desc' ? 1 : props.inactiveOpacity)
</script>

<template>
  <!-- The viewBox and paths are adapted from the provided SVG. -->
  <svg :height="height" :width="width" aria-hidden="true" fill="none" focusable="false"
       viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg">
    <!-- Down arrow -->
    <g :opacity="downOpacity">
      <path :fill="downColor" clip-rule="evenodd"
            d="M2.82335 9.7465C2.98561 9.91016 3.19987 10 3.42956 10C3.65867 10 3.87408 9.91016 4.0352 9.7465L6.69029 6.98723C6.9137 6.7612 6.9137 6.39555 6.69029 6.16952C6.46747 5.94349 6.1058 5.94349 5.8824 6.16952L3.42956 8.72451L0.976151 6.16952C0.752751 5.94349 0.391653 5.94349 0.168252 6.16952C-0.0551483 6.39555 -0.0551483 6.7612 0.168252 6.98723L2.82335 9.7465Z"
            fill-rule="evenodd"/>
    </g>

    <!-- Up arrow -->
    <g :opacity="upOpacity">
      <path :fill="upColor" clip-rule="evenodd"
            d="M4.0345 0.253496C3.87223 0.0898395 3.65798 2.7968e-07 3.42829 2.9976e-07C3.19918 3.1979e-07 2.98377 0.0898396 2.82265 0.253496L0.167554 3.01277C-0.0558463 3.2388 -0.0558462 3.60445 0.167554 3.83048C0.390384 4.05651 0.752053 4.05651 0.975454 3.83048L3.42829 1.27549L5.8817 3.83048C6.1051 4.05651 6.4662 4.05651 6.6896 3.83048C6.913 3.60445 6.913 3.2388 6.6896 3.01277L4.0345 0.253496Z"
            fill-rule="evenodd"/>
    </g>
  </svg>
</template>

<style scoped>
svg {
  display: inline-block;
  vertical-align: middle;
}
</style>
