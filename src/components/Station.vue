<template>
    <div class="border-2 border-gray-200 rounded-md p-4">
        <h2 class="font-bold text-2xl mb-2">Station {{ station.stationId }}</h2>
        <div class="w-min-full">
            <canvas :id="'chart-' + station.stationId"></canvas>
        </div>
    </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
    props: {
        station: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            chart: null,
        };
    },
    methods: {
        getLatestSensors(sensorId, num = 50) {
            return this.station.sensors
                .filter((sensor) => sensor.sensorId === sensorId)
                .slice(
                    this.station.sensors.length - num,
                    this.station.sensors.length
                );
        },
        fillData() {
            const latestSensors = this.getLatestSensors(1);
            this.chart = new Chart(
                document.getElementById(`chart-${this.station.stationId}`),
                {
                    type: "line",
                    data: {
                        labels: latestSensors.map((sensor) => sensor.createdAt),
                        datasets: [
                            {
                                label: "Moisture",
                                backgroundColor: "rgba(79, 70, 229, 1)",
                                borderColor: "rgba(79, 70, 229, 1)",
                                data: latestSensors.map(
                                    (sensor) => sensor.moisture
                                ),
                                tension: 0.1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                min: 0,
                                max: 100,
                            },
                        },
                    },
                }
            );
        },
    },
    mounted() {
        fetch(
            `http://localhost:8000/api/v1/stations/${this.station.stationId}/sensors`
        ).then(async (res) => {
            this.station.sensors = await res.json();
            this.fillData();
        });
    },
};
</script>

<style></style>
