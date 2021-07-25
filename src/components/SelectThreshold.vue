<template>
    <label class="flex flex-wrap md:flex-nowrap items-center">
        <span class="text-gray-700 capitalize mr-2">{{ title }}</span>
        <select
            :value="value"
            @change="$emit('change-threshold', title, $event.target.value)"
            class="custom-select w-full"
        >
            <option v-for="v in 101" :key="v" :value="v - 1">{{ v - 1 }} %</option>
        </select>
    </label>
</template>

<script>
export default {
    props: {
        title: String,
        value: Number,
    },
};
</script>

<style></style>
