<script setup lang="ts">
let isPressed = ref(true);
</script>

<template>
    <div>
        <nav class="px-2 sm:px-4 py-2.5 bg-[#B7AC90] fixed w-full z-20 top-0 left-0">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
        <NuxtLink to="/" class="flex items-center">
            <img src="/Replay_Toolbox_Logo.png" class="h-6 mr-3 sm:h-9" alt="Replay Toolbox Logo">
        </NuxtLink>
        <div class="flex md:order-2">
            <!-- <button type="button" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Get started</button> -->
            <button @click="isPressed = !isPressed" data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 text-sm rounded-lg md:hidden text-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-[#B7AC90]" aria-controls="navbar-sticky" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            </button>
        </div>
        <div class="items-center justify-between w-full md:flex md:w-auto md:order-1" :class="{ hidden: isPressed }" id="navbar-sticky">
            <ul class="flex flex-col p-4 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-[#B7AC90] border-gray-700">
            <li>
                <NuxtLink to="/" title="Home page" class="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 hover:font-bold" aria-current="page" :class="{ selected: ($route.name=='index') }">Home</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/tutorials" title="Replay Mod recommended tutorials" class="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 hover:font-bold" aria-current="page" :class="{ selected: ($route.name=='tutorials') }">Recommended tutorials / tools</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/interpolateT" title="Page for time interpolation" class="block py-2 pl-3 pr-4 rounded md:p-0 hover:font-bold md:hover:bg-transparent border-gray-700" :class="{ selected: ($route.name=='interpolateT') }">Interpolate time</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/circle" title="Page for circular path generator" class="block py-2 pl-3 pr-4 rounded md:p-0 hover:font-bold md:hover:bg-transparent border-gray-700" :class="{ selected: ($route.name=='circle') }">Circle path</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/cutter" title="Page for path cutter" class="block py-2 pl-3 pr-4 rounded md:p-0 hover:font-bold md:hover:bg-transparent border-gray-700" :class="{ selected: ($route.name=='cutter') }">Cut path</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/injector" title="Inject extra chunks" class="block py-2 pl-3 pr-4 rounded md:p-0 hover:font-bold md:hover:bg-transparent border-gray-700" :class="{ selected: ($route.name=='injector') }">Inject extra terrain</NuxtLink>
            </li>
            </ul>
        </div>
        </div>
        </nav>
    </div>
</template>

<style>
.selected {
    font-weight: 700;
}
.selected:hover {
    font-weight: 800;
}
</style>