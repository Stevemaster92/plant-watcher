<template>
    <div>
        <div class="py-4 px-2 bg-indigo-600 text-white flex">
            <SunIcon
                class="h-8 w-8 md:h-10 md:w-10 text-white mr-4 flex-none"
            />
            <h1 class="text-3xl md:text-4xl flex-auto">
                PlantWatcher Dashboard
            </h1>
        </div>

        <div class="flex-none justify-center m-5 lg:m-10">
            <!-- <div class="grid grid-cols-1 lg:grid-cols-2 gap-4"> -->
            <Station
                v-for="station in stations"
                :key="station.stationId"
                :station="station"
            />
            <!-- </div> -->
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
        fetch(`${import.meta.env.VITE_API_URL}/stations`).then(async (res) => {
            this.stations = await res.json();
        });
    },
};
</script>

<style scoped></style>
