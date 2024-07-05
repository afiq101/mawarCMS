<script setup>
definePageMeta({
  title: "Login",
  layout: "empty",
});

const form = reactive({
  username: "",
  password: "",
});

const submitForm = () => {
  // Handle login logic here
  console.log("Login submitted", form);
  navigateTo("/app/dashboard");
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <rs-card class="w-full max-w-md">
      <template #header>
        <h1 class="text-2xl font-bold text-center">Login</h1>
      </template>
      <template #body>
        <FormKit type="form" @submit="submitForm">
          <FormKit
            v-model="form.username"
            type="text"
            name="username"
            label="Username"
            validation="required"
          >
            <template #label>
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
              >
                Username<span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>
          <FormKit
            v-model="form.password"
            type="password"
            name="password"
            label="Password"
            validation="required"
          >
            <template #label>
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
              >
                Password<span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>
        </FormKit>
        <div class="mt-4 text-center">
          <NuxtLink
            to="/app/forgot-password"
            class="text-blue-500 hover:underline"
            >Forgot Password?</NuxtLink
          >
        </div>
      </template>
    </rs-card>
  </div>
</template>
