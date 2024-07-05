<script setup>
definePageMeta({
  title: "Dashboard",
});

const notifications = ref([
  { id: 1, message: "Your appointment is scheduled for tomorrow." },
  { id: 2, message: "Your passport application has been approved." },
]);
</script>

<template>
  <div class="container mx-auto p-4">
    <rs-card>
      <template #header>
        <h1 class="text-2xl font-bold">
          Welcome to Passport Application System
        </h1>
      </template>
      <template #body>
        <div class="mb-4">
          <h2 class="text-xl font-semibold mb-2">Notifications</h2>
          <ul>
            <li
              v-for="notification in notifications"
              :key="notification.id"
              class="mb-2"
            >
              <rs-alert :variant="notification.id === 1 ? 'info' : 'success'">
                {{ notification.message }}
              </rs-alert>
            </li>
          </ul>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <rs-button @click="navigateTo('/app/appointment')"
            >Schedule Appointment</rs-button
          >
          <rs-button @click="navigateTo('/app/application')"
            >Start Passport Application</rs-button
          >
        </div>
      </template>
    </rs-card>
  </div>
</template>
