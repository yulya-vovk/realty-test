<script lang="ts" setup>
import {computed} from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: boolean
  ariaLabel?: string
  disabled: boolean
}>(), {
  modelValue: false,
  ariaLabel: undefined,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue' | 'change', value: boolean): void
}>()

const pressed = computed(() => !!props.modelValue)

function toggle() {
  const next = !pressed.value
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<template>
  <button
      :aria-checked="pressed ? 'true' : 'false'"
      :aria-label="ariaLabel"
      :class="[{ 'is-on': pressed, 'is-off': !pressed, 'disabled': disabled }]"
      class="toggle-button"
      role="switch"
      type="button"
      @click="toggle"
  >
    <slot/>
  </button>
</template>

<style lang="sass" scoped>
.toggle-button
  background: #fff
  border-radius: 100%
  padding: 8px
  margin: 4px
  width: 40px
  height: 40px
  cursor: pointer

  &.is-on
    background: #3EB57C
    color: #fff
    box-shadow: 0px 6px 20px 0px #95D0A1

  &.disabled
    color: #ccc
</style>
