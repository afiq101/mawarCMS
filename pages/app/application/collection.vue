<script setup>
definePageMeta({
  title: "Passport Collection",
});

const collectionDetails = reactive({
  referenceNumber: "APP-2023-001234",
  collectionDate: "2023-06-30",
  collectionTime: "10:00 AM",
  location: "Passport Office, Kuala Lumpur",
});

const confirmCollection = () => {
  // Implement logic to confirm collection appointment
  console.log("Confirming collection appointment:", collectionDetails);
  navigateTo("/app/dashboard");
};
</script>

<template>
  <div class="container mx-auto p-4">
    <rs-card>
      <template #header>
        <h1 class="text-2xl font-bold">Passport Collection</h1>
      </template>
      <template #body>
        <rs-alert variant="success" class="mb-6">
          Your passport is ready for collection!
        </rs-alert>

        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Collection Details</h2>
          <p>
            <strong>Reference Number:</strong>
            {{ collectionDetails.referenceNumber }}
          </p>
          <p>
            <strong>Collection Date:</strong>
            {{ collectionDetails.collectionDate }}
          </p>
          <p>
            <strong>Collection Time:</strong>
            {{ collectionDetails.collectionTime }}
          </p>
          <p><strong>Location:</strong> {{ collectionDetails.location }}</p>
        </div>

        <rs-alert variant="info" class="mb-6">
          Please bring your identification documents and collection notification
          when you come to collect your passport.
        </rs-alert>

        <div class="flex space-x-4">
          <rs-button @click="confirmCollection"
            >Confirm Collection Appointment</rs-button
          >
          <rs-button
            @click="navigateTo('/app/application/reschedule')"
            variant="secondary"
          >
            Reschedule Collection
          </rs-button>
        </div>
      </template>
    </rs-card>
  </div>
</template>
