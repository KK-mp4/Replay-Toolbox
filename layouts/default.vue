<script setup lang="ts">
import Navbar from "~/components/navbar.vue";
const {public:{base}} = useRuntimeConfig()
useHead({
  link: [
    {
      rel: "icon",
      href: `${base}favicon.ico`,
      type: "image/x-icon",
      id: "favicon"
    }
  ],
  htmlAttrs: {
      lang: 'en'
    },
  meta: [
    { name: 'description', content: 'Author: KK, Useful tools for Replay Mod' }
  ],
});
</script>

<template>
    <div class="h-screen">
      <Navbar />
      <slot />
    </div>
</template>

<style>
body {
    margin: 0;
    background: linear-gradient(0deg, #9B927B, #B7AC90);
    font-size: 16px;
    color: #121212;
    font-family: Montserrat;
}

/* @font-face {
  font-family: 'TF2 Build';
  src: url('/tf2build.ttf');
} */

.box {
  --b: 2px;   /* thickness of the border */
  --c: #121212;   /* color of the border */
  --w: 30px;  /* width of border */
  

  border: var(--b) solid #0000; /* space for the border */
  --_g: #0000 90deg,var(--c) 0;
  --_p: var(--w) var(--w) border-box no-repeat;
  background:
    conic-gradient(from 90deg  at top    var(--b) left  var(--b),var(--_g)) 0    0    / var(--_p),
    conic-gradient(from 180deg at top    var(--b) right var(--b),var(--_g)) 100% 0    / var(--_p),
    conic-gradient(from 0deg   at bottom var(--b) left  var(--b),var(--_g)) 0    100% / var(--_p),
    conic-gradient(from -90deg at bottom var(--b) right var(--b),var(--_g)) 100% 100% / var(--_p);
}

.scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
 
.scrollbar::-webkit-scrollbar-thumb {
  background-color: #ffffff86;
  outline: 1px solid slategrey;
  border-radius: 4px;
}
.scrollbar::-webkit-scrollbar-corner {
    background: transparent;
}
</style>