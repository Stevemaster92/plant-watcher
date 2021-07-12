<template>
    <div class="mb-10">
        <h3 class="station-subtitle">Configuration</h3>
        <div
            class="
                grid grid-rows-2 grid-cols-3 grid-flow-col
                gap-y-3 gap-x-10
                mb-4
            "
        >
            <div>
                <span class="font-bold mb-2">Measure interval</span>
                <select class="custom-select w-full" v-model="measureInterval">
                    <option value="1800000">30 mins</option>
                    <option value="3600000">1 hour</option>
                    <option value="14400000">4 hours</option>
                    <option value="28800000">8 hours</option>
                    <option value="43200000">12 hours</option>
                    <option value="86400000">1 day</option>
                </select>
            </div>
            <div>
                <p class="font-bold mb-2">Moisture thresholds</p>
                <div class="grid grid-cols-4 gap-4">
                    <SelectThreshold
                        title="Wet"
                        :value="config.threshold.wet"
                    />
                    <SelectThreshold
                        title="Damp"
                        :value="config.threshold.damp"
                    />
                    <SelectThreshold
                        title="Normal"
                        :value="config.threshold.normal"
                    />
                    <SelectThreshold
                        title="Dry"
                        :value="config.threshold.dry"
                    />
                </div>
            </div>
            <div class="row-span-2 col-span-2 block">
                <div class="font-bold mb-2">
                    Sensor pins
                    <button
                        @click="addSensor"
                        class="btn-action bg-green-500 hover:bg-green-600 ml-4"
                    >
                        +
                    </button>
                </div>
                <div class="grid grid-rows-4 grid-flow-col gap-2">
                    <SelectPin
                        v-for="(pin, index) in sensorPins"
                        :key="index + '-' + pin"
                        :sensorId="index + 1"
                        :pin="pin"
                        @change-pin="changePin"
                        @delete-sensor="deleteSensor"
                    />
                </div>
            </div>
        </div>
        <button
            @click="saveConfig"
            class="btn-action bg-indigo-500 hover:bg-indigo-600"
        >
            Save Configuration
        </button>
    </div>
</template>

<script>
import SelectThreshold from "./SelectThreshold.vue";
import SelectPin from "./SelectPin.vue";

export default {
    components: {
        SelectThreshold,
        SelectPin,
    },
    props: {
        config: Object,
    },
    data() {
        return {
            sensorPins: this.config.sensorPins,
            measureInterval: this.config.measureInterval,
        };
    },
    methods: {
        changePin(sensorId, pin) {
            this.sensorPins[sensorId - 1] = pin;
        },
        addSensor() {
            if (this.sensorPins.length < 16) {
                this.sensorPins.push(0);
            }
        },
        deleteSensor(sensorId) {
            if (this.sensorPins.length > 1) {
                this.sensorPins.splice(sensorId - 1, 1);
            }
        },
        saveConfig() {
            // TODO Send POST request to API
        },
    },
};
</script>

<style scoped></style>
