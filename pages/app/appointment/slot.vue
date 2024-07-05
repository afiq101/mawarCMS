<script setup>
definePageMeta({
  title: "Choose Appointment Slot",
});

const selectedDate = ref(null);
const selectedTime = ref(null);

const availableSlots = ref([
  { id: 1, time: "09:00 AM" },
  { id: 2, time: "10:00 AM" },
  { id: 3, time: "11:00 AM" },
  { id: 4, time: "02:00 PM" },
  { id: 5, time: "03:00 PM" },
]);

const confirmAppointment = () => {
  if (selectedDate.value && selectedTime.value) {
    navigateTo("/app/appointment/personal-details");
  }
};
</script>

<template>
  <div class="container mx-auto p-4">
    <rs-card>
      <template #header>
        <h1 class="text-2xl font-bold">Choose Appointment Slot</h1>
      </template>
      <template #body>
        <FormKit
          v-model="selectedDate"
          type="date"
          label="Select Date"
          validation="required"
        >
          <template #label>
            <label
              class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
            >
              Select Date<span class="text-danger">*</span>
            </label>
          </template>
        </FormKit>
        <FormKit
          v-model="selectedTime"
          type="radio"
          :options="availableSlots"
          label="Select Time"
          option-labels="time"
          validation="required"
        >
          <template #label>
            <label
              class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
            >
              Select Time<span class="text-danger">*</span>
            </label>
          </template>
        </FormKit>
        <div class="mt-4">
          <rs-button
            @click="confirmAppointment"
            :disabled="!selectedDate || !selectedTime"
          >
            Confirm Appointment
          </rs-button>
        </div>
      </template>
    </rs-card>
  </div>
</template>
