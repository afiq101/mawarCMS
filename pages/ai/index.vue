<script setup>
definePageMeta({
  title: "Chatbot",
  description: "Chatbot Landing",
  layout: "emtpy",
  requiresAuth: true,
});

const currentStep = ref("init");
const stepData = ref(null);
const historyStep = ref([]);

const step = reactive({
  init: {
    title: "Create a new project",
    description: "Choose a template to get started or start from scratch.",
    type: "option",
    children: [
      {
        id: "code",
        title: "Code Generation",
        description:
          "Generate and refine code using visual or textual context. Upload up to 5 files (e.g., screenshots, Figma, SRS) to create an assistant that helps with code generation using Rose UI and Vue 3 components.",
        icon: "ph:code",
      },
      {
        id: "doc",
        title: "Document Generation",
        description:
          "Create project documents such as SRS, URS, ERD, and DFD. Provide project context and upload up to 5 files to generate documents with the help of a specialized assistant.",
        icon: "ph:file-duotone",
      },
    ],
  },
  code: {
    title: "Code Generation",
    description:
      "Choose this option to generate or refine code based on visual or textual context.",
    type: "option",
    children: [
      {
        id: "code-visual",
        title: "Visual",
        description:
          "Select this option to use visual files such as screenshots, Figma, XD files, images (JPG, PNG), and others.",
        icon: "ph:eye",
      },
      {
        id: "code-textual",
        title: "Textual",
        description:
          "Select this option to use text-based documents such as SRS, URS, PDF, DOCX, TXT, and Excel files.",
        icon: "ph:text-t",
      },
    ],
  },
  "code-visual": {
    title: "Visual Code Generation",
    description:
      "Upload visual files such as screenshots, Figma, XD files, images (JPG, PNG), and others to generate code using Rose UI and Vue 3 components.",
    type: "form",
    form: [
      {
        id: "visualFiles",
        label: "Visual Files",
        type: "dropzone",
        placeholder: "Upload visual files",
      },
      {
        id: "visualCustomInstruction",
        label: "Custom Instructions",
        type: "textarea",
        placeholder: "Enter custom instructions",
      },
    ],
  },
  "code-textual": {
    title: "Textual Code Generation",
    description:
      "Upload text-based documents such as SRS, URS, PDF, DOCX, TXT, and Excel files to generate code using Rose UI and Vue 3 components.",
    type: "form",
    form: [
      {
        id: "textualFile1",
        label: "Textual Files 1",
        type: "file",
        placeholder: "Upload textual files",
      },
      {
        id: "textualFile1Type",
        label: "Type Textual Document 1",
        type: "file",
        options: ["URS", "SRS", "ERD", "DFD", "Others"],
        placeholder: "Select file type",
      },
      {
        id: "textualFile2",
        label: "Textual Files 2",
        type: "file",
        placeholder: "Upload textual files",
      },
      {
        id: "textualFile2Type",
        label: "Type Textual Document 2",
        type: "file",
        options: ["URS", "SRS", "ERD", "DFD", "Others"],
        placeholder: "Select file type",
      },
      {
        id: "textualFile3",
        label: "Textual Files 3",
        type: "file",
        placeholder: "Upload textual files",
      },
      {
        id: "textualFile3Type",
        label: "Type Textual Document 3",
        type: "file",
        options: ["URS", "SRS", "ERD", "DFD", "Others"],
        placeholder: "Select file type",
      },
      {
        id: "textualFile4",
        label: "Textual Files 4",
        type: "file",
        placeholder: "Upload textual files",
      },
      {
        id: "textualFile2Type",
        label: "Type Textual Document 4",
        type: "file",
        options: ["URS", "SRS", "ERD", "DFD", "Others"],
        placeholder: "Select file type",
      },
      {
        id: "textualFile2",
        label: "Textual Files 5",
        type: "file",
        placeholder: "Upload textual files",
      },
      {
        id: "textualFile2Type",
        label: "Type Textual Document 5",
        type: "file",
        options: ["URS", "SRS", "ERD", "DFD", "Others"],
        placeholder: "Select file type",
      },
      {
        id: "textualCustomInstruction",
        label: "Custom Instructions",
        type: "textarea",
        placeholder: "Enter custom instructions",
      },
    ],
  },
  doc: {
    title: "Document Generation (Assistant)",
    description:
      "Choose this option to generate project documents such as SRS, URS, ERD, and DFD. Provide project context and upload up to 5 files to generate documents with the help of a specialized assistant.",
    type: "avatar",
    children: [
      {
        id: "doc2nd",
        title: "SRS Assistant",
        description:
          "Select this option to generate a Software Requirements Specification document.",
        img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "doc2nd",
        title: "URS Assistant",
        description:
          "Select this option to generate a User Requirements Specification document.",
        img: "https://images.unsplash.com/photo-1517256673644-36ad11246d21?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "doc2nd",
        title: "ERD Assistant",
        description:
          "Select this option to generate an Entity Relationship Diagram document.",
        img: "https://images.unsplash.com/photo-1543984613-f55ca6a1ba35?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "doc2nd",
        title: "DFD Assistant",
        description:
          "Select this option to generate a Data Flow Diagram document.",
        img: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  doc2nd: {
    title: "Add Project Context",
    description:
      "Provide project context to generate a Software Requirements Specification document.",
    type: "form",
    form: [
      {
        id: "projectName",
        label: "Project Name",
        type: "text",
        placeholder: "Enter project name",
      },
      {
        id: "projectDesc",
        label: "Project Description",
        type: "textarea",
        placeholder: "Enter project description",
      },
      {
        id: "projectFiles",
        label: "Project Files",
        type: "dropzone",
        placeholder: "Upload project files",
      },
      {
        id: "ProjectCustomInstruction",
        label: "Custom Instructions",
        type: "textarea",
        placeholder: "Enter custom instructions",
      },
    ],
  },
});

const handleStep = (newId, isBack = false) => {
  // If the handle is back, remove the last step from the history.
  // if (isBack) {
  //   historyStep.value = historyStep.value.filter((item) => item.id !== newId);
  // } else {
  //   // If already in the history, remove the steps after the current step.
  //   const index = historyStep.value.findIndex(
  //     (item) => item.id === currentStep.value
  //   );
  //   if (index !== -1) {
  //     historyStep.value = historyStep.value.slice(0, index + 1);
  //   }

  //   // Add the new step to the history.
  //   historyStep.value.push({
  //     id: newId,
  //     title: step[newId].title,
  //   });
  // }

  stepData.value = step[newId];
  currentStep.value = newId;
};

onMounted(() => {
  stepData.value = step.init;
  currentStep.value = "init";
});
</script>

<template>
  <div>
    <div
      class="fixed py-10 w-full z-10"
      style="
        background: rgb(124, 233, 255);
        background: linear-gradient(
          0deg,
          rgba(124, 233, 255, 0) 0%,
          rgba(0, 0, 0, 0.6657256652661064) 100%
        );
      "
    ></div>
    <div class="text-zinc-200">
      <div class="container mx-auto pt-10">
        <div
          @click="handleStep('init')"
          class="flex justify-center items-center ml-3 cursor-pointer gap-3 mt-10"
        >
          <Icon
            name="mdi:atom-variant"
            class="text-[#c9dbbb] animate-spin !w-8 !h-8"
          ></Icon>

          <span class="text-2xl mt-1" style="font-family: 'PP Editorial New'">
            CorradAI
          </span>
        </div>

        <section
          v-if="stepData"
          class="flex flex-col justify-center items-center gap-5 px-4 mt-10"
        >
          <div class="flex items-center gap-2">
            <div
              class="flex items-center gap-2"
              v-for="(history, index) in historyStep"
            >
              <div v-if="index > 0" class="flex items-center gap-2">
                <Icon name="ph:caret-right-duotone" class="text-[#c9dbbb]" />
              </div>
              <div
                class="bg-[#172113] border-[1px] border-[#36482c] rounded-md p-3 flex gap-2 text-[#f4f4f5] w-full cursor-pointer"
                @click="handleStep(history.id, currentStep === history.id)"
              >
                {{ history.title }}
              </div>
            </div>
          </div>
          <div class="text-center mb-8">
            <h1 class="text-4xl text-white font-bold mb-1">
              {{ stepData.title }}
            </h1>
            <p class="text-white text-lg line-h">
              {{ stepData.description }}
            </p>
          </div>

          <div
            v-if="stepData.type === 'option' || stepData.type === 'avatar'"
            class="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-8"
          >
            <button
              v-for="item in stepData.children"
              class="h-full rounded-md py-5 px-8 flex items-center gap-4 cursor-pointer bg-[#242323] hover:bg-[#3d3d3d] border-[1px] border-[#2a2a27] max-w-[500px]"
              :class="stepData.type === 'option' ? 'flex-row' : 'flex-col'"
              @click="handleStep(item.id)"
            >
              <div class="flex-1">
                <Icon
                  v-if="item.icon"
                  :name="item.icon"
                  class="!w-[45px] !h-[45px] text-[#c9dbbb]"
                />
                <img
                  v-if="item.img"
                  :src="item.img"
                  class="w-[100px] h-[100px] rounded-md object-cover"
                />
              </div>
              <div class="flex flex-col text-left">
                <h3 class="mb-1">
                  {{ item.title }}
                </h3>
                <p class="leading-5 text-zinc-300">
                  {{ item.description }}
                </p>
              </div>
            </button>
          </div>
          <div
            v-else
            class="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-8"
          >
            <div class="w-full md:w-[800px] mx-8">
              <FormKit type="form" :actions="false">
                <FormKit
                  v-for="field in stepData.form"
                  :type="field.type"
                  :label="field.label"
                  :placeholder="field.placeholder"
                />

                <div class="flex justify-end">
                  <nuxt-link to="/ai/chatbot/project">
                    <rs-button>
                      <Icon
                        name="ph:chat-teardrop-dots-duotone"
                        class="text-[#c9dbbb] mr-1"
                      />
                      Start Conversation
                    </rs-button>
                  </nuxt-link>
                </div>
              </FormKit>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
html[data-theme="default"] {
  --color-primary: 85, 120, 65;
  --color-secondary: 23, 33, 19;
  --color-accent: 243, 244, 246;
  --color-success: 79, 192, 103;
  --color-info: 65, 133, 242;
  --color-warning: 246, 141, 32;
  --color-danger: 229, 83, 69;
  --text-color: 240, 240, 240;
  --border-color: 233, 233, 236;
  --bg-1: 43, 42, 40;
  --bg-2: 32, 32, 32;
  --scroll-color: 170, 170, 170;
  --scroll-hover-color: 155, 155, 155;
  --fk-border-color: 67, 67, 67;
  --fk-placeholder-color: 196, 196, 196;
  --box-shadow: rgba(36, 35, 71, 0.05) 0px 1px 1px,
    rgba(36, 35, 71, 0.05) 0px 0px 1px 1px;
  --cp-bg: 255, 255, 255;
  --rounded-box: 0.2rem;
  --rounded-btn: 0.2rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: 0.2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --padding-btn: 0.5rem;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --tw-shadow: #e5eaf2;
}
</style>
