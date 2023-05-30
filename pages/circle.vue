<script setup lang="ts">
useHead({ title: "Replay Toolbox" });
const X = ref(Number(localStorage.getItem('circle_X')) || 0.5);
const Y = ref(Number(localStorage.getItem('circle_Y')) || 0);
const Z = ref(Number(localStorage.getItem('circle_Z')) || 0.5);
const Radius = ref(Number(localStorage.getItem('circle_Radius')) || 16);
const Pitch = ref(Number(localStorage.getItem('circle_Pitch')) || 0);
const Spins = ref(Number(localStorage.getItem('circle_Spins')) || 1);
const Time = ref(Number(localStorage.getItem('circle_Time')) || 2000);
const FPS = ref(Number(localStorage.getItem('circle_FPS')) || 6);
const timelines = ref("");
let Download = "";

onMounted(async ()=>{
    generateJSON();
});

function storeData() {
    localStorage.setItem('circle_X', X.value.toString());
    localStorage.setItem('circle_Y', Y.value.toString());
    localStorage.setItem('circle_Z', Z.value.toString());
    localStorage.setItem('circle_Radius', Radius.value.toString());
    localStorage.setItem('circle_Pitch', Pitch.value.toString());
    localStorage.setItem('circle_Spins', Spins.value.toString());
    localStorage.setItem('circle_Time', Time.value.toString());
    localStorage.setItem('circle_FPS', FPS.value.toString());
}

// main functuon of generating json
function generateJSON() {
    storeData();
    const points_in_1_spin = Math.floor((Time.value * (FPS.value / 1000) / Spins.value));
    const points_total = Math.floor(Time.value * (FPS.value / 1000));

    const keyframes = Array.from({ length: points_total + 1  }, (_, i) => (
        {
            properties: {
                'camera:position': [Radius.value * Math.cos(((2 * Math.PI) / points_in_1_spin) * i) + X.value, Y.value, Radius.value * Math.sin(((2 * Math.PI) / points_in_1_spin) * i) + Z.value],
                'camera:rotation': [((360 / points_in_1_spin) * i + 90) % 360, Pitch.value, 0]
            },
            time: Math.round((Time.value / points_total) * i)
        }
    ));

    const obj = {
        '': [
            {
                keyframes: [
                    { time: 0, properties: { timestamp: 0 } },
                    { time: Time.value, properties: { timestamp: 0 } }
                ],
                segments: [0],
                interpolators: [
                    {
                        type: 'linear',
                        properties: ['timestamp']
                    }
                ]
            },
            {
                keyframes: keyframes,
                segments: Array(points_total).fill(0),
                interpolators: [
                    {
                        type: 'cubic-spline',
                        properties: ['camera:position', 'camera:rotation']
                    }
                ]
            }
        ]
    };

    timelines.value = syntaxHighlight(JSON.stringify(obj, null, '\t'));
    Download = JSON.stringify(obj);
}


</script>
<template>
    <div class="h-screen pt-20 flex flex-row p-10">
        <div class="p-5 w-[50vw] min-w-[340px]">
            <label class="mb-1 text-sm font-bold">Center <a class="text-red-700">X</a>:</label>
            <input v-model="X" type="number" min="1" id="Center X" @change="generateJSON()" class="block h-7 w-full rounded-lg border text-sm bg-[#1B1B1B] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
            
            <label class="mb-1 text-sm font-bold">Center <a class="text-green-700">Y</a>:</label>
            <input v-model="Y" type="number" min="1" id="Center Y" @change="generateJSON()" class="block h-7 w-full rounded-lg border text-sm bg-[#1B1B1B] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
            
            <label class="mb-1 text-sm font-bold">Center <a class="text-blue-700">Z</a>:</label>
            <input v-model="Z" type="number" min="1" id="Center Z" @change="generateJSON()" class="mb-10 block h-7 w-full rounded-lg border text-sm bg-[#1B1B1B] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">

            <label class="mb-1 text-sm font-bold">Radius:</label>
            <input v-model="Radius" type="number" min="1" id="Radius" @change="generateJSON()" class="block h-7 w-full rounded-lg border text-sm bg-[#1B1B1B] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
            
            <label class="mb-1 text-sm font-bold">Camera pitch:</label>
            <input v-model="Pitch" type="number" min="1" id="Camera pitch" @change="generateJSON()" class="mb-10 block h-7 w-full rounded-lg border text-sm bg-[#1B1B1B] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
        
            <label class="mb-1 text-sm font-bold">Number of spins:</label>
            <input v-model="Spins" type="number" min="1" id="Number of spins" @change="generateJSON()" class="block h-7 w-full rounded-lg border text-sm bg-[#1B1B1B] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
            
            <label class="mb-1 text-sm font-bold">Time, ms:</label>
            <input v-model="Time" type="number" min="1" id="Time" @change="generateJSON()" class="block h-7 w-full rounded-lg border text-sm bg-[#1B1B1B] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
            
            <label class="mb-1 text-sm font-bold">FPS (amount of keyframes/sec):</label>
            <input v-model="FPS" type="number" min="1" id="FPS" @change="generateJSON()" class="block h-7 w-full rounded-lg border text-sm bg-[#1B1B1B] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
        
            <button class="mt-10 bg-[#f44e38] text-gray-100 p-1 px-2 rounded-lg w-full hover:bg-gray-100 hover:text-[#f44e38] active:scale-[0.99]" @click="copy(Download)">Copy to clipboard</button>
            <button class="mt-3 bg-[#f44e38] text-gray-100 p-1 px-2 rounded-lg w-full hover:bg-gray-100 hover:text-[#f44e38] active:scale-[0.99]" @click="download(Download)">Download timelines.json</button>
            <p class="mt-1 text-xs">Put this file into <a class="text-gray-700">C:\Users\User\AppData\Roaming\.minecraft\replay_recordings\Replay_name.mcpr</a></p>
        </div>
        <div class="p-5 w-[50vw] h-[90vh] box min-w-[340px]">
            <label for="json" class="text-sm font-bold">timelines.json:</label>
            <pre v-html="timelines" id="json" class="text-[#D4D4AA] block p-2.5 scrollbar w-full h-[95%] text-sm rounded-lg border bg-[#1B1B1B] border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 overflow-auto" />
        </div>
    </div>
</template>

<style>
.string {
    color: #D1AA58;
}

.number {
    color: #c97f9e;
}

.boolean {
    color: #AF5F61;
}

.null {
    color: #B57A39;
}

.key {
    color: #8E9062;
}

/* vscode colors */
/* bg-[#1E1E1E] */
/* .string {
    color: #CE9178;  
}

.number {
    color: #B5CEA8;
}

.boolean {
    color: #569CD6;
}

.null {
    color: #F44747;
}

.key {
    color: #9CDCFE;
} */
</style>