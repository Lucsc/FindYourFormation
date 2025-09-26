<template>
    <div class="w-full">
        <div class="rounded-2xl overflow-hidden">
            <div class="p-4 md:p-5 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 text-white flex items-center justify-between">
                <div>
                    <h2 class="text-lg md:text-xl font-semibold">{{ name }}</h2>
                    <div class="mt-2 text-sm opacity-90 flex items-center gap-4">
                        <div class="flex items-center gap-2">
                            <img src="~/assets/icons/location.svg" alt="Location" class="h-4 w-4 opacity-90" />
                            <span class="truncate">{{ city }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <img src="~/assets/icons/building.svg" alt="Building" class="h-4 w-4 opacity-90" />
                            <span>{{ category || 'Privé' }}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        class="bg-white text-gray-800 rounded-full px-3 py-1 text-sm shadow-sm"
                        @click="openModal"
                    >
                        Modifier
                    </button>
                </div>
            </div>
        </div>
    </div>
    <LyceeSelector v-model:lycee="selectedLycee" v-model:showModal="showSelector"/>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
    name: string;
    city: string;
    category?: string | null;
}

defineProps<Props>();

const selectedLycee = ref(null)
const showSelector = ref(false)

function openModal() {
    showSelector.value = true
}

const emits = defineEmits<{
    (e: 'update:lycee', lycee: { name: string; city: string; category: string } | null): void;
}>();

watch(selectedLycee, (newVal : any) => {
    emits('update:lycee', newVal);
});
</script>