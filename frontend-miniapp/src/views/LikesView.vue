<script setup lang="ts">
import LikesList from '@/components/LikesList.vue';


</script>

<template>
    <div class="likes">
        <h2>Понравившиеся</h2>
        <LikesList />
    </div>

</template>

<style lang="scss" scoped>
.likes {
    padding: 5px;
}
</style>