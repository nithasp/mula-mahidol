<template>
    <UBadge v-if="type === 'success'" class="rounded-full bg-[#C3E5D7] text-[#0E9860]" :label="label" />
    <UBadge v-if="type === 'warning'" class="rounded-full bg-[#F9DBCB] text-[#E76E31]" :label="label" />
    <UBadge v-if="type === 'error'" class="rounded-full bg-[#FBD0CD] text-[#F04438]" :label="label" />
    <UBadge v-if="type === 'cancel'" class="rounded-full bg-[#D0D5DD] text-[#344054]" :label="label" />
    <UBadge v-if="type === 'primary'" class="rounded-full" :label="label" />
    <UBadge v-if="type === 'orange'" class="rounded-full bg-[#F9DBCB] text-[#E76E31]" :label="label" />
    <UBadge v-if="type === 'red'" class="rounded-full bg-[#FBD0CD] text-[#F04438]" :label="label" />
    <UBadge v-if="type === 'blue'" class="rounded-full bg-[#C9D1FF] text-[#561EF3]" :label="label" />
    <UBadge v-if="type === 'purple'" class="rounded-full bg-[#E3D4F6] text-[#704A9E]" :label="label" />
    <UBadge v-if="type === 'green'" class="rounded-full bg-[#C3E5D7] text-[#0E9860]" :label="label" />
    <UBadge v-if="type === 'white-gray'" class="rounded-full bg-[#F2F4F7] text-[#344054]" :label="label" />
    <UBadge v-if="type === 'gray'" class="rounded-full bg-[#D0D5DD] text-[#344054]" :label="label" />
    <UBadge v-if="type === 'none'" class="rounded-full bg-transparent text-[#344054]" :label="label" />
</template>
<script setup>
defineProps({
    type: String,
    label: String,
});
</script>
