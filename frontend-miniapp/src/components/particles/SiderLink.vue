<script setup lang="ts">
const props = defineProps<{
    title: string;
    to: string;
}>();


</script>

<template>
    <div class="sider__link-wrapper">
        <RouterLink :to="props.to" class="sider__link">
            <slot></slot>
            <p>{{ props.title }}</p>
        </RouterLink>
    </div>
</template>

<style lang="scss" scoped>
.sider__link-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .sider__link {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 60px;

        p {
            text-decoration: none !important;
            text-underline-offset: 0;
            color: var(--text-primary-color);
        }
    }
}
</style>