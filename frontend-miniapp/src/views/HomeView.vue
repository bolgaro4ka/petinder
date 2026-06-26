<script setup lang="ts">
import PetSwipeDeck from '@/components/PetSwipeDeck.vue'
import { DB } from '@/db/main'
</script>

<template>
    <main>
        <PetSwipeDeck :pets="Object.values(DB.pet)" />
    </main>
</template>
