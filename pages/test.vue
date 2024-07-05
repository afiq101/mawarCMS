<template>
  <div>
    <rs-card>
      <template #header>
        <h2>Application Review</h2>
      </template>
      <template #body>
        <p><strong>Application ID:</strong> {{ applicationId }}</p>
        <p><strong>Applicant Name:</strong> {{ form.applicantName }}</p>
        <p><strong>Company Name:</strong> {{ form.companyName }}</p>
        <p><strong>License Type:</strong> {{ form.licenseType }}</p>
        <p><strong>Submission Date:</strong> {{ submissionDate }}</p>
        <FormKit type="form" @submit="submitReview">
          <FormKit
            v-model="form.reviewComments"
            type="textarea"
            label="Review Comments"
            validation="length:0,500|pattern:^[a-zA-Z0-9 ]+$"
            validation-visibility="dirty"
          />
          <FormKit
            v-model="form.approvalStatus"
            type="select"
            label="Approval Status"
            :options="approvalStatusOptions"
            validation="required"
            validation-visibility="dirty"
          >
            <template #label>
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
              >
                Approval Status
                <span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>
        </FormKit>
      </template>
    </rs-card>
  </div>
</template>

<script setup>
const applicationId = "123456"; // This should be fetched dynamically
const submissionDate = "2023-10-10"; // This should be fetched dynamically

const form = reactive({
  applicantName: "John Doe",
  companyName: "ABC Ltd.",
  licenseType: "Type A",
  reviewComments: "",
  approvalStatus: "",
});

const approvalStatusOptions = [
  { value: "Approved", label: "Approved" },
  { value: "Rejected", label: "Rejected" },
  { value: "Pending", label: "Pending" },
];

const submitReview = () => {
  // Handle review form submission
};
</script>
