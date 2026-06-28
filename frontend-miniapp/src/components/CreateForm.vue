<script setup lang="ts">
import { ref } from 'vue';
import GFiles from './particles/GFiles.vue';


const photos = ref([]);
</script>

<template>
    <div class="create-form">
        <div class="form__inline">
            <GFiles v-model="photos" label="Фотографии вашего питомца" />
            <div class="label-float">
                <input type="text" placeholder="" required autocomplete="new-password" id="pet_name">
                <label for="pet_name">Имя вашего питомца</label>
            </div>
            <div class="label-float">
                <input type="number" :min="0" :max="200" :step="0.1" placeholder="" required id="age" />
                <label for="age">Возраст</label>
            </div>

            <textarea class="desc" placeholder="Расскажите про вашего питомца" autocomplete="new-password"
                id=""></textarea>

            <div class="label-float">
                <input type="text" placeholder="" required autocomplete="new-password" id="name" />
                <label for="name">Ваше имя</label>
            </div>
            <div class="label-float">
                <input type="tel" placeholder="" required autocomplete="new-password" id="tel" />
                <label for="tel">Телефон для связи</label>
            </div>
        </div>
        <button class="create-btn">Создать</button>
        <button class="save-draft">Сохранить в черновики</button>
    </div>

</template>

<style lang="scss" scoped>
.form__inline {
    width: 100%;

    .file>input {
        height: 60px;
        border: 6px dashed var(--secondary-color);
    }

    .desc {
        margin-top: 20px;
    }

    .label-float>input {
        width: 100%;
    }
}

.create-form {
    button {
        width: 100%;
        margin-top: 20px;
        background-color: var(--primary-color);
        height: 40px;
        border-radius: 20px;
        border: none;
        outline: none;
    }

    .save-draft {
        margin-top: 10px;
        border: 1px solid var(--primary-color);
        background-color: transparent;
        color: var(--text-primary-color);
    }
}
</style>