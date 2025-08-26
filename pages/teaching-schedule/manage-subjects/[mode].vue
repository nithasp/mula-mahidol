<template>
   <div id="teaching-schedule-form" class="bg-white">
      <div class="flex items-center gap-3 p-6">
         <img :src="BrowserVariant" />
         <h1 class="font-kanit-medium text-[20px] text-[#333333]">{{ $t("detail") }}</h1>
      </div>
      <UDivider class="mb-1" />
      <UForm :schema="shipAgentAddressSchema" :state="formGroup" @submit="onSubmit" v-on:error="handleFormError" class="p-6">
         <div class="border rounded-xl border-solid border-[#D0D5DD] p-8">
            <div class="grid grid-cols-2 gap-x-6 gap-y-4 mt-4">
               <div class="grid grid-cols-[110px_1fr] items-center gap-4">
                  <div>
                     <span>{{ $t("subject_name") }}</span>
                     <span class="text-red-400">*</span>
                     <span>:</span>
                  </div>
                  <Select :placeholder="$t('subject_name')" name="subjectName" :options="testOption" v-model="formGroup.subjectName" required class="w-full" />
               </div>
               <div class="grid grid-cols-[110px_1fr] items-center gap-4">
                  <div>
                     <span>{{ $t("credit_units") }}</span>
                     <span>:</span>
                  </div>
                  <Input :placeholder="$t('credit_units')" v-model="formGroup.creditUnits" class="w-full" disabled />
               </div>
               <div class="grid grid-cols-[110px_1fr] items-center gap-4">
                  <div>
                     <span>{{ $t("academic_year") }}</span>
                     <span>:</span>
                  </div>
                  <Input :placeholder="$t('academic_year')" v-model="formGroup.academicYear" class="w-full" disabled />
               </div>
               <div class="grid grid-cols-[110px_1fr] items-center gap-4">
                  <div>
                     <span>{{ $t("semester") }}</span>
                     <span>:</span>
                  </div>
                  <Select :placeholder="$t('semester')" name="semester" :options="testOption" v-model="formGroup.semester" required class="w-full" />
               </div>
               <div class="grid grid-cols-[110px_1fr] items-center gap-4">
                  <div>
                     <span>{{ $t("curriculum") }}</span>
                     <span>:</span>
                  </div>
                  <Input :placeholder="$t('curriculum')" v-model="formGroup.curriculum" class="w-full" disabled />
               </div>
               <div class="grid grid-cols-[110px_1fr] items-center gap-4">
                  <div>
                     <span>{{ $t("subject_group") }}</span>
                     <span>:</span>
                  </div>
                  <Select :placeholder="$t('subject_group')" name="subjectGroup" :options="testOption" v-model="formGroup.subjectGroup" required class="w-full" />
               </div>
               <div class="grid grid-cols-[110px_1fr] items-center gap-4">
                  <div>
                     <span>{{ $t("grade_level") }}</span>
                     <span class="text-red-400">*</span>
                     <span>:</span>
                  </div>
                  <Select :placeholder="$t('grade_level')" name="gradeLevel" :options="testOption" v-model="formGroup.gradeLevel" required class="w-full" />
               </div>
               <div class="grid grid-cols-[110px_1fr] items-center gap-4">
                  <div>
                     <span>{{ $t("class_group") }}</span>
                     <span>:</span>
                  </div>
                  <div class="grid grid-cols-[1fr_auto] gap-2">
                     <Select :placeholder="$t('class_group')" name="classGroup" :options="testOption" v-model="formGroup.classGroup" required class="w-full" />
                     <div class="flex items-center gap-2">
                        <Checkbox />
                        <span>ตามกลุ่มเรียน</span>
                     </div>
                  </div>
               </div>
               <div class="grid grid-cols-[110px_1fr] items-center gap-4">
                  <div>
                     <span>{{ $t("students_count") }}</span>
                     <span class="text-red-400">*</span>
                     <span>:</span>
                  </div>
                  <Input :placeholder="$t('students_count')" name="studentsCount" v-model="formGroup.studentsCount" class="w-full" type="number" />
               </div>
               <div class="grid grid-cols-[110px_1fr] items-center gap-4">
                  <div>
                     <span>{{ $t("classroom") }}</span>
                     <span class="text-red-400">*</span>
                     <span>:</span>
                  </div>
                  <Input :placeholder="$t('classroom')" name="classroom" v-model="formGroup.classroom" class="w-full" type="number" />
               </div>
               <div class="grid grid-cols-[110px_1fr] items-center gap-4">
                  <div>
                     <span>{{ $t("teacher_name") }}</span>
                     <span class="text-red-400">*</span>
                     <span>:</span>
                  </div>
                  <Input :placeholder="$t('teacher_name')" name="teacherName" v-model="formGroup.teacherName" class="w-full" />
               </div>
               <div class="grid grid-cols-[110px_1fr] items-center gap-4">
                  <div>
                     <span>{{ $t("weekly_hours") }}</span>
                     <span class="text-red-400">*</span>
                     <span>:</span>
                  </div>
                  <Input :placeholder="$t('weekly_hours')" name="weeklyHours" v-model="formGroup.weeklyHours" class="w-full" />
               </div>
               <div class="grid grid-cols-[110px_1fr] items-center gap-4 col-span-2">
                  <div>
                     <span>{{ $t("note") }}</span>
                     <span>:</span>
                  </div>
                  <Input :placeholder="$t('note')" name="note" v-model="formGroup.note" class="w-full" />
               </div>
            </div>
            <div class="text-right mt-4">
               <UButton
                  class="mx-2 border border-grayy-100 w-[67px] h-[36px] justify-center text-white"
                  size="md"
                  color="gray"
                  :label="$t('cancel')"
                  @click="
                     () => {
                        navigateTo(`/teaching-schedule/manage-subjects`);
                     }
                  "
               />
               <UButton class="border border-grayy-100 w-[67px] h-[36px] justify-center text-white" size="md" color="white" :label="$t('save')" type="submit" />
            </div>
         </div>
      </UForm>
   </div>
   <DialogConfirm
      :icon="dialogConfirmProps.icon"
      :title="dialogConfirmProps.title"
      :desc="dialogConfirmProps.desc"
      :colorConfirm="dialogConfirmProps.colorConfirm"
      :labelCancel="$t('cancel')"
      :labelConfirm="$t('confirm')"
      :isDialogOpen="isDialogConfirmOpen"
      :dialogCancel="dialogConfirmCancel"
      :dialogConfirm="dialogConfirmSubmit"
   />
   <DialogAlert
      :title="dialogAlertProps.title"
      :desc="dialogAlertProps.desc"
      :type="dialogAlertProps.type"
      :isOpen="isDialogAlertOpen"
      :setDialog="handleCloseDialogAlert"
      :btnName="$t('close')"
   />
   <Loading v-if="isLoading" />
