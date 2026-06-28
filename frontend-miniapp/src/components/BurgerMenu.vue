<script setup lang="ts">
import { changeTheme } from '@/functions/colors/main';
import { useMainStore } from '@/stores/main';


const props: any = defineProps({
    isOpen: {
        type: Boolean,
    }
});

const emits = defineEmits(["close"])

const mainStore = useMainStore()

</script>

<template>
    <div class="burger__wrapper" v-if="props.isOpen">
        <div class="burger__header">
            <h1>Меню</h1>
            <button @click="() => { emits('close') }">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                    fill="#e3e3e3">
                    <path
                        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
            </button>
        </div>
        <div class="burger__content">
            <div class="burger__link">
                <div @click="() => { changeTheme() }">
                    <svg v-if="mainStore.theme == 'light'" xmlns="http://www.w3.org/2000/svg" height="24px"
                        viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                        <path
                            d="M600-640 480-760l120-120 120 120-120 120Zm200 120-80-80 80-80 80 80-80 80ZM483-80q-84 0-157.5-32t-128-86.5Q143-253 111-326.5T79-484q0-146 93-257.5T409-880q-18 99 11 193.5T520-521q71 71 165.5 100T879-410q-26 144-138 237T483-80Zm0-80q88 0 163-44t118-121q-86-8-163-43.5T463-465q-61-61-97-138t-43-163q-77 43-120.5 118.5T159-484q0 135 94.5 229.5T483-160Zm-20-305Z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                        fill="#e3e3e3">
                        <path
                            d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm113-170q-70-70-70-170t70-170q70-70 170-70t170 70q70 70 70 170t-70 170q-70 70-170 70t-170-70Zm283-57q47-47 47-113t-47-113q-47-47-113-47t-113 47q-47 47-47 113t47 113q47 47 113 47t113-47ZM480-480Z" />
                    </svg>

                    <p>Сменить тему</p>
                </div>
            </div>
            <div class="burger__link">
                <RouterLink to="/settings" @click="() => { emits('close') }">

                    <svg xmlns=" http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                        fill="#e3e3e3">
                        <path
                            d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
                    </svg>

                    <p>Настройки</p>
                </RouterLink>
            </div>
            <div class="burger__link">
                <RouterLink to="/about" @click="() => { emits('close') }">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                        fill="#e3e3e3">
                        <path
                            d="M38-428q-18-36-28-73T0-576q0-112 76-188t188-76q63 0 120 26.5t96 73.5q39-47 96-73.5T696-840q112 0 188 76t76 188q0 38-10 75t-28 73q-11-19-26-34t-35-24q9-23 14-45t5-45q0-78-53-131t-131-53q-81 0-124.5 44.5T480-616q-48-56-91.5-100T264-760q-78 0-131 53T80-576q0 23 5 45t14 45q-20 9-35 24t-26 34ZM0-80v-63q0-44 44.5-70.5T160-240q13 0 25 .5t23 2.5q-14 20-21 43t-7 49v65H0Zm240 0v-65q0-65 66.5-105T480-290q108 0 174 40t66 105v65H240Zm540 0v-65q0-26-6.5-49T754-237q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780ZM480-210q-57 0-102 15t-53 35h311q-9-20-53.5-35T480-210Zm-320-70q-33 0-56.5-23.5T80-360q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-280Zm640 0q-33 0-56.5-23.5T720-360q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-280Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-440q0 50-34.5 85T480-320Zm0-160q-17 0-28.5 11.5T440-440q0 17 11.5 28.5T480-400q17 0 28.5-11.5T520-440q0-17-11.5-28.5T480-480Zm0 40Zm1 280Z" />
                    </svg>
                    <p>О нас</p>
                </RouterLink>
            </div>
        </div>
        <div class="burger__info">
            <p>Версия: prototype view v.0.1.0</p>
            <p>By <a href="https://github.com/bolgaro4ka" target="_blank">Bolgaro4ka</a> with love. 2026</p>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.burger__wrapper {
    position: fixed;
    right: 0;
    z-index: 30;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: var(--background-color);

    .burger__header {
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
    }

    button {
        background-color: transparent;
        border: none;
        overflow: none;
        width: 24px;
        height: 24px;
        padding: 0;
    }

    .burger__content {
        display: flex;
        padding: 10px;
        flex-direction: column;
        width: 100%;
        height: calc(100% - 60px);
        gap: 20px;
        align-items: center;

        .burger__link {
            width: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
            padding: 10px;

            &>* {
                display: flex;
                gap: 20px;
                width: 100%;
            }

            * {
                color: var(--text-primary-color);
            }
        }

    }

    .burger__info {
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        line-height: 1.2;
        color: var(--primary-color);
        padding: 5px;
    }

}
</style>