<script setup>
definePageMeta({
  title: "Enter Personal Details",
});

const form = reactive({
  name: '',
  dateOfBirth: '',
  gender: '',
  nationality: '',
  email: '',
  phoneNumber: '',
});

const submitForm = () => {
  console.log('Form submitted', form);
  navigateTo('/app/appointment/verification');
};
</script>

<template>
  <div class="container mx-auto p-4">
    <rs-card>
      <template #header>
        <h1 class="text-2xl font-bold">Enter Personal Details</h1>
      </template>
      <template #body>
        <FormKit type="form" @submit="submitForm">
          <FormKit
            v-model="form.name"
            type="text"
            label="Full Name"
            validation="required"
          >
            <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                Full Name<span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>
          <FormKit
            v-model="form.dateOfBirth"
            type="date"
            label="Date of Birth"
            validation="required"
          >
            <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                Date of Birth<span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>
          <FormKit
            v-model="form.gender"
            type="radio"
            label="Gender"
            :options="['Male', 'Female']"
            validation="required"
          >
            <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                Gender<span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>
          <FormKit
            v-model="form.nationality"
            type="text"
            label="Nationality"
            validation="required"
          >
            <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                Nationality<span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>
          <FormKit
            v-model="form.email"
            type="email"
            label="Email"
            validation="required|email"
          >
            <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                Email<span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>
          <FormKit
            v-model="form.phoneNumber"
            type="tel"
            label="Phone Number"
            validation="required|length:10"
          >
            <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                Phone Number<span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>
        </FormKit>
      </template>
    </rs-card>
  </div>
</template>