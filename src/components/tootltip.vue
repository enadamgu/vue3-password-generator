<template>
    <transition name="tooltip">
        <div v-if="isTooltipActive" class="tooltip"><slot /></div>
    </transition>
</template>
<script setup>
    const props = defineProps({
        isTooltipActive: { type: Boolean },
    });
</script>
