<script setup lang="ts">
import { DB } from '@/db/main';

</script>

<template>
    <div class="likes__wrapper common__overflow">
        <ul class="likes__list">
            <li class="likes__item" v-for="index in Object.keys(DB['pet'])">
                <div class="likes__content">
                    <img :src="(DB['pet'] as any)[index]['photo']" :alt="`dog ${index}`">
                    <div class="likes__info">
                        <h3>{{ (DB['pet'] as any)[index]['name'] }}</h3>
                        <p>Возраст: {{ (DB['pet'] as any)[index]['age'] }}</p>
                        <h4>Контакты для связи:</h4>
                        <p> {{ (DB['pet'] as any)[index]['host_name'] }} {{ (DB['pet'] as any)[index]['host_phone'] }}
                        </p>
                    </div>
                </div>
                <div class="likes__desc">
                    <p>Этот милый пёсик ищет домик, чтобы жить в нём и любить своего хозяина...
                    </p>
                </div>
            </li>
        </ul>

    </div>
</template>

<style lang="scss" scoped>
.likes__wrapper {

    .likes__list {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        list-style: none;
        margin-block-start: none;
        margin-block-end: none;
        padding-inline-start: 0px;

        gap: 20px;

        .likes__item {
            width: 100%;
            background-color: var(--surface-color);
            padding: 5px;
            display: flex;
            border-radius: 20px;
            flex-direction: column;
            gap: 10px;

            h3 {
                background-color: var(--primary-color);
                text-align: center;
                padding: 1px 5px;
                border-radius: 10px;
                color: var(--on-primary-color)
            }

            h4 {
                color: var(--primary-color);
            }

            .likes__info {
                width: 100%;
            }

            img {
                width: 100px;
                height: 100px;
                border-radius: 20px;
                object-fit: cover;
            }

            .likes__content {
                width: 100%;
                display: flex;
                gap: 10px;
            }
        }
    }
}
</style>