<script setup lang="ts">
useHead({ title: "Replay Toolbox" });

</script>
<template>
    <div class="h-screen pt-20 flex flex-row justify-evenly">
        <div class="w-[600px] mx-auto overflow-auto scrollbar">
            <p class="font-bold text-2xl">Tutorials</p>
            <div class="mt-3 p-5 box">
                <p>Great tutorial series by <a href="https://youtube.com/playlist?list=PL4ZS2guXqa_ixSHBW3Lh06sjvD9_yrMr8" target="_blank" rel="noopener noreferrer" class="underline">slicedlime</a> to cover basics.</p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PL4ZS2guXqa_ixSHBW3Lh06sjvD9_yrMr8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div class="mt-3 p-5 box">
                <p>More stuff by <a href="https://youtube.com/playlist?list=PL1nWzwiv3nc3loqHsFoGDW1-scc6MKo_D" target="_blank" rel="noopener noreferrer" class="underline">CrushedPixel</a>.</p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PL1nWzwiv3nc3loqHsFoGDW1-scc6MKo_D" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div class="mt-3 p-5 box">
                <p>SARC and ReplayAddon tutorial by <a href="https://www.youtube.com/@_KK" target="_blank" rel="noopener noreferrer" class="underline">KK</a>.</p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/gkU-opd5rsk" title="SARC Launch and Enderman Farm | Dugged SMP E7" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </div>
        <div class="w-[600px] mx-auto overflow-auto scrollbar">
            <p class="font-bold text-2xl">Tools</p>
            <div class="mt-3 p-5 box">
                <p><a href="https://github.com/Robitobi01/SARC" target="_blank" rel="noopener noreferrer" class="underline">Stand Alone Replay Client - SARC</a>.</p>
                <img src="https://opengraph.githubassets.com/a1ed6d71df1fb8a4c4b83cc37d0f508508f076ccba3ef2a5c960400b1f0a3413/Robitobi01/SARC"/>
            </div>
            <div class="mt-3 p-5 box">
                <p><a href="https://github.com/Nessiesson/ReplayAddon" target="_blank" rel="noopener noreferrer" class="underline">ReplayAddon</a> Mod with a lot of useful features.</p>
                <img src="https://opengraph.githubassets.com/d7fe2a21f8c999e4e9eff6fbd004bee42828582dc1eae1f9da0a7fb59d273c0e/Nessiesson/ReplayAddon"/>
            </div>
            <div class="mt-3 p-5 box">
                <p><a href="https://github.com/Fallen-Breath/PCRC" target="_blank" rel="noopener noreferrer" class="underline">PyCraft based Replay Client - PCRC</a>.</p>
                <img src="https://opengraph.githubassets.com/e03fda844de955a227fd6dfe95ed8b1401a08000241e3c277974c85abfd8bf62/Fallen-Breath/PCRC"/>
            </div>
        </div>
    </div>
</template>