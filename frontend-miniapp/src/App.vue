<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
import { setTheme } from './functions/colors/main.ts';
import { onMounted } from 'vue';
import Sider from './components/Sider.vue';

onMounted(() => {
    setTheme((localStorage.getItem('theme') as 'light' | 'dark') || "light");
})

</script>

<template>
    <div>
        <Header />
        <div class="app__content">
            <RouterView />
        </div>
        <Sider />
    </div>
</template>

<style lang="scss" scoped>
.app__content {
    height: calc(100vh - 120px);
    overflow: hidden;
}
</style>