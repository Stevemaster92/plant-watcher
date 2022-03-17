<template>
    <div>
        <div class="py-4 px-8 bg-indigo-500 text-white flex items-center space-x-4">
            <div class="flex-initial <sm:hidden block">
                <div class="icon-sun icon-md"></div>
            </div>
            <div class="flex-auto">
                <a href="/">
                    <h1 class="text-2xl md:text-4xl mr-4">PlantWatcher Dashboard</h1>
                </a>
            </div>
            <button v-if="!isLoggedIn" @click="showLoginModal" class="btn-login flex-initial">Login</button>
            <button v-else @click="logout" class="btn-login flex-initial">Logout</button>
        </div>

        <div class="flex-none justify-center my-5 px-8 lg:my-10">
            <Station v-for="station in stations" :key="station.stationId" :station="station" />
        </div>

        <LoginModal @loggedIn="checkLogin" />
    </div>
</template>

<script>
import Station from "./Station.vue";
import LoginModal from "./LoginModal.vue";

export default {
    components: {
        Station,
        LoginModal,
    },
    data() {
        return {
            stations: [],
            isLoggedIn: false,
        };
    },
    async mounted() {
        this.$auth.onAuthStateChanged((user) => {
            this.isLoggedIn = user !== null;
        });

        try {
            const res = await this.$axios.get(`${import.meta.env.VITE_API_URL}/stations`);
            this.stations = res.data;
        } catch (err) {
            console.error("Could not fetch stations:", err);
        }
    },
    methods: {
        showLoginModal() {
            this.$vfm.show("login-modal");
        },
        checkLogin(err) {
            if (err) {
                console.error("Failed to login or verify user");
                this.logout();
            } else {
                console.log("Logged in successfully");
            }
        },
        async logout() {
            try {
                await this.$auth.signOut();
                await this.$axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`);
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
