<script setup lang="ts">

const props: any = defineProps({
    isOpen: {
        type: Boolean,
    }
});

const emits = defineEmits(["close"])

</script>

<template>
    <div class="burger__wrapper" v-if="props.isOpen">
        <div class="burger__header">
            <h2>Меню</h2>
            <button @click="() => { emits('close') }">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                    fill="#e3e3e3">
                    <path
                        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
            </button>
        </div>
        <div class="burger__content">
            <RouterLink to="/about">О нас</RouterLink>
            <RouterLink to="/about">О нас</RouterLink>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.burger__wrapper {
    position: fixed;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);

    .burger__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
    }

    button {
        background-color: transparent;
        border: none;
        overflow: none;
        width: 24px;
        height: 24px;
        padding: 0;
    }

}
</style>