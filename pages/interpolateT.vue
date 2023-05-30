<script setup lang="ts">
useHead({ title: "Replay Toolbox" });

// Defining the points as {x, y}
const start = { x: 0, y: 300 };
const end = { x: 300, y: 0 };
let point1 = ref({ x: 150, y: 280 });
let point2 = ref({ x: 150, y: 20 });

const timelines = ref("");
let pathJSON: any = "";
let Download = "";
const N = ref(10);

onMounted(async ()=> {
    Draw();
});

function Draw() {
    const canvas = document.getElementById("board") as HTMLCanvasElement;
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clean canvas
    ctx.fillStyle = "rgb(27, 27, 27)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Linear time
    ctx.strokeStyle = "rgb(36, 36, 36)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    // Connect control points
    ctx.strokeStyle = "rgb(128, 128, 128)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(point1.value.x, point1.value.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(end.x, end.y);
    ctx.lineTo(point2.value.x, point2.value.y);
    ctx.stroke();

    // Cubic Bézier curve
    ctx.strokeStyle = "rgb(209, 170, 88)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(point1.value.x, point1.value.y, point2.value.x, point2.value.y, end.x, end.y);
    ctx.stroke();

    // Control points
    ctx.fillStyle = "rgb(142, 144, 98)";
    ctx.beginPath();
    ctx.arc(point1.value.x, point1.value.y, 5, 0, 2 * Math.PI); // Control point one
    ctx.fill();
    ctx.fillStyle = "rgb(175, 95, 97)";
    ctx.beginPath();
    ctx.arc(point2.value.x, point2.value.y, 5, 0, 2 * Math.PI); // Control point two
    ctx.fill();
}

function update(event: MouseEvent) {
    if (event.buttons != 1) return;
    const canvas = document.getElementById("board");
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const distance1 = Math.sqrt(Math.pow(point1.value.x - x, 2) + Math.pow(point1.value.y - y, 2));
    const distance2 = Math.sqrt(Math.pow(point2.value.x - x, 2) + Math.pow(point2.value.y - y, 2));
    
    if (distance1 < 30 && distance1 <= distance2) {
        point1.value.x = x;
        point1.value.y = y;
    } else if (distance2 < 30 && distance2 <= distance1) {
        point2.value.x = x;
        point2.value.y = y;
    }

    Draw();
}

function jsonUpload(event) {
    this.selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {
        pathJSON = JSON.parse(fileReader.result);
        generatePoints();
    }
    fileReader.onerror = (error) => {
        console.log(error);
    }
}

function getPoint(t: number, p1: number, cp1: number, cp2: number, p2: number) {
    let t2 = t * t;
    let t3 = t2 * t;
    return p1 + (-p1 * 3 + t * (3 * p1 - p1 * t)) * t
    + (3 * cp1 + t * (-6 * cp1 + cp1 * 3 * t)) * t
    + (cp2 * 3 - cp2 * 3 * t) * t2
    + p2 * t3;
}

