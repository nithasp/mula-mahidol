<template>
   <aside class="relative h-full flex flex-col justify-between rounded-[20px]">
      <div :class="[fullSidebar ? '' : 'p-2 pt-4', 'h-full overflow-x-hidden overflow-y-auto']">
         <div :class="[
            !fullSidebar ? '!p-0 !justify-center' : '',
            'border-b border-solid border-b-[#EAECF0] flex items-center justify-between pl-2 pr-3 pt-0 pb-2 mb-2',
         ]">
            <img :src="fullSidebar ? LogoSidebar : LogoMini" alt="PMIS Logo"
               :class="[!fullSidebar ? '!w-[30px] !h-[30px]' : '', '']" />
         </div>
         <div id="sidebar-items" class="bg-[#1D4F91] h-full px-2 py-6 rounded-[0px_40px_0px_0px]">
            <div id="main-menu" v-for="(menu, indexMenu) in menus" :key="`menu-${indexMenu}`"
               :class="[!fullSidebar ? 'flex mb-3' : '', 'select-none']">
               <div id="title"
                  class="w-full cursor-pointer rounded-md transition-colors hover:!bg-[#017DEB] flex justify-between items-center"
                  @click="openItem === menu.key ? (openItem = '') : (openItem = menu.key), !fullSidebar ? setNavbar(!fullSidebar) : '', menu.subMenu === false ? handleTitle(locale === 'th' ? menu.textTh : menu.textEn) : ''">
                  <NuxtLink :to="menu.path" :class="[
                     menu.subMenus.length === 0 && route.name === menu.key ? 'bg-[#13417F]' : '',
                     'text-white w-full rounded-md flex content-center justify-center',
                  ]">
                     <UTooltip v-if="!fullSidebar" :text="menu.text"
                        :popper="{ placement: 'right', arrow: true, offsetDistance: 20 }" :ui="{
                           ring: 'ring-gray-50',
                           shadow: 'shadow-none',
                           base: 'py-[6px] h-auto text-sm text-primary-500',
                           rounded: 'rounded-md',
                           arrow: {
                              base: 'before:w-4 before:h-4',
                              background: 'before:bg-white',
                              ring: 'ring-0 before:ring-[#eaeaea]',
                              shadow: 'before:shadow-none',
                           },
                        }" class="px-3 py-2">
                        <NuxtIcon :name="menu.icon" size="xl" class="text-white" />
                     </UTooltip>
                     <div v-else :class="[
                        menu.subMenus.length === 0 && route.name === menu.key ? 'bg-[#E3D4F6]' : '',
                        'flex items-center gap-3 transition-colors w-full px-3 py-2 rounded-md',
                     ]">
                        <NuxtIcon :name="menu.icon" size="2xl" color="text-white" />
                        <p class="text-sm text-white text-nowrap relative top-[2px]">
                           {{ locale === "th" ? menu.textTh : menu.textEn }}
                        </p>
                     </div>
                  </NuxtLink>
                  <img v-if="menu.subMenus.length && fullSidebar" :src="ArrowIcon" alt="Arrow Icon"
                     :class="[openItem === menu.key ? '!rotate-0' : '', 'me-3 rotate-[-180deg] transition-transform']" />
               </div>
               <div v-if="menu.subMenus && menu.subMenus.length && fullSidebar"
                  :class="[openItem === menu.key ? 'opacity-1' : 'opacity-0 h-0', '[transition:opacity_0.3s,height_0.3s] relative overflow-hidden']"
                  :style="`height: ${openItem === menu.key ? 45 * menu.subMenus.length + 10 : '0'}px;`" :id="menu.key">
                  <div id="sub-menu" v-for="(subMenu, index) in menu.subMenus" :key="`sub-menu-${index}`"
                     class="my-1 h-10">
                     <NuxtLink :to="subMenu.path" class="text-white"
                        @click="subMenu.path != '' ? (pathname = subMenu.path) : null, handleTitle(locale === 'th' ? subMenu.textTh : subMenu.textEn)">
                        <div :class="[
                           getRouteActiveSubmenu(subMenu.id) ? 'bg-[#13417F]' : '',
                           'flex items-center cursor-pointer transition-colors rounded-md hover:bg-[#13417F] h-10 w-full ps-11 pr-3 py-2',
                        ]">
                           <img v-if="subMenu.icon" :src="subMenu.icon" :alt="subMenu.text" class="me-2 w-4" />
                           <p class="text-sm text-white">
                              {{ locale === "th" ? subMenu.textTh : subMenu.textEn }}
                           </p>
                        </div>
                     </NuxtLink>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <UButton icon="i-heroicons-chevron-double-left" size="lg" color="primary" :class="[
         !fullSidebar ? 'rotate-180 !bottom-[50px]' : '',
         'flex justify-center bg-[#6F4A9E] w-[38px] h-[38px] absolute bottom-[50px] right-[-14px] transition-all duration-300',
      ]" square variant="solid" :ui="{ rounded: 'rounded-full' }" @click="setNavbar(!fullSidebar)" />
   </aside>
   <DialogConfirm title="ออกจากระบบ" desc="คุณต้องการออกจากระบบใช่หรือไม่" icon="warning" labelConfirm="ออกจากระบบ"
      :isDialogOpen="isLogoutDialogOpen" :dialogCancel="dialogCancel" :dialogConfirm="dialogConfirm" />
