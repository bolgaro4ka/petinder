<script setup lang="ts">
import { ref } from 'vue';
import BurgerMenu from './BurgerMenu.vue';

const isBurgerOpen = ref<boolean>(false)

</script>

<template>
    <header>
        <div class="header__content">

            <RouterLink to="/">
                <h1>
                    Petinder
                </h1>
            </RouterLink>
            <button @click="isBurgerOpen = !isBurgerOpen" aria-label="Petinder menu">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                    fill="#e3e3e3">
                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                </svg>
            </button>
        </div>
        <BurgerMenu :is-open="isBurgerOpen" @close="isBurgerOpen = !isBurgerOpen" />
    </header>
</template>

<style lang="scss" scoped>
.header__content {
    display: flex;
    justify-content: space-between;
    background-color: var(--surface-color);
    padding: 5px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    align-items: center;

    h1 {
        color: var(--secondary-color);
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