<template>
    <div>
        <h3 class="text-xl mb-2">Sensor {{ sensorId }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
                <h4 class="text-lg text-center italic mb-2">
                    Moisure of last 24 hours
                </h4>
                <canvas :id="'line-chart-' + sensorId"></canvas>
            </div>
            <div>
                <h4 class="text-lg text-center italic mb-2">Current moisure</h4>
                <canvas
                    class="max-h-96"
                    :id="'doughnut-chart-' + sensorId"
                ></canvas>
            </div>
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
        getLatest(num = 24) {
            return this.sensorData.slice(
                this.sensorData.length - num,
                this.sensorData.length
            );
        },
        getMoistureColor(moisture) {
            if (moisture > 80) {
                return "rgba(39, 174, 96, 1)";
            }
            if (moisture > 50) {
                return "rgba(45, 156, 219, 1)";
            }
            if (moisture > 20) {
                return "rgba(242, 201, 76, 1)";
            }

            return "rgba(235, 87, 87, 1)";
        },
        fillData() {
            // Get sensor data of the last 24 hours.
            const latestSensors = this.getLatest();

            // Line chart
            new Chart(document.getElementById(`line-chart-${this.sensorId}`), {
                type: "line",
                data: {
                    labels: latestSensors.map((sensor) =>
                        new Date(sensor.createdAt).toLocaleString()
                    ),
                    datasets: [
                        {
                            label: "Moisture",
                            backgroundColor: "rgba(79, 70, 229, 1)",
                            borderColor: "rgba(79, 70, 229, 1)",
                            data: latestSensors.map(
                                (sensor) => sensor.moisture
                            ),
                            tension: 0.1,
                            tooltip: {
                                callbacks: {
                                    label: (context) =>
                                        `${context.dataset.label}: ${context.parsed.y} %`,
                                },
                            },
                        },
                    ],
                },
                options:
                    // Change the chart to vertical on small displays.
                    window.innerWidth <= 425
                        ? {
                              indexAxis: "y",
                              scales: {
                                  x: {
                                      beginAtZero: true,
                                      max: 100,
                                  },
                              },
                          }
                        : {
                              scales: {
                                  y: {
                                      beginAtZero: true,
                                      max: 100,
                                  },
                              },
                          },
            });

            // Doughnut chart
            const lastSensor = latestSensors[latestSensors.length - 1];
            const moistureColor = this.getMoistureColor(lastSensor.moisture);

            new Chart(
                document.getElementById(`doughnut-chart-${this.sensorId}`),
                {
                    type: "doughnut",
                    data: {
                        labels: ["Moisure"],
                        datasets: [
                            {
                                backgroundColor: [
                                    moistureColor,
                                    "rgba(27,31,35,.05)",
                                ],
                                hoverBackgroundColor: [
                                    moistureColor,
                                    "rgba(27,31,35,.05)",
                                ],
                                hoverOffset: 10,
                                data: [
                                    lastSensor.moisture,
                                    100 - lastSensor.moisture,
                                ],
                                tooltip: {
                                    callbacks: {
                                        label: (context) =>
                                            `${context.label}: ${context.parsed} %`,
                                    },
                                },
                            },
                        ],
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
