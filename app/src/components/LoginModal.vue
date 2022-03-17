<template>
    <vue-final-modal
        v-model="showModal"
        :name="name"
        classes="modal-container"
        content-class="modal-content"
        :esc-to-close="true"
    >
        <button class="absolute top-4 right-4" @click="close">X</button>
        <h3 class="custom-title mt-4">Login to your account</h3>
        <p :hidden="errorMessage === null" class="text-red-500 mb-4 text-center">{{ errorMessage }}</p>
        <form @submit="login" action="" class="text-center">
            <input v-model="email" type="email" class="custom-input" name="email" placeholder="Email address" />
            <input v-model="password" type="password" class="custom-input" name="password" placeholder="Password" />
            <button :disabled="!isValidForm()" type="submit" class="custom-btn bg-indigo-500 hover:bg-indigo-600 mt-4">
                Login
            </button>
        </form>
    </vue-final-modal>
</template>

<script>
export default {
    data() {
        return {
            showModal: false,
            name: "login-modal",
            email: "",
            password: "",
            errorMessage: "",
        };
    },
    methods: {
        close() {
            this.$vfm.hide(this.name);
        },
        async login(e) {
            e.preventDefault();

            this.errorMessage = "";

            try {
                // Login to Firebase.
                const res = await this.$axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
                    email: this.email,
                    password: this.password,
                });
                await this.$auth.signIn(res.data.token);

                // Grab ID token and verify it.
                const idToken = await this.$auth.getIdToken(true);
                await this.$axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`, {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                });
                this.email = "";
                this.password = "";
                this.close();
            } catch (err) {
                if (err.response) {
                    this.errorMessage = err.response.data.message;
                } else {
                    this.errorMessage = err.message;
                }
            }

            this.$emit("loggedIn", this.errorMessage);
        },
        isValidForm() {
            return this.isValidEmail() && this.password.length >= 6;
        },
        isValidEmail() {
            var re =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(this.email);
        },
    },
};
</script>

<style scoped>
::v-deep(.modal-container) {
    display: flex;
    justify-content: center;
    align-items: center;
}

::v-deep(.modal-content) {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
    padding: 2rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    background: #fff;
}
</style>
