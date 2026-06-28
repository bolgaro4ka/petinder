<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from "vue";

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
    },
    label: {
        type: String,
        default: "Фотографии питомца"
    },
    multiple: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(["update:modelValue"]);

const input = ref<HTMLInputElement | null>(null);

const previewImage = ref<string | null>(null);

const files = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value)
});

function openPicker() {
    (input.value as HTMLInputElement).click();
}

function addFiles(event : Event) {
    const selected = [...(event.target as any).files];

    const newFiles = selected.map(file => ({
        file,
        url: URL.createObjectURL(file)
    }));

    files.value = [...files.value, ...newFiles];

    (event.target as HTMLInputElement).value = "";
}

function remove(index : number) {
    URL.revokeObjectURL((files.value as any)[index].url);

    const arr = [...files.value];
    arr.splice(index, 1);

    files.value = arr;
}

function openPreview(url : string) {
    previewImage.value = url;
}

function closePreview() {
    previewImage.value = null;
}

onBeforeUnmount(() => {
    files.value.forEach(file  => URL.revokeObjectURL((file as any).url));
});
</script>

<template>
    <div class="label-float file">

        <input ref="input" type="file" :multiple="multiple" placeholder=" " @change="addFiles" hidden />

        <div class="file-box">

            <div v-for="(item, index) in files" :key="(item as any).url" class="preview">

                <img :src="(item as any).url" @click="openPreview((item as any).url)">

                <button class="delete" @click="remove(index)">
                    ×
                </button>

            </div>

            <button class="add" @click="openPicker">
                +
            </button>

        </div>

        <label>{{ label }}</label>

    </div>

    <Teleport to="body">
        <div v-if="previewImage" class="preview-modal" @click="closePreview">

            <img :src="previewImage" @click.stop>

        </div>
    </Teleport>

</template>

<style scoped>
.label-float {
    position: relative;
    padding-top: 12px;
}

.file-box {

    min-height: 120px;
    width: 100%;
    min-width: 250px;

    padding: 15px;

    display: flex;
    flex-wrap: wrap;
    gap: 15px;

    border-radius: 5px;

    background: var(--surface-color);

}

label {

    position: absolute;
    top: -2px;
    left: 10px;

    padding: 0 10px;

    font-size: 13px;

}

.preview {

    width: 100px;
    height: 100px;

    border-radius: 8px;

    overflow: hidden;

    position: relative;

}

.preview img {

    width: 100%;
    height: 100%;

    object-fit: cover;

    cursor: pointer;

}

.delete {

    position: absolute;

    right: 5px;
    top: 5px;

    width: 24px;
    height: 24px;

    border: none;

    border-radius: 50%;

    background: #ff4d4f;
    color: white;

    cursor: pointer;

}

.add {

    width: 100px;
    height: 100px;

    border: 2px dashed #bbb;
    border-radius: 8px;

    background: transparent;

    font-size: 40px;

    cursor: pointer;

    transition: .2s;

}

.add:hover {

    border-color: var(--text-color);

}

.preview-modal {

    position: fixed;

    inset: 0;

    background: rgba(0, 0, 0, .7);

    display: flex;

    justify-content: center;
    align-items: center;

    z-index: 9999;

}

.preview-modal img {

    max-width: 90vw;
    max-height: 90vh;

    border-radius: 10px;

}
</style>