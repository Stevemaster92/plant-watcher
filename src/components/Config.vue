<template>
    <div class="mb-10">
        <h3 class="station-subtitle">Configuration</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-x-10 gap-y-6 mb-4">
            <label class="col-span-4 md:col-span-1">
                <p class="font-bold mb-2">Measure interval</p>
                <select
                    @change="changeInterval($event.target.value)"
                    :value="config.measureInterval"
                    class="custom-select w-full"
                >
                    <option v-for="interval in measureIntervals" :key="interval.value" :value="interval.value">
                        {{ interval.title }}
                    </option>
                </select>
            </label>
            <div class="col-span-4 md:col-span-3 lg:col-span-2">
                <p class="font-bold mb-2">Moisture thresholds</p>
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    <SelectThreshold @change-threshold="changeThreshold" title="wet" :value="config.threshold.wet" />
                    <SelectThreshold @change-threshold="changeThreshold" title="damp" :value="config.threshold.damp" />
                    <SelectThreshold
                        @change-threshold="changeThreshold"
                        title="normal"
                        :value="config.threshold.normal"
                    />
                    <SelectThreshold @change-threshold="changeThreshold" title="dry" :value="config.threshold.dry" />
                </div>
            </div>
            <div class="col-span-4 mb-4">
                <div class="font-bold mb-2">
                    Sensor pins
                    <button @click="addSensor" class="btn-action bg-green-500 hover:bg-green-600 ml-4">+</button>
                </div>
                <div class="grid grid-rows-1 md:grid-rows-6 lg:grid-rows-4 md:grid-flow-col gap-2">
                    <SensorPin
                        v-for="(pin, index) in config.sensorPins"
                        :key="index + '-' + pin"
                        :sensorId="index + 1"
                        :pin="pin"
                        @change-pin="changePin"
                        @delete-sensor="deleteSensor"
                    />
                </div>
            </div>
        </div>
        <button @click="$emit('save-config', updatedConfig)" class="btn-action bg-indigo-500 hover:bg-indigo-600">
            Save Configuration
        </button>
    </div>
</template>

<script>
import SelectThreshold from "./SelectThreshold.vue";
import SensorPin from "./SensorPin.vue";

export default {
    components: {
        SelectThreshold,
        SensorPin,
    },
    props: {
        config: Object,
    },
    data() {
        return {
            updatedConfig: this.config,
            measureIntervals: [
                {
                    title: "30 mins",
                    value: 30 * 60 * 1000,
                },
                {
                    title: "1 hour",
                    value: 60 * 60 * 1000,
                },
                {
                    title: "4 hours",
                    value: 4 * 60 * 60 * 1000,
                },
                {
                    title: "8 hours",
                    value: 8 * 60 * 60 * 1000,
                },
                {
                    title: "12 hours",
                    value: 12 * 60 * 60 * 1000,
                },
                {
                    title: "1 day",
                    value: 24 * 60 * 60 * 1000,
                },
            ],
        };
    },
    methods: {
        changeInterval(value) {
            this.updatedConfig.measureInterval = Number(value);
        },
        changePin(sensorId, value) {
            this.updatedConfig.sensorPins[sensorId - 1] = Number(value);
        },
        changeThreshold(title, value) {
            this.updatedConfig.threshold[title] = Number(value);
        },
        addSensor() {
            if (this.updatedConfig.sensorPins.length < 16) {
                this.updatedConfig.sensorPins.push(0);
            }
        },
        deleteSensor(sensorId) {
            if (this.updatedConfig.sensorPins.length > 1) {
                this.updatedConfig.sensorPins.splice(sensorId - 1, 1);
            }
        },
    },
};
</script>

<style scoped></style>
