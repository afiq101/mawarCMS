<script setup>
definePageMeta({
  title: "Make Payment",
});

const paymentMethod = ref("");
const cardNumber = ref("");
const expiryDate = ref("");
const cvv = ref("");

const paymentMethods = [
  { label: "Credit Card", value: "credit" },
  { label: "Debit Card", value: "debit" },
  { label: "Online Banking", value: "online" },
];

const submitPayment = () => {
  // Implement payment processing logic
  console.log("Processing payment:", {
    paymentMethod: paymentMethod.value,
    cardNumber: cardNumber.value,
  });
  navigateTo("/app/application/payment-confirmation");
};
</script>

<template>
  <div class="container mx-auto p-4">
    <rs-card>
      <template #header>
        <h1 class="text-2xl font-bold">Make Payment</h1>
      </template>
      <template #body>
        <FormKit type="form" @submit="submitPayment">
          <FormKit
            v-model="paymentMethod"
            type="radio"
            label="Payment Method"
            :options="paymentMethods"
            validation="required"
          >
            <template #label>
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
              >
                Payment Method<span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>

          <div v-if="paymentMethod === 'credit' || paymentMethod === 'debit'">
            <FormKit
              v-model="cardNumber"
              type="text"
              label="Card Number"
              validation="required|length:16"
            >
              <template #label>
                <label
                  class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
                >
                  Card Number<span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>
            <FormKit
              v-model="expiryDate"
              type="text"
              label="Expiry Date (MM/YY)"
              validation="required"
            >
              <template #label>
                <label
                  class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
                >
                  Expiry Date (MM/YY)<span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>
            <FormKit
              v-model="cvv"
              type="text"
              label="CVV"
              validation="required|number|length:3,4"
            >
              <template #label>
                <label
                  class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
                >
                  CVV<span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>
          </div>

          <div v-if="paymentMethod === 'online'">
            <p class="mb-4">
              You will be redirected to your bank's website to complete the
              payment.
            </p>
          </div>
        </FormKit>

        <div class="mt-6">
          <rs-button @click="submitPayment" :disabled="!paymentMethod">
            Proceed to Payment
          </rs-button>
        </div>
      </template>
    </rs-card>
  </div>
</template>
