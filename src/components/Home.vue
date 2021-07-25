<template>
    <div>
        <div class="py-4 px-2 bg-indigo-500 text-white flex">
            <SunIcon class="h-8 w-8 md:h-10 md:w-10 text-white mr-4 flex-none" />
            <h1 class="text-3xl md:text-4xl flex-auto mr-4">PlantWatcher Dashboard</h1>
            <button v-if="!isLoggedIn" @click="login" class="btn-login flex-initial mr-4">Login</button>
            <button v-else @click="logout" class="btn-login flex-initial mr-4">Logout</button>
        </div>

        <div class="flex-none justify-center m-5 lg:m-10">
            <Station v-for="station in stations" :key="station.stationId" :station="station" />
        </div>
    </div>
</template>

<script>
import { SunIcon } from "@heroicons/vue/solid";
import Station from "./Station.vue";

export default {
    components: {
        SunIcon,
        Station,
    },
    data() {
        return {
            stations: [],
            isLoggedIn: false,
        };
    },
    async mounted() {
        try {
            const res = await this.$axios.get(`${import.meta.env.VITE_API_URL}/stations`);
            this.stations = res.data;
        } catch (err) {
            console.error("Could not fetch stations:", err);
        }
    },
    methods: {
        async login() {
            try {
                // Login to Firebase.
                const res = await this.$axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
                    email: "pw123@example.com",
                    password: "plantwatcher",
                });
                await this.$auth.signInWithCustomToken(res.data.token);

                // Grab ID token and verify it.
                const idToken = await this.$auth.currentUser.getIdToken(true);
                await this.$axios.get(`${import.meta.env.VITE_API_URL}/auth/verify/${idToken}`);
                this.isLoggedIn = true;
                console.log("Logged in successfully");
            } catch (err) {
                console.error("Failed to login or verify user:", err.response.data.message);
            }
        },
        async logout() {
            try {
                await this.$auth.signOut();
                await this.$axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`);
                this.isLoggedIn = false;
                console.log("Logged out successfully");
            } catch (err) {
                console.error("Failed to logout:", err);
            }
        },
    },
};
</script>

<style scoped>
.btn-login {
    @apply rounded px-4 py-2 text-indigo-500 bg-white hover:bg-indigo-500 hover:text-white border-2 border-white;
}
</style>
