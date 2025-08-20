<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const showScrollTop = ref(false);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 100;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <button 
    v-if="showScrollTop" 
    class="button-up button-up--scroll-top" 
    @click="scrollToTop" 
    aria-label="Наверх"
    role="button"
    tabindex="0"
    >
        <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path 
                d="M12 6L6 12H10V18H14V12H18L12 6Z" 
                fill="white"
            />
        </svg>
  </button>
</template>

<style lang="sass" scoped>

.button-up--scroll-top
  position: fixed
  right: 12px
  bottom: 12px
  width: 40px
  height: 40px
  background: #95D0A1
  opacity: 1
  border-radius: 100px
  border: none
  display: flex
  align-items: center
  justify-content: center
  box-shadow: 0 2px 8px rgba(0,0,0,0.1)
  cursor: pointer
  z-index: 1000
  transition: opacity 0.3s
  padding: 0
  font-size: 0

.button-up--scroll-top:hover
  background-color: #6bbf7c

</style>