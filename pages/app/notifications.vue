<script setup>
definePageMeta({
  title: "Notification Preferences",
});

const notificationPreferences = reactive({
  email: true,
  sms: true,
});

const notificationHistory = ref([
  {
    date: "2023-06-15",
    message: "Application submitted successfully",
    type: "email",
  },
  {
    date: "2023-06-15",
    message: "Payment received for passport application",
    type: "sms",
  },
  {
    date: "2023-06-16",
    message: "Document verification in progress",
    type: "email",
  },
]);

const savePreferences = () => {
  // Implement logic to save notification preferences
  console.log("Saving preferences:", notificationPreferences);
};

const resendNotification = (index) => {
  // Implement logic to resend notification
  console.log("Resending notification:", notificationHistory[index]);
};
</script>

<template>
  <div class="container mx-auto p-4">
    <rs-card>
      <template #header>
        <h1 class="text-2xl font-bold">Notification Preferences</h1>
      </template>
      <template #body>
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Preferences</h2>
          <FormKit type="form" @submit="savePreferences">
            <FormKit
              v-model="notificationPreferences.email"
              type="checkbox"
              label="Receive Email Notifications"
            />
            <FormKit
              v-model="notificationPreferences.sms"
              type="checkbox"
              label="Receive SMS Notifications"
            />
          </FormKit>
          <rs-button @click="savePreferences" class="mt-4"
            >Save Preferences</rs-button
          >
        </div>

        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Notification History</h2>
          <ul>
            <li
              v-for="(notification, index) in notificationHistory"
              :key="index"
              class="mb-2"
            >
              <p>
                <strong>{{ notification.date }}:</strong>
                {{ notification.message }}
              </p>
              <p class="text-sm text-gray-500">
                Sent via {{ notification.type }}
              </p>
              <rs-button
                @click="resendNotification(index)"
                size="sm"
                class="mt-1"
              >
                Resend
              </rs-button>
            </li>
          </ul>
        </div>
      </template>
    </rs-card>
  </div>
</template>
