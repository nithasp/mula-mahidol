<template>
   <div id="edu-mula-dashboard-layout" class="h-screen pt-6">
      <div v-if="!isLoading"
         :class="[fullSidebar ? '!grid-cols-[250px_1fr]' : '!grid-cols-[66px_1fr]', 'grid grid-cols-[66px_1fr] gap-8 transition-all duration-200 h-full pr-6 sm:grid-cols-[250px_1fr]']">
         <Sidebar :fullSidebar="fullSidebar" :setNavbar="setNavbar" @title-updated="handleTitleUpdated"/>
         <main class="h-full overflow-hidden flex flex-col">
            <div class="flex items-center justify-between">
               <h1>{{ titleSidebar}}</h1>
               <ToggleLanguage />
            </div>
            <div class="h-full overflow-auto px-2.5 py-[35px] rounded-[40px] bg-[#f5f4f4] mt-[30px]">
               <slot />
            </div>
         </main>
      </div>
      <Loading v-if="isLoading" />
   </div>
</template>
<script setup>
import Sidebar from "../components/sidebar";
import Loading from "~/components/loading";
import ToggleLanguage from "~/components/ui/toggleLanguage.vue";

const fullSidebar = ref(true);
const titleSidebar = ref('')

const setNavbar = (status) => {
   fullSidebar.value = status;
};

const isLoading = ref(false);
onMounted(() => {
   window.addEventListener("resize", onResize);
   //getProfileInfo();
});


let smWidth = false;
const onResize = () => {
   if (window.innerWidth < 640) {
      if (!smWidth) {
         fullSidebar.value = false;
      }
      smWidth = true;
   } else {
      smWidth = false;
   }
};

const handleTitleUpdated = (value) => {
   titleSidebar.value = value
};
</script>
