<template>
  <div>
    <header></header>
      <main>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </main>
    <footer></footer>
  </div>
</template>

<style>
@import "tailwindcss";
@import "@nuxt/ui";

* {
  font-family: PT Root UI, sans-serif;
}
input, button {
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  outline: none;
}

input:hover, button:hover {
  border-color: #888;
  background: #f5f5f5;
}

input:focus, button:focus {
  border-color: #0057ff;
  box-shadow: 0 0 0 2px rgba(0,87,255,0.15);
}

input:active, button:active {
  background: #eaeaea;
}

input:disabled, button:disabled {
  background: #f0f0f0;
  color: #aaa;
  cursor: not-allowed;
}
</style>