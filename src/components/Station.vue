<template>
    <div class="border-2 border-gray-200 rounded-md p-5">
        <h2 class="font-bold text-2xl mb-2">Station {{ station.stationId }}</h2>

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
import Sensor from "./Sensor.vue";

export default {
    components: {
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
            chart: Object,
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
