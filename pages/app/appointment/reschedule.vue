<script setup>
definePageMeta({
  title: "Reschedule Appointment",
});

const reason = ref("");
const newDate = ref("");
const newTime = ref("");

const submitReschedule = () => {
  // Implement rescheduling logic
  console.log("Rescheduling appointment...", {
    reason: reason.value,
    newDate: newDate.value,
    newTime: newTime.value,
  });
  navigateTo("/app/appointment/confirmation");
};
</script>

<template>
  <div class="container mx-auto p-4">
    <rs-card>
      <template #header>
        <h1 class="text-2xl font-bold">Reschedule Appointment</h1>
      </template>
      <template #body>
        <FormKit type="form" @submit="submitReschedule">
          <FormKit
            v-model="reason"
            type="textarea"
            label="Reason for Rescheduling"
            validation="required"
          >
            <template #label>
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
              >
                Reason for Rescheduling<span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>
          <FormKit
            v-model="newDate"
            type="date"
            label="New Date"
            validation="required"
          >
            <template #label>
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
              >
                New Date<span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>
          <FormKit
            v-model="newTime"
            type="time"
            label="New Time"
            validation="required"
          >
            <template #label>
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
              >
                New Time<span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>
        </FormKit>
        <div class="mt-4 flex space-x-4">
          <rs-button @click="submitReschedule"
            >Submit Reschedule Request</rs-button
          >
          <rs-button @click="navigateTo('/app/appointment')" variant="secondary"
            >Cancel</rs-button
          >
        </div>
      </template>
    </rs-card>
  </div>
</template>
