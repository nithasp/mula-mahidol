<template>
   <div id="filter-search" class="bg-white py-4 px-6 rounded-xl mb-[14px]">
      <div class="flex justify-between gap-4">
         <div class="grid grid-cols-6 gap-3">
            <Select :label="$t('academic_year')" :placeholder="$t('academic_year')" :options="[allFilterObject]"
               v-model="filter.vesselFlagId" class="col-span-1" />
            <Select :label="$t('ภาคการศึกษา')" :placeholder="$t('ภาคการศึกษา')" :options="[allFilterObject]"
               v-model="filter.vesselTypeId" class="col-span-1" />
            <Select :label="$t('curriculum')" :placeholder="$t('curriculum')" :options="[allFilterObject]"
               v-model="filter.berthId" class="col-span-1" />
            <Select :label="$t('branch_or_field')" :placeholder="$t('branch_or_field')" :options="[]"
               v-model="filter.jettyId" class="col-span-1" />
            <Select :label="$t('grade_level')" :placeholder="$t('grade_level')" :options="[]" v-model="filter.jettyId"
               class="col-span-1" />
            <Input :label="$t('search')" :placeholder="$t('search')" v-model="filter.search"
               icon="i-heroicons-magnifying-glass-20-solid" class="col-span-1" @keyup="(e) => {
                  handleSearch(e.target.value);
               }
                  " />
            <Select :label="$t('teacher')" :placeholder="$t('teacher')" :options="[]" v-model="filter.jettyId"
               class="col-span-1" />
            <Select :label="$t('subject_group')" :placeholder="$t('subject_group')" :options="[]"
               v-model="filter.jettyId" class="col-auto-1" />
            <div class="content-end">
               <UButton @click="handleResetFilter" icon="i-heroicons-magnifying-glass"
                  class="col-auto mr-[9px] border border-solid border-[#AD841F]" />
               <UButton @click="handleResetFilter" icon="i-heroicons-arrow-path"
                  class="col-auto !bg-white [&_span]:!text-primaryy-500 border border-solid border-[#AD841F] hover:!bg-white" />
            </div>
         </div>
      </div>
   </div>
   <div class="bg-white overflow-hidden">
      <div class="flex items-center justify-between py-5 px-6 mb-1">
         <div class="flex justify-between">
            <div class="flex items-center">
               <span class="text-sm text-grayy-75 mr-3.5">{{ $t("show") }}</span>
               <Select :options="limitRowTable" v-model="filter.limit" />
            </div>
            <div class="flex items-center gap-1 font-kanit-medium rounded-full text-sm py-1 px-2 ml-2">
               <span>จาก</span>
               <span>{{ vesselImportList.length }}</span>
               <span>รายการ</span>
            </div>
         </div>
      </div>
      <UTable :rows="vesselImportList" :columns="[
         {
            key: 'id',
            label: t('id'),
            class: 'w-[60px] text-center',
         },
         {
            key: 'subject',
            label: t('subject'),
         },
         {
            key: 'credits',
            label: t('credits'),
         },
         {
            key: 'classGroup',
            label: t('class_group'),
            class: 'text-center',
         },
         {
            key: 'gradeLevel',
            label: t('grade_level'),
         },
         {
            key: 'day',
            label: t('day'),
         },
         {
            key: 'time',
            label: t('time'),
         },
         {
            key: 'studentsCount',
            label: t('students_count'),
         },
         {
            key: 'classroom',
            label: t('classroom'),
         },
         {
            key: 'teacher',
            label: t('teacher'),
         },
         {
            key: 'subjectGroup',
            label: t('subject_group'),
         },
         {
            key: 'schedule',
            label: t('note'),
         },
         {
            key: 'actions',
            label: t('action'),
            sortable: false,
            class: 'text-center'
         },
      ]">
         <template #id-data="{ index }">
            <div class="text-center">
               {{ getNumCountPagination(index, filter.page, filter.limit) }}
            </div>
         </template>

         <template #actions-data="{ row }">
            <div class="text-center">
               <UDropdown :items="getMenuTable(row)">
                  <NuxtIcon name="menu-dots-vertical" size="lg" color="text-[#374957]" />
               </UDropdown>
            </div>
         </template>
      </UTable>
      <div class="flex justify-center px-6 py-3">
         <UPagination :prev-button="{ icon: 'i-heroicons-chevron-left-solid', color: 'gray' }"
            :next-button="{ icon: 'i-heroicons-chevron-right-solid', trailing: true, color: 'gray' }"
            v-model="filter.page" :total="paginationData.totalItems" :page-count="filter.limit"
            @update:modelValue="onPageChange" />
      </div>
   </div>
   <Loading v-if="isLoading" />
