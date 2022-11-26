<template>
    <transition name="modal">
        <div v-if="isModalActive" class="modal">
            <div class="modal-title"><slot name="title" /></div>
            <p><slot name="message" /></p>
            <div class="like" :style="{ '--c': props.modalProps.color }">
                <i :class="props.modalProps.icon"></i>
            </div>
            <button @click="closeModal">Cerrar</button>
        </div>
    </transition>
</template>

<script setup>
    const emit = defineEmits(["closeModal"]);
    const props = defineProps({ isModalActive: Boolean, modalProps: Object });

    const closeModal = () => {
        emit("closeModal");
    };
</script>