function generatePoints() {
    if (!pathJSON) return;
    const startTime = { time: pathJSON["interpolate"][0]["keyframes"][0]["time"], timestamp: pathJSON["interpolate"][0]["keyframes"][0]["properties"]["timestamp"] };
    const lastIndex = pathJSON["interpolate"][0]["keyframes"].length - 1;
    const endTime = { time: pathJSON["interpolate"][0]["keyframes"][lastIndex]["time"], timestamp: pathJSON["interpolate"][0]["keyframes"][lastIndex]["properties"]["timestamp"] };
    let keyframes = [];
    for (let distance = 0; distance <= 1; distance += 1 / N.value) {
        const newPoint = { x: getPoint(distance, start.x, point1.value.x, point2.value.x, end.x),
                            y: getPoint(distance, start.y, point1.value.y, point2.value.y, end.y) };

        let keyframe = { time: Math.round((newPoint.x / 300) * (endTime.time - startTime.time) + startTime.time),
            properties: { timestamp: Math.round(((300 - newPoint.y) / 300) * (endTime.timestamp - startTime.timestamp) + startTime.timestamp) } };

        keyframes.push(keyframe);
    }

    pathJSON["interpolate"][0]["keyframes"] = keyframes;
    let segments: number[] = [];
    for (let i = 0; i < keyframes.length - 1; i++) {
        segments.push(0);
    }

    pathJSON["interpolate"][0]["segments"] = segments;
    timelines.value = syntaxHighlight(JSON.stringify(pathJSON["interpolate"][0], null, '\t'));
    Download = JSON.stringify(pathJSON);
}
</script>
<template>
    <div class="h-screen pt-20 flex flex-row p-10">
        <div class="w-[50vw] p-5 pt-0 min-w-[340px]">
            <div class="box p-1 mb-3">
                <p class="text-sm font-bold">Time interpolation for your replay path.</p>
                <p class="text-sm">This is needed when you are doing time remapping on your clip in the editing software of your choice. When doing so, the time of the original clip stops being linear; this can look weird with stuff moving fast, then slow, and then again fast in your clip (like mobs walking around).</p>
                <p class="text-sm">Using this tool will allow you to reverse interpolate the time of the replay file, this way, your final clip will have linear time in it. Create a path and save it under the name "interpolate" (by pressing the X button). Upload here your timelines.json.</p>
            </div>
            <canvas id="board" width="300" height="300" @mousemove="update($event)" @mouseup="generatePoints()"></canvas>
            <p class="mt-2 text-sm font-semibold">Point 1: <a class="text-red-700">X</a> = <a class="jitter_fix">{{ Math.round((point1.x / 300) * 100) / 100 }}</a>, <a class="text-green-700">Y</a> = {{ Math.round(((300 - point1.y) / 300) * 100) / 100 }}</p>
            <p class="text-sm font-semibold">Point 2: <a class="text-red-700">X</a> = <a class="jitter_fix">{{ Math.round((point2.x / 300) * 100) / 100 }}</a>, <a class="text-green-700">Y</a> = {{ Math.round(((300 - point2.y) / 300) * 100) / 100 }}</p>
            <button class="mt-3 bg-[#f44e38] text-gray-100 p-1 px-2 rounded-lg w-full hover:bg-gray-100 hover:text-[#f44e38] active:scale-[0.99]" @click="point1.x = point2.y = 50; point1.y = point2.x = 250; Draw()">linear</button>
            <button class="mt-3 bg-[#f44e38] text-gray-100 p-1 px-2 rounded-lg w-full hover:bg-gray-100 hover:text-[#f44e38] active:scale-[0.99]" @click="point1.x = point2.x = 150; point1.y = 300; point2.y = 0; Draw()">ease-in-out</button>
            <button class="mt-3 mb-3 bg-[#f44e38] text-gray-100 p-1 px-2 rounded-lg w-full hover:bg-gray-100 hover:text-[#f44e38] active:scale-[0.99]" @click="point1.y = point2.y = 150; point2.x = 300; point1.x = 0; Draw()">reversed ease-in-out</button>
            <label class="mb-1 text-sm font-semibold">Number of keyframes to generate:</label>
            <input v-model="N" type="number" min="2" max="128" id="N" @change="generatePoints()" class="block h-7 w-full rounded-lg border sm:text-xs bg-[#1B1B1B] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
        </div>
        <div class="w-[50vw] p-5 box min-w-[340px]">
            <label for="file" class="text-sm font-semibold">Input for timelines.json:</label>
            <input id="file" class="mb-5 h-6 block w-full text-sm text-white rounded-lg cursor-pointer focus:outline-none bg-[#f44e38]" type="file" accept=".json" @change="jsonUpload($event)"/>
            <pre v-html="timelines" id="json" class="text-[#D4D4AA] block p-2.5 scrollbar w-full h-[81%] text-sm rounded-lg border bg-[#1B1B1B] border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 overflow-auto" />
            <button class="mt-3 bg-[#f44e38] text-gray-100 p-1 px-2 rounded-lg w-full hover:bg-gray-100 hover:text-[#f44e38] active:scale-[0.99]" @click="copy(Download)">Copy to clipboard</button>
            <button class="mt-3 bg-[#f44e38] text-gray-100 p-1 px-2 rounded-lg w-full hover:bg-gray-100 hover:text-[#f44e38] active:scale-[0.99]" @click="download(Download)">Download timelines.json</button>
        </div>
    </div>
</template>
<style>
.jitter_fix {
    display: inline-block;
    width: 30px;  
}
</style>