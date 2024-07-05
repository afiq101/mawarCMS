<script setup>
import Prism from "prismjs";
import { ref, onMounted, onUpdated, nextTick } from "vue";

definePageMeta({
  title: "Project",
  description: "Chatbot page",
  layout: "empty",
  requiresAuth: true,
});

const { $swal } = useNuxtApp();
const { threadID } = useRoute().params;

const code = ref(false);
const history = ref(false);
const historyWidth = ref("0px");
const showProfile = ref(false);

const newText = ref(true);
const currentChat = ref("");
const onGoingChat = ref([]);
const waitingResponse = ref(false);
const openedProject = ref(false);
const copiedIndex = ref(false);
const showModal = ref(false);

const newProject = ref(false);
const newProject1 = ref(false);

const fileAttachment = ref(null);
const fileId = ref(null);

const newChatOptionList = ref([
  {
    title: "Create SRS",
    value: "SRS",
    description: "Create a Software Requirements Specification document",
  },
  {
    title: "Create URS",
    value: "URS",
    description: "Create a User Requirements Specification document",
  },
  {
    title: "Create DFD",
    value: "DFD",
    description: "Create a Data Flow Diagram",
  },
  {
    title: "Create Use Case",
    value: "USECASE",
    description: "Create a Use Case diagram",
  },
]);

const historyList = ref([
  { title: "ToyyibPay Category Creation", value: 0 },
  { title: "Diagram API Documentation", value: 0 },
  { title: "Sequence Diagram Creation", value: 0 },
  { title: "Convert User Story URS", value: 0 },
]);

watch(history, (newValue) => {
  historyWidth.value = newValue ? "300px" : "0px";
});

watch(onGoingChat, () => {
  nextTick(() => {
    const chatContainer = document.querySelector(".scrollbar");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  });
});

const { data: getMessage } = await useFetch("/api/demo/message-list", {
  method: "GET",
  params: { threadId: threadID },
});

if (getMessage.value.statusCode === 200) {
  onGoingChat.value = getMessage.value.data;
  newText.value = getMessage.value.data.length === 0;
}

async function handleChat(type, contentType, resp) {
  newText.value = false;
  waitingResponse.value = true;

  try {
    if (type === "user") {
      onGoingChat.value.push({ type, contentType, chat: resp });
      currentChat.value = "";
      await getResponseAI(resp);
    } else {
      waitingResponse.value = false;
      animateText(contentType, resp);
    }
  } catch (error) {
    console.error("error:", error);
    $swal.fire({
      title: "Something went wrong!",
      text: "Please try again later.",
      icon: "warning",
      confirmButtonText: "OK",
    });
  }
}

async function getResponseAI(resp) {
  const formData = new FormData();
  console.log("fileAttachment:", fileAttachment.value);

  formData.append("threadId", threadID);
  formData.append("message", resp);
  formData.append(
    "file",
    !fileId.value && fileAttachment.value ? fileAttachment.value : ""
  );
  formData.append(
    "fileName",
    !fileId.value && fileAttachment.value ? fileAttachment.value.name : ""
  );
  formData.append("fileID", fileId.value ? fileId.value : "");

  const { data } = await useFetch("/api/demo/create-message", {
    method: "POST",
    body: formData,
  });

  if (data.value.statusCode !== 200) {
    console.error("Error", data.value.message);
    return;
  }

  fileId.value = data.value.data.fileID;

  // fileAttachment.value = null;

  const { data: latestMsg } = await useFetch("/api/demo/latest-message", {
    method: "GET",
    params: { threadId: threadID },
  });

  if (latestMsg.value.statusCode !== 200) {
    console.error("Error", latestMsg.value.message);
    return;
  }

  await handleChat("assistant", "text", latestMsg.value.data.chat);
}

function copyToClipboard(text, index) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      copiedIndex.value = index;
      setTimeout(() => {
        copiedIndex.value = null;
      }, 1500);
    })
    .catch((err) => console.error("Failed to copy text: ", err));
}

function animateText(contentType, text) {
  const words = text.split(" ");
  let currentIndex = 0;
  const aiChatIndex = onGoingChat.value.length;
  onGoingChat.value.push({ type: "assistant", contentType, chat: "" });

  const interval = setInterval(() => {
    if (currentIndex < words.length) {
      onGoingChat.value[aiChatIndex].chat +=
        currentIndex > 0 ? ` ${words[currentIndex]}` : words[currentIndex];
      currentIndex++;
      const chatContainer = document.querySelector(".scrollbar");
      chatContainer.scrollTop = chatContainer.scrollHeight;
    } else {
      clearInterval(interval);
    }
  }, 10);
}

async function handleNewChat() {
  try {
    const { data } = await useFetch("/api/demo/create-thread", {
      method: "POST",
    });

    if (data.value.statusCode !== 200) {
      console.error("Error", data.value.message);
      return;
    }

    navigateTo(`/ai/chatbot-demo/${data.value.data.id}`);
  } catch (error) {
    console.error("error:", error);
  }
}

onMounted(() => {
  window.Prism = window.Prism || {};
  window.Prism.manual = true;
  Prism.highlightAll();

  const chatContainer = document.querySelector(".scrollbar");
  chatContainer.scrollTop = chatContainer.scrollHeight;
});

const chooseFile = () => {
  document.getElementById("attachment").click();
};

// watch(fileAttachment, (newValue) => {
//   // console.log("fileAttachment:", newValue);
// });

const handleFileChange = (event) => {
  // console.log(event.target.files[0]);
  fileAttachment.value = event.target.files[0];
};
</script>

<template>
  <div>
    <div
      class="fixed py-10 w-full z-10"
      style="
        background: linear-gradient(
          0deg,
          rgba(124, 233, 255, 0) 0%,
          rgba(0, 0, 0, 0.6657256652661064) 100%
        );
      "
    ></div>
    <div class="bg-[#2b2a28] h-screen tracking-tight">
      <div class="flex flex-col md:flex-row gap-2 h-screen p-3">
        <div
          class="history-panel rounded-md overflow-hidden transition-all duration-400 ease-in-out flex flex-col h-full justify-between !bg-[#18181b] md:w-72"
          :class="{ 'w-full': historyWidth === '0px' }"
          :style="{ width: historyWidth }"
          style="z-index: 50"
        >
          <div>
            <div class="flex justify-between text-white p-3 gap-3">
              <div class="flex gap-3 items-center ml-3 mt-3">
                <Icon
                  name="mdi:atom-variant"
                  class="text-[#c9dbbb] animate-spin"
                ></Icon>
                <span class="my-auto" style="font-family: 'PP Editorial New'"
                  >CorradAI</span
                >
              </div>
            </div>
            <div v-if="!openedProject" class="p-3 text-white flex flex-col">
              <div
                v-if="historyList.length > 0"
                v-for="(data, index) in historyList"
                :key="index"
                class="flex-grow rounded-md gap-2 hover:bg-[#3d3d3d] cursor-pointer px-3 p-1.5 text-[#F6F3EB] flex justify-between"
              >
                <p class="text-[12px] truncate">{{ data.title }}</p>
                <span
                  ><Icon name="material-symbols:arrow-right" size="15"></Icon
                ></span>
              </div>
              <div v-else class="flex">No History</div>
            </div>
          </div>
          <div>
            <div class="px-5 py-2 pb-5">
              <div
                class="flex p-2 justify-center gap-2 w-full border-2 rounded-md !border-[#C8DABB] text-[#C8DABB] hover:bg-[#C8DABB] hover:text-[#557841] cursor-pointer font-semibold"
                @click="(newProject = true), (history = false)"
              >
                <Icon
                  name="material-symbols:add"
                  class="my-auto"
                  size="18"
                ></Icon>
                <span class="text-[14px]">Create New</span>
              </div>
            </div>
            <div
              class="text-white p-3 m-2 flex justify-around"
              ref="profile"
              :style="{ display: showProfile ? 'flex' : 'none' }"
            >
              <img
                class="max-w-[50px] rounded-full"
                src="@/assets/img/logo/zah.png"
                alt=""
              />
              <img
                class="max-w-[50px] rounded-full"
                src="@/assets/img/logo/afi.png"
                alt=""
              />
              <img
                class="max-w-[50px] rounded-full"
                src="@/assets/img/logo/jul.png"
                alt=""
              />
            </div>
            <div
              class="px-5 py-2"
              ref="box1"
              @mouseenter="showProfile = true"
              @mouseleave="showProfile = false"
            >
              <div
                class="bg-[#172113] border-[1px] border-[#36482c] rounded-md p-3 flex gap-2 text-[#f4f4f5]"
              >
                <span class="rounded-full bg-[#6a9151]">
                  <Icon
                    name="material-symbols:arrow-upward-alt-rounded"
                    class="text-white my-auto"
                  ></Icon>
                </span>
                <p class="my-auto">Placeholder</p>
              </div>
            </div>
            <div class="px-5 py-2 pb-5">
              <rs-button class="w-full !bg-[#557841]" @click="navigateTo(`/`)"
                >Back To Mawar</rs-button
              >
            </div>
          </div>
        </div>
        <div class="flex-grow p-2 text-white">
          <div class="flex justify-between mt-3">
            <div
              v-if="!history"
              @click="(history = true), (code = false)"
              class="flex rounded-md p-2 px-3 gap-1 cursor-pointer bg-[#242323] hover:bg-[#3d3d3d] z-50 border-[1px] border-[#2a2a27]"
            >
              <Icon
                name="material-symbols:keyboard-double-arrow-right-rounded"
                size="15"
              ></Icon>
            </div>
            <div
              v-else
              @click="(history = false), (code = false)"
              class="rounded-md p-2 px-3 flex gap-1 cursor-pointer bg-[#242323] hover:bg-[#3d3d3d] z-50 border-[1px] border-[#2a2a27]"
            >
              <Icon
                name="material-symbols:keyboard-double-arrow-left-rounded"
                size="15"
              ></Icon>
            </div>
            <div class="z-50" v-if="!openedProject">
              <div
                class="rounded-md p-2 px-3 flex gap-1 cursor-pointer bg-[#242323] hover:bg-[#3d3d3d] border-[1px] border-[#2a2a27]"
                @click="handleNewChat"
              >
                <Icon
                  name="material-symbols:add"
                  class="my-auto"
                  size="15"
                ></Icon>
                <span class="text-[12px]">New Chat</span>
              </div>
            </div>
          </div>
          <div
            v-if="!openedProject"
            class="flex flex-col h-full items-center"
            style="max-height: 90vh"
          >
            <NuxtScrollbar
              class="scrollbar flex-grow w-full mb-3"
              style="height: 100%"
            >
              <div v-if="newText && !waitingResponse" class="top">
                <div class="gap-3 py-20 text-center leading-15">
                  <p class="welcome-text text-[60px] drop-shadow-md">
                    Welcome to
                    <span> Corrad<span class="text-[#c9dbbb]">AI </span> </span>
                  </p>
                  <span class="my-auto text-[16px] leading-6">
                    <p>Need help or just getting started?</p>
                    <i class="text-[14px]"
                      >Type your question in the textbox—I'm here to assist!</i
                    >
                  </span>
                </div>
              </div>
              <div v-else class="mx-auto" style="">
                <div class="flex flex-col gap-5 !text-[#f5f4ee] tracking-tight">
                  <div
                    v-for="(data, index) in onGoingChat"
                    :key="index"
                    class="ongoingchatbody"
                  >
                    <div
                      class="flex gap-2"
                      :class="data.type === 'user' ? 'justify-end' : ''"
                    >
                      <div
                        v-if="data.type === 'user'"
                        class="rounded-lg p-2 px-5 ai-chat bg-[#4b4a4a] text-[13px] relative"
                      >
                        <div v-if="fileAttachment" class="text-[#a6a39a]">
                          <rs-badge>
                            <Icon
                              name="ph:file-light"
                              class="mr-1 !w-4 !h-4"
                            ></Icon>
                            {{ fileAttachment.name }}
                          </rs-badge>
                        </div>
                        <div v-html="data.chat"></div>
                      </div>
                      <div
                        v-if="
                          data.type === 'assistant' &&
                          data.contentType === 'text'
                        "
                        class="flex gap-2 leading-6 text-[13px]"
                      >
                        <img
                          class="max-w-[30px] max-h-[30px] rounded-full my-0"
                          src="@/assets/img/logo/zah.png"
                          alt=""
                        />
                        <div>
                          <div
                            v-html="data.chat"
                            class="airesponse flex flex-col gap-2 max-w-[80vh]"
                          ></div>
                          <p class="mt-2 flex gap-1">
                            <Icon
                              name="material-symbols:content-copy-outline-sharp"
                              size="25"
                              class="p-1 cursor-pointer hover:bg-[#494848] rounded-md"
                              @click="copyToClipboard(data.chat, index)"
                            ></Icon>
                            <Icon
                              name="material-symbols-light:directory-sync-rounded"
                              size="25"
                              class="p-1 cursor-pointer hover:bg-[#494848] rounded-md"
                            ></Icon>
                            <transition name="fade-slide">
                              <span
                                v-if="copiedIndex === index"
                                class="copied-message"
                                >Text copied!</span
                              >
                            </transition>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtScrollbar>
            <div class="flex justify-center">
              <div class="max-w-[70vw] min-w-[100px]" style="width: 500px">
                <div class="flex justify-between">
                  <span v-if="waitingResponse" class="animate-pulse"
                    >Waiting response...</span
                  >
                  <span v-else></span>
                </div>
                <div v-if="fileAttachment" class="text-[#a6a39a]">
                  <rs-badge>
                    <Icon name="ph:file-light" class="mr-1 !w-4 !h-4"></Icon>
                    {{ fileAttachment.name }}
                    <Icon
                      @click="fileAttachment = null"
                      name="ph:x-light"
                      class="ml-1 !w-4 !h-4 hover:bg-[#858f7d] rounded-full cursor-pointer"
                    ></Icon>
                  </rs-badge>
                </div>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <FormKit
                    type="form"
                    :actions="false"
                    @submit="handleChat('user', 'text', currentChat)"
                  >
                    <div
                      class="cursor-pointer absolute inset-y-0 left-0 flex items-center px-3 hover:bg-[#4b4a4a] rounded-full"
                      @click="chooseFile"
                    >
                      <Icon name="material-symbols-light:attach-file"></Icon>
                      <FormKit
                        @change="handleFileChange"
                        id="attachment"
                        type="file"
                        :classes="{
                          outer: 'hidden',
                        }"
                      ></FormKit>
                    </div>
                    <input
                      type="text"
                      class="block w-full rounded-full py-3 pl-10 pr-20 bg-[#393937] text-[#a6a39a] sm:text-sm sm:leading-6 outline-none focus:border-[1px] focus:border-[#557841]"
                      v-model="currentChat"
                    />
                    <button
                      class="absolute inset-y-0 right-2 flex items-center"
                      :disabled="!currentChat || waitingResponse"
                    >
                      <span
                        class="rounded-full p-1"
                        :class="
                          !currentChat || waitingResponse ? '' : 'bg-[#6a9151]'
                        "
                      >
                        <Icon
                          name="material-symbols:arrow-upward-alt-rounded"
                          class="text-white my-auto"
                        ></Icon>
                      </span>
                    </button>
                  </FormKit>
                </div>
                <span
                  class="text-[10px] flex justify-center mt-5"
                  style="font-family: 'PP Editorial New'"
                >
                  "While Rome wasn't built in a day, corradAI arose in an
                  instant."
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.cdnfonts.com/css/pp-neue-montreal");
@import url("https://db.onlinewebfonts.com/c/926fcaaa8b66e0df67e176f329259711?family=PP+Editorial+New");
@import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap");

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