</template>

<script setup lang="ts">
import Input from "~/components/form/u-input.vue";
import Select from "~/components/form/u-select.vue";
import Loading from "~/components/loading.vue";
import Badge from "~/components/badge/badge.vue";
import NuxtIcon from "~/components/ui/nuxtIcon.vue";
import EditIcon from "~/assets/icons/fi-rs-edit.svg";
import useVesselImportService from "~/core/services/vesselImport";
import type { IClassScheduleMockup, IFilterVesselImportList, IVesselImportList } from "~/core/interfaces/IFilterVesselImport";
import type { IFilterAllStatus } from "~/core/interfaces/IFilterAllStatus";

const vesselImportService = useVesselImportService();
const { t, locale } = useI18n();
const isLoading = ref<boolean>(false);
const filter = ref<IFilterVesselImportList>({
   limit: 10,
   page: 1,
   search: "",
   created: "",
   mooringDate: "",
   unmooringDate: "",
   vesselFlagId: 0,
   vesselTypeId: 0,
   berthId: 0,
   jettyId: 0,
});
const allFilterObject = ref<IFilterAllStatus>({ id: "", name: `${locale.value === "en" ? "All" : "ทั้งหมด"}` });
const paginationData = ref({
   totalItems: 0,
   totalPages: 0,
});
const limitRowTable = ref([
   {
      id: 10,
      name: 10,
   },
   {
      id: 20,
      name: 20,
   },
   {
      id: 50,
      name: 50,
   },
   {
      id: 100,
      name: 100,
   },
]);

const handleResetFilter = () => {
   filter.value.limit = 10;
   filter.value.page = 1;
   filter.value.search = "";
   filter.value.created = "";
   filter.value.mooringDate = "";
   filter.value.unmooringDate = "";
   filter.value.vesselFlagId = 0;
   filter.value.vesselTypeId = 0;
   filter.value.berthId = 0;
   filter.value.jettyId = 0;
};

