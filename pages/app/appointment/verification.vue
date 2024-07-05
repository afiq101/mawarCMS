<script setup>
definePageMeta({
  title: "System Verification",
});

const verificationStatus = ref("pending");
const verificationMessage = ref("");

onMounted(() => {
  // Simulating verification process
  setTimeout(() => {
    verificationStatus.value = "success";
    verificationMessage.value =
      "Verification successful. Your identity has been confirmed.";
  }, 3000);
});

const proceedToConfirmation = () => {
  navigateTo("/app/appointment/confirmation");
};
</script>

<template>
  <div class="container mx-auto p-4">
    <rs-card>
      <template #header>
        <h1 class="text-2xl font-bold">System Verification</h1>
      </template>
      <template #body>
        <div v-if="verificationStatus === 'pending'" class="text-center">
          <p class="mb-4">Please wait while we verify your information...</p>
          <Icon
            name="line-md:loading-twotone-loop"
            class="w-12 h-12 text-blue-500"
          />
        </div>
        <div v-else-if="verificationStatus === 'success'" class="text-center">
          <rs-alert variant="success" class="mb-4">
            {{ verificationMessage }}
          </rs-alert>
          <rs-button @click="proceedToConfirmation"
            >Proceed to Confirmation</rs-button
          >
        </div>
        <div v-else class="text-center">
          <rs-alert variant="danger" class="mb-4">
            Verification failed. Please try again or contact support.
          </rs-alert>
          <rs-button @click="navigateTo('/app/appointment/personal-details')">
            Back to Personal Details
          </rs-button>
        </div>
      </template>
    </rs-card>
  </div>
</template>