</template>
<script setup>
import ArrowIcon from "~/assets/icons/arrow-down.png";
import LogoMini from "~/assets/images/logo-mini.png";
import LogoSidebar from "~/assets/images/logo-sidebar.png";
import DialogConfirm from "~/components/dialog/confirm.vue";
import NuxtIcon from "./ui/nuxtIcon.vue";

defineProps({
   fullSidebar: Boolean,
   setNavbar: Function,
});

const { t, locale } = useI18n();
const route = useRoute();
const pathname = ref("");
const openItem = ref("");
const emit = defineEmits(['custom-event']);

onMounted(async () => {
   handleTitle()
   pathname.value = window.location.pathname;
   const routeName = route.name.split("-")[0];
   if (routeName === "index") {
      openItem.value = "dashboard";
   } else {
      openItem.value = route.name.split("-")[0];
   }
});

const menus = ref([
   {
      topic: "",
      key: "main",
      textTh: "ตารางสอนอาจารย์",
      textEn: "Teacher Schedule",
      icon: "home",
      path: "",
      id: [""],
      subMenu: true,
      subMenus: [
         {
            icon: "",
            textTh: "จัดการรายวิชา",
            textEn: "Manage Subjects",
            path: "/teaching-schedule/manage-subjects",
            id: ["teaching-schedule-manage-subjects"],
         },
         {
            icon: "",
            textTh: "ตารางสอน",
            textEn: "Schedule",
            path: "/teaching-schedule/schedule",
            id: ["teaching-schedule-schedule"],
         },
      ],
   },
   {
      topic: "",
      key: "main",
      textTh: "ประเมินผลการศึกษา",
      textEn: "Evaluation",
      icon: "bank",
      path: "/evaluation-educational",
      id: ["evaluation-of-educational-outcomes"],
      subMenu: false,
      subMenus: [],
   }
]);

const getRouteActiveSubmenu = (subMenuId) => {
   let active = false;
   const found = subMenuId.find((val) => val === route.name);
   if (found) {
      active = true;
   }
   return active;
};

const isLogoutDialogOpen = ref(false);
const setLogoutDialog = (status) => {
   isLogoutDialogOpen.value = status;
};
const dialogCancel = () => {
   setLogoutDialog(false);
};
const dialogConfirm = () => {
   localStorage.removeItem("access_token");
   localStorage.removeItem("refresh_token");
   navigateTo("/login");
   setLogoutDialog(false);
};
const handleTitle = (item) => {
   if (!item) {
      if (menus.value[0].subMenu === true) {
         emit('title-updated', locale === "th" ? menus.value[0].subMenus[0].textTh : menus.value[0].subMenus[0].textTh);
      }
      else {
         emit('title-updated', locale === "th" ? menus.value[0].textTh : menus.value[0].textTh);
      }
   }
   else {
      emit('title-updated', item);
   }
};
</script>