</template>

<script setup lang="ts">
import Input from "~/components/form/u-input.vue";
import Checkbox from "~/components/form/checkbox.vue";
import Select from "~/components/form/u-select.vue";
import Loading from "~/components/loading.vue";
import DialogConfirm from "~/components/dialog/confirm.vue";
import DialogAlert from "~/components/dialog/alert.vue";
import BrowserVariant from "~/assets/icons/fi-rs-browser-variant.svg";

const route = useRoute();
const { t, locale } = useI18n();
import { z, ZodError } from "zod";
import type { FormSubmitEvent } from "#ui/types";

onMounted(() => {
   console.log(route.query.id);
});
const shipAgentAddressSchema = z.object({
   subjectName: z.number().min(1, t("required")),
   gradeLevel: z.number().min(1, t("required")),
   studentsCount: z.number().min(1, t("required")),
   classroom: z.number().min(1, t("required")),
   teacherName: z.string().min(1, t("required")),
   weeklyHours: z.string().min(1, t("required")),
});

const formGroup = ref<any>({
   subjectName: 0,
   creditUnits: "",
   academicYear: "",
   semester: "",
   curriculum: "",
   subjectGroup: "",
   gradeLevel: 0,
   classGroup: "",
   studentsCount: 0,
   classroom: 0,
   teacherName: "",
   weeklyHours: "",
   note: "",
});

const dialogConfirmProps = ref<any>({
   title: "",
   desc: "",
   icon: "warning",
});
const dialogAlertProps = ref<any>({
   title: "",
   desc: "",
   type: "",
});

const isLoading = ref<boolean>(false);
const testOption = ref([
   {
      id: 1,
      name: "test1",
   },
   {
      id: 2,
      name: "test2",
   },
]);

const handleFormError = (error: ZodError): void => {};
async function onSubmit(event: FormSubmitEvent<z.output<typeof shipAgentAddressSchema>>) {
   dialogConfirmProps.value = {
      title: "บันทึกข้อมูล",
      desc: "คุณต้องการที่จะบันทึกข้อมูลหรือไม่",
      icon: "warning",
   };
   isDialogConfirmOpen.value = true;
}

const isDialogSuccessOpen = ref<boolean>(false);
const handleCloseSuccessDialog = (status: boolean) => {
   isDialogSuccessOpen.value = status;
};

const isDialogConfirmOpen = ref<boolean>(false);
const dialogConfirmSubmit = async () => {
   isLoading.value = true;

   setTimeout(() => {
      dialogAlertProps.value = {
         title: "สำเร็จ",
         desc: "บันทึกข้อมูลสำเร็จแล้ว",
         type: "success",
      };
      isDialogAlertOpen.value = true;
      isDialogConfirmOpen.value = false;
      isLoading.value = false;
   }, 500);
};
const dialogConfirmCancel = () => {
   isDialogConfirmOpen.value = false;
};

const isDialogAlertOpen = ref<boolean>(false);
const handleCloseDialogAlert = (status: boolean) => {
   isDialogAlertOpen.value = status;
   if (dialogAlertProps.value.type === "success") {
      console.log("post success");
      //navigateTo("/settings");
   }
};
</script>
