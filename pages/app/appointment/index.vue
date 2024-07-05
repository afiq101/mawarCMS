<script setup>
definePageMeta({
  title: "Select Service",
});

const services = ref([
  { id: 1, name: "New Passport Application" },
  { id: 2, name: "Passport Renewal" },
  { id: 3, name: "Lost Passport Replacement" },
]);

const selectedService = ref(null);

const nextStep = () => {
  if (selectedService.value) {
    navigateTo("/app/appointment/slot");
  }
};
</script>

<template>
  <div class="container mx-auto p-4">
    <rs-card>
      <template #header>
        <h1 class="text-2xl font-bold">Select Service</h1>
      </template>
      <template #body>
        <FormKit
          v-model="selectedService"
          type="radio"
          :options="services"
          label="Choose a service"
          option-labels="name"
          validation="required"
        >
          <template #label>
            <label
              class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
            >
              Choose a service<span class="text-danger">*</span>
            </label>
          </template>
        </FormKit>
        <div class="mt-4">
          <rs-button @click="nextStep" :disabled="!selectedService"
            >Next</rs-button
          >
        </div>
      </template>
    </rs-card>
  </div>
</template>
