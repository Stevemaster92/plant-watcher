<template>
    <div class="py-4 px-2 bg-indigo-600 text-white flex">
        <SunIcon class="h-10 w-10 text-white mr-4" />
        <h1 class="text-4xl">PlantWatcher Dashboard</h1>
    </div>

    <div class="flex-none justify-center m-10">
        <div class="grid lg:grid-cols-2 gap-4">
            <Station
                v-for="station in stations"
                :key="station.stationId"
                :station="station"
            />
        </div>
    </div>
</template>

<script>
import { SunIcon } from "@heroicons/vue/solid";
import Station from "./Station.vue";

export default {
    components: {
        SunIcon,
        Station,
    },
    data() {
        return {
            stations: [],
        };
    },
    mounted() {
        fetch("http://localhost:8000/api/v1/stations").then(async (res) => {
            this.stations = await res.json();
        });
    },
};
</script>

<style scoped></style>
