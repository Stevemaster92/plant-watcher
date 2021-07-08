<template>
    <div>
        <h3 class="text-xl text-center italic mb-2">Sensor {{ sensorId }}</h3>
        <div class="w-min-full">
            <canvas :id="'chart-' + sensorId"></canvas>
        </div>
    </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
    props: {
        sensorId: Number,
        sensorData: Array,
    },
    methods: {
        getLatest(num = 50) {
            return this.sensorData.slice(
                this.sensorData.length - num,
                this.sensorData.length
            );
        },
        fillData() {
            const latestSensors = this.getLatest();

            this.chart = new Chart(
                document.getElementById(`chart-${this.sensorId}`),
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
        this.fillData();
    },
};
</script>

<style></style>
