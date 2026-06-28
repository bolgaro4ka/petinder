<script setup lang="ts">
import CreateForm from '@/components/CreateForm.vue';

</script>

<template>
    <div class="create">
        <h2>Создать анкету</h2>
        <CreateForm />
    </div>
</template>

<style lang="scss" scoped>
.create {
    padding: 5px;
    overflow-y: scroll;
    max-height: calc(100vh - 120px);

    h2 {
        margin: 10px 0;
    }
}
</style>