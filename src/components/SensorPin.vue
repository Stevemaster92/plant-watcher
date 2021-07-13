<template>
    <div class="flex items-center">
        <span class="text-gray-700 mr-2">Sensor {{ sensorId }}</span>
        <select
            @change="$emit('change-pin', sensorId, $event.target.value)"
            class="custom-select"
            :value="pin"
        >
            <option v-for="v in sensorPinValues" :key="v" :value="v">
                Pin {{ v }}
            </option>
        </select>
        <button
            @click="$emit('delete-sensor', sensorId)"
            class="btn-action bg-red-500 hover:bg-red-600 ml-4"
        >
            -
        </button>
    </div>
</template>

<script>
export default {
    props: {
        sensorId: Number,
        pin: Number,
    },
    computed: {
        sensorPinValues() {
            return [
                0, 2, 4, 12, 13, 14, 15, 25, 26, 27, 32, 33, 34, 35, 36, 39,
            ];
        },
    },
};
</script>

<style></style>
