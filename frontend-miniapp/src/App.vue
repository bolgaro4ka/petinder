<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
import { setTheme } from './functions/colors/main.ts';
import { onMounted } from 'vue';

onMounted(() => {
    setTheme("dark");
})

</script>

<template>
    <div>
        <Header />
        <RouterView />
    </div>
</template>