const vesselImportId = ref<number>(0);
const vesselImportList = ref<IClassScheduleMockup[]>([]);
const vesselMockupData = ref({
   data: [
      {
         id: 945,
         subject: "Biology",
         credits: 2,
         classGroup: "A",
         gradeLevel: "Grade 2",
         day: "Wednesday",
         time: "12:30",
         studentsCount: 41,
         classroom: "Room 175",
         teacher: "Mrs. Davis",
         subjectGroup: "Foundation",
         schedule: "Morning",
         actions: "View Details",
      },
      {
         id: 827,
         subject: "Science",
         credits: 5,
         classGroup: "C",
         gradeLevel: "Grade 5",
         day: "Thursday",
         time: "9:00",
         studentsCount: 32,
         classroom: "Room 285",
         teacher: "Dr. Brown",
         subjectGroup: "Elective",
         schedule: "Morning",
         actions: "View Details",
      },
      {
         id: 57,
         subject: "History",
         credits: 5,
         classGroup: "E",
         gradeLevel: "Grade 4",
         day: "Monday",
         time: "15:30",
         studentsCount: 25,
         classroom: "Room 172",
         teacher: "Prof. Lee",
         subjectGroup: "Elective",
         schedule: "Morning",
         actions: "View Details",
      },
      {
         id: 777,
         subject: "Science",
         credits: 4,
         classGroup: "A",
         gradeLevel: "Grade 1",
         day: "Tuesday",
         time: "14:30",
         studentsCount: 27,
         classroom: "Room 303",
         teacher: "Mr. Smith",
         subjectGroup: "Core",
         schedule: "Afternoon",
         actions: "View Details",
      },
      {
         id: 360,
         subject: "History",
         credits: 4,
         classGroup: "A",
         gradeLevel: "Grade 1",
         day: "Tuesday",
         time: "13:00",
         studentsCount: 19,
         classroom: "Room 304",
         teacher: "Mrs. Davis",
         subjectGroup: "Foundation",
         schedule: "Morning",
         actions: "View Details",
      },
      {
         id: 945,
         subject: "Biology",
         credits: 2,
         classGroup: "A",
         gradeLevel: "Grade 2",
         day: "Wednesday",
         time: "12:30",
         studentsCount: 41,
         classroom: "Room 175",
         teacher: "Mrs. Davis",
         subjectGroup: "Foundation",
         schedule: "Morning",
         actions: "View Details",
      },
      {
         id: 827,
         subject: "Science",
         credits: 5,
         classGroup: "C",
         gradeLevel: "Grade 5",
         day: "Thursday",
         time: "9:00",
         studentsCount: 32,
         classroom: "Room 285",
         teacher: "Dr. Brown",
         subjectGroup: "Elective",
         schedule: "Morning",
         actions: "View Details",
      },
      {
         id: 57,
         subject: "History",
         credits: 5,
         classGroup: "E",
         gradeLevel: "Grade 4",
         day: "Monday",
         time: "15:30",
         studentsCount: 25,
         classroom: "Room 172",
         teacher: "Prof. Lee",
         subjectGroup: "Elective",
         schedule: "Morning",
         actions: "View Details",
      },
      {
         id: 777,
         subject: "Science",
         credits: 4,
         classGroup: "A",
         gradeLevel: "Grade 1",
         day: "Tuesday",
         time: "14:30",
         studentsCount: 27,
         classroom: "Room 303",
         teacher: "Mr. Smith",
         subjectGroup: "Core",
         schedule: "Afternoon",
         actions: "View Details",
      },
      {
         id: 360,
         subject: "History",
         credits: 4,
         classGroup: "A",
         gradeLevel: "Grade 1",
         day: "Tuesday",
         time: "13:00",
         studentsCount: 19,
         classroom: "Room 304",
         teacher: "Mrs. Davis",
         subjectGroup: "Foundation",
         schedule: "Morning",
         actions: "View Details",
      },

   ],
   totalItems: 100,
   totalPages: 10
})

onMounted(() => {
   getVesselMockupList();
});

watch(
   () => ({
      limit: filter.value.limit,
      created: filter.value.created,
      mooringDate: filter.value.mooringDate,
      unmooringDate: filter.value.unmooringDate,
      vesselFlagId: filter.value.vesselFlagId,
      vesselTypeId: filter.value.vesselTypeId,
      berthId: filter.value.berthId,
      jettyId: filter.value.jettyId,
   }),
   (newValue) => {
      filter.value.page = 1;
      getVesselImportList();
   }
);

const getVesselMockupList = async () => {
   vesselImportList.value = vesselMockupData.value.data;
   paginationData.value.totalItems = vesselMockupData.value.totalItems;
   paginationData.value.totalPages = vesselMockupData.value.totalPages;
};

const getVesselImportList = async () => {
   isLoading.value = true;
   try {
      const res = await vesselImportService.getVesselImportList(filter.value);
      if (res.statusCode === 200) {
         vesselImportList.value = res.data.data;
         paginationData.value.totalItems = res.data.totalItems;
         paginationData.value.totalPages = res.data.totalPages;
      } else {
         console.error(`Error: Received status code ${res.statusCode}`);
      }
   } catch (error) {
      console.error("An error occurred while fetching the vessel import list:", error);
   } finally {
      isLoading.value = false;
   }
};

const handleSearch = debounce(() => {
   filter.value.page = 1;
   getVesselImportList();
}, 500);

const onPageChange = (newPage: number) => {
   filter.value.page = newPage;
   getVesselImportList();
};

const getMenuTable = (row: IVesselImportList) => {
   const items = [
      [
         {
            label: t("edit"),
            avatar: {
               src: EditIcon,
            },
            click: () => {
               navigateTo(`/teaching-schedule/manage-subjects/edit?id=${row.id}`);
            },
         },
      ],
   ];
   return items;
};
</script>
