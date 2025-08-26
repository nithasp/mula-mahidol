<template>
   <main class="relative h-screen bg-[url('~/assets/images/login/mula-login-bg.jpg')] bg-cover bg-center">
      <div class="lang absolute top-4 right-4 flex gap-1">
         <ToggleLanguage />
      </div>
      <div class="h-full flex items-center justify-items-center px-4 text-[#333333]">
         <div class="rounded-[22px] bg-white m-auto px-[51px] py-6 max-w-[579px] w-full text-center">
            <div v-if="loginStep === 1">
               <img :src="MulaLogo" alt="mula-logo" class="mx-auto" />
               <div>
                  <h1 class="font-kanit-semibold text-[26px] mt-8 mb-6">{{ $t("login_title") }}</h1>
                  <p class="font-kanit-medium text-xl mb-8">{{ $t("login_desc") }}</p>
                  <div class="grid grid-cols-[1fr_65px_1fr]">
                     <div @click="handlePersonnelLogin">
                        <h2 class="font-kanit-medium text-xl">{{ $t("personnel") }}</h2>
                        <UButton size="xl" variant="solid" :label="$t('login_text')" block
                           class="rounded-lg mt-2 font-kanit-semibold" type="submit" />
                     </div>
                     <div class="relative">
                        <div
                           class="text-[#BEBEBE] text-xs bg-white absolute -translate-x-2/4 -translate-y-2/4 p-1 left-2/4 top-2/4">
                           {{ $t("or") }}</div>
                        <div class="line h-full w-[1px] bg-[#BEBEBE] mx-auto"></div>
                     </div>
                     <div @click="handleStudentLogin">
                        <h2 class="font-kanit-medium text-xl">{{ $t("student") }}</h2>
                        <UButton size="xl" variant="solid" :label="$t('student_schedule')" block
                           class="rounded-lg mt-2 font-kanit-semibold" type="submit" />
                     </div>
                  </div>
                  <div class="version text-center text-sm text-[#58585C] mt-4">{{ deployment.version }}</div>
               </div>
            </div>
            <div v-if="loginStep === 2" class="h-[450px] flex items-center justify-center">
               <div>
                  <img :src="IconLoading" alt="icon-loading" class="mx-auto"/>
                  <h1 class="font-kanit-medium text-xl mt-8 mb-4">กำลังเข้าสู่ระบบ</h1>
                  <h2 class="text-xl">Loading.....</h2>
               </div>
            </div>
         </div>
      </div>
   </main>

</template>

<script setup lang="ts">
import MulaLogo from "~/assets/images/login/mula-logo.png";
import IconLoading from "~/assets/images/loading_mula_forever.gif";
import deployment from "~/deployment.config.js";
import ToggleLanguage from "~/components/ui/toggleLanguage.vue";

definePageMeta({
   layout: false,
});

const { locale, t } = useI18n();
const loginStep = ref<number>(1)

const handlePersonnelLogin = () => {
   loginStep.value = 2
   setTimeout(() => {
      navigateTo("/teaching-schedule/manage-subjects")
   }, 1500)
}
const handleStudentLogin = () => {
   loginStep.value = 2
   setTimeout(() => {
      navigateTo("/teaching-schedule/manage-subjects")
   }, 1500)
}
</script>
