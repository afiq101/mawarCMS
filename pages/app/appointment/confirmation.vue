<script setup>
definePageMeta({
  title: "Appointment Confirmation",
});

const appointmentDetails = reactive({
  service: "New Passport Application",
  date: "2023-06-15",
  time: "10:00 AM",
  location: "Passport Office, Kuala Lumpur",
  referenceNumber: "APT-2023-06-15-001",
});

const printConfirmation = () => {
  window.print();
};

const downloadPDF = () => {
  // Implement PDF download logic
  console.log("Downloading PDF...");
};
</script>

<template>
  <div class="container mx-auto p-4">
    <rs-card>
      <template #header>
        <h1 class="text-2xl font-bold">Appointment Confirmation</h1>
      </template>
      <template #body>
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Appointment Details</h2>
          <p><strong>Service:</strong> {{ appointmentDetails.service }}</p>
          <p><strong>Date:</strong> {{ appointmentDetails.date }}</p>
          <p><strong>Time:</strong> {{ appointmentDetails.time }}</p>
          <p><strong>Location:</strong> {{ appointmentDetails.location }}</p>
          <p>
            <strong>Reference Number:</strong>
            {{ appointmentDetails.referenceNumber }}
          </p>
        </div>
        <div class="flex space-x-4">
          <rs-button @click="printConfirmation">Print</rs-button>
          <rs-button @click="downloadPDF" variant="secondary"
            >Download PDF</rs-button
          >
        </div>
        <rs-alert variant="info" class="mt-6">
          Please bring this confirmation and all required documents to your
          appointment.
        </rs-alert>
      </template>
    </rs-card>
  </div>
</template>
