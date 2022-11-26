<template>
    <div class="page-wrapper" :class="{ isDark: isModalActive }" @click="changeIsModalActive"></div>
    <div class="container" :class="{ isBlur: isModalActive }">
        <div class="icon-wrapper">
            <i class="bx bx-fingerprint"></i>
        </div>
        <h1 class="title">PassWord Generator</h1>
        <GenPass @isModalActive="changeIsModalActive" />
    </div>
    <Modal
        @closeModal="changeIsModalActive"
        :isModalActive="isModalActive"
        :modalProps="modalProps"
    >
        <template #title>{{ modalProps.title }}</template>
        <template #message>{{ modalProps.message }}</template>
    </Modal>
</template>

<script setup>
    import { ref } from "vue";

    import GenPass from "./components/GenPass.vue";
    import Modal from "./components/Modal.vue";

    const isModalActive = ref(false);
    const modalProps = ref({});

    const changeIsModalActive = (props) => {
        modalProps.value = props;
        isModalActive.value = !isModalActive.value;
    };
</script>
<style lang="scss">
    @import "./css/app.scss";
</style>
