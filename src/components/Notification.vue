<template>
    <div
        :class="{
            'bg-green-500': isSuccess,
            'border-green-700': isSuccess,
            'bg-red-500': isError,
            'border-red-700': isError,
        }"
        class="flex items-center border-l-4 py-2 px-3 shadow-md mb-2"
    >
        <!-- icons -->
        <div
            :class="{ 'text-green-500': isSuccess, 'text-red-500': isError }"
            class="rounded-full bg-white mr-3"
        >
            <svg
                v-if="isSuccess"
                width="1.8em"
                height="1.8em"
                viewBox="0 0 16 16"
                class="bi bi-check"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
                />
            </svg>
            <svg
                v-if="isError"
                width="1.8em"
                height="1.8em"
                viewBox="0 0 16 16"
                class="bi bi-x"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                />
                <path
                    fill-rule="evenodd"
                    d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                />
            </svg>
        </div>
        <!-- message -->
        <div class="text-white max-w-xs">{{ message }}</div>
    </div>
</template>

<script>
export default {
    props: {
        message: String,
        type: String,
    },
    computed: {
        isSuccess() {
            return this.type.toLowerCase() === "success";
        },
        isError() {
            return this.type.toLowerCase() === "error";
        },
    },
};
</script>

<style></style>
