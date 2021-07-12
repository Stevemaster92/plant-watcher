<template>
    <div class="ring-1 bg-white ring-gray-200 rounded-md p-5">
        <h2 class="font-bold text-2xl text-center uppercase mb-2">
            Station {{ station.stationId }}
        </h2>

        <Config :config="station.config" />

        <div v-for="(sensor, index) in sensorData" :key="index">
            <Sensor
                v-if="sensor"
                :sensorId="sensor[0].sensorId"
                :sensorData="sensor"
            />
        </div>
    </div>
</template>

<script>
import Config from "./Config.vue";
import Sensor from "./Sensor.vue";

export default {
    components: {
        Config,
        Sensor,
    },
    props: {
        station: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            sensorData: Array,
        };
    },
    mounted() {
        fetch(
            `${import.meta.env.VITE_API_URL}/stations/${
                this.station.stationId
            }/sensors`
        ).then(async (res) => {
            const sensors = await res.json();

            // Create array of arrays of sensor data.
            this.sensorData = sensors.reduce((prev, sensor) => {
                if (!prev[sensor.sensorId]) {
                    prev[sensor.sensorId] = [];
                }
                prev[sensor.sensorId].push(sensor);

                return prev;
            }, []);
        });
    },
};
</script>

<style></style>
