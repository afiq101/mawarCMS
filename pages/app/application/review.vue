<script setup>
definePageMeta({
  title: "Passport Application Form",
});

const form = reactive({
  personalInfo: {
    name: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
  },
  contactInfo: {
    email: "",
    phone: "",
    address: "",
  },
  passportDetails: {
    type: "",
    currentNumber: "",
    expiryDate: "",
  },
  documents: [],
});

const passportTypes = [
  { label: "Standard Passport", value: "standard" },
  { label: "Diplomatic Passport", value: "diplomatic" },
  { label: "Official Passport", value: "official" },
];

const submitForm = () => {
  console.log("Application submitted", form);
  navigateTo("/app/application/review");
};
</script>

<template>
  <div class="container mx-auto p-4">
    <rs-card>
      <template #header>
        <h1 class="text-2xl font-bold">Passport Application Form</h1>
      </template>
      <template #body>
        <FormKit type="form" @submit="submitForm">
          <h2 class="text-xl font-semibold mb-2">Personal Information</h2>
          <FormKit
            v-model="form.personalInfo.name"
            type="text"
            label="Full Name"
            validation="required"
          >
            <template #label>
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
              >
                Full Name<span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>
          <FormKit
            v-model="form.personalInfo.dateOfBirth"
            type="date"
            label="Date of Birth"
            validation="required"
          >
            <template #label>
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
              >
                Date of Birth<span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>
          <FormKit
            v-model="form.personalInfo.gender"
            type="radio"
            label="Gender"
            :options="['Male', 'Female']"
            validation="required"
          >
            <template #label>
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
              >
                Gender<span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>
          <FormKit
            v-model="form.personalInfo.nationality"
            type="text"
            label="Nationality"
            validation="required"
          >
            <template #label>
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
              >
                Nationality<span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>

          <h2 class="text-xl font-semibold mb-2 mt-6">Contact Information</h2>
          <FormKit
            v-model="form.contactInfo.email"
            type="email"
            label="Email"
            validation="required|email"
          >
            <template #label>
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
              >
                Email<span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>
          <FormKit
            v-model="form.contactInfo.phone"
            type="tel"
            label="Phone Number"
            validation="required"
          >
            <template #label>
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
              >
                Phone Number<span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>
          <FormKit
            v-model="form.contactInfo.address"
            type="textarea"
            label="Address"
            validation="required"
          >
            <template #label>
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
              >
                Address<span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>

          <h2 class="text-xl font-semibold mb-2 mt-6">Passport Details</h2>
          <FormKit
            v-model="form.passportDetails.type"
            type="select"
            label="Passport Type"
            :options="passportTypes"
            validation="required"
          >
            <template #label>
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
              >
                Passport Type<span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>
          <FormKit
            v-model="form.passportDetails.currentNumber"
            type="text"
            label="Current Passport Number (if applicable)"
          >
            <template #label>
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
              >
                Current Passport Number (if applicable)
              </label>
            </template>
          </FormKit>
          <FormKit
            v-model="form.passportDetails.expiryDate"
            type="date"
            label="Current Passport Expiry Date (if applicable)"
          >
            <template #label>
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
              >
                Current Passport Expiry Date (if applicable)
              </label>
            </template>
          </FormKit>

          <h2 class="text-xl font-semibold mb-2 mt-6">Supporting Documents</h2>
          <FormKit
            v-model="form.documents"
            type="file"
            label="Upload Supporting Documents"
            accept="image/*,.pdf"
            multiple
          >
            <template #label>
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
              >
                Upload Supporting Documents
              </label>
            </template>
          </FormKit>
        </FormKit>
      </template>
    </rs-card>
  </div>
</template>