.ai-chat {
  text-align: left; /* Ensure text starts from the left */
}

.history-panel {
  width: 100%;
  max-width: 300px;
  min-width: 0;
}

@media screen and (max-width: 600px) {
  .history-panel {
    position: fixed;
    margin: 0 !important;
  }

  .textt {
    padding: 0px !important;
    margin-top: 10px;
  }
}

body {
  font-family: "PP Neue Montreal", sans-serif !important;
}

.welcome-text {
  font-size: "70";
  font-family: "PP Editorial New";
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 80;
}

.copied-message {
  font-size: 10px;
  color: white;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease-out;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

pre {
  background-color: #0d1109;
  border: 1px solid #2a2a27;
  color: #999999;
  border-radius: 5px;
  padding: 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: auto;
  border-radius: 16px;
  padding: 24px;
}

pre code {
  font-family: "Fira Code", monospace !important;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom: 0.5rem !important;
}

h1,
h2 {
  margin-top: 0.75rem !important;
}

ul {
  list-style-type: disc !important;
  margin-left: 24px;
}

ol {
  list-style-type: decimal !important;
  margin-left: 24px;
}

.container-copy {
  border: 2px solid red;
}

.copy-button {
  background-color: white !important;
  padding: 10px 10px 5px 5px;
  color: black;
  cursor: pointer;
  border-radius: 10%;
}

.scrollbar {
  padding: 0 10% 0 10%;
}

@media screen and (max-width: 500px) {
  .scrollbar {
    padding: 0 10px 0 10px;
    margin-top: 10px;
  }

  .ongoingchatbody {
    /* background-color: yellow; */
    max-width: 100vw;
  }

  .airesponse {
    /* background-color: white; */
    width: 300px;
  }
}
</style>
