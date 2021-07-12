<template>
    <div>
        <span class="text-gray-700 block">{{ title }}</span>
        <select class="custom-select w-full" v-model="currentValue">
            <option v-for="v in 101" :key="v" :value="v - 1">
                {{ v - 1 }} %
            </option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        value: Number,
    },
    data() {
        return {
            currentValue: this.value,
        };
    },
};
</script>

<style></style>
