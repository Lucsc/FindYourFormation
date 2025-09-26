<template>
    <div class="w-full">
        <div
            v-if="show"
            class="fixed inset-0 z-50 flex items-center justify-center"
        >
            <div
                class="absolute inset-0 bg-black" style="opacity: 0.5"
                @click="close"
            ></div>
            <div
                class="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6 z-10"
                @click.stop
            >
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold text-gray-800">Sélectionnez votre lycée</h2>
                    <button @click="close" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
                </div>
                <input
                    v-model="search"
                    type="text"
                    placeholder="Chercher un lycée"
                    class="w-full px-4 py-2 rounded-xl border border-gray-200 mb-4 focus:outline-none"
                />
                <ul class="max-h-64 overflow-y-auto">
                    <li
                        v-for="lycee in filteredLycees"
                        :key="lycee.name + lycee.city"
                        @click="selectLycee(lycee)"
                        class="px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100"
                    >
                        <span class="font-medium">{{ lycee.name }}</span>&nbsp;
                        <span class="text-sm text-gray-500">({{ lycee.city }})</span>
                    </li>
                    <li v-if="filteredLycees.length === 0" class="px-4 py-2 text-gray-400">
                        Aucun lycée trouvé.
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface Props {
    lycees?: Array<{ name: string; city: string; category: string }> | null;
    // support v-model:lycee
    lycee?: { name: string; city: string; category: string } | null;
    // support v-model:showModal
    showModal?: boolean | null;
}

const props = defineProps<Props>();

const emits = defineEmits<{
    (e: 'select', lycee: { name: string; city: string; category: string }): void;
    (e: 'update:lycee', lycee: { name: string; city: string; category: string } | null): void;
    (e: 'update:showModal', val: boolean): void;
}>();

const internalShow = ref(false);
const show = computed({
    get: () => (props.showModal ?? internalShow.value) as boolean,
    set: (v: boolean) => {
        internalShow.value = v;
        emits('update:showModal', v);
    }
});

const search = ref('');
const selectedLycee = ref<{ name: string; city: string; category: string } | null>(props.lycee ?? null);
const lyceeList = ref<Array<{ name: string; city: string; category: string }>>([]);

const getListOfLycees = async () => {
    const response = await fetch('/api/schoollist');
    if (!response.ok) {
        throw new Error('Failed to fetch lycees');
    }
    return response.json();
};

    onMounted(async () => {
    if (props.lycees && props.lycees.length) {
        lyceeList.value = props.lycees;
    } else {
        try {
            lyceeList.value = await getListOfLycees();
        } catch (e) {
            lyceeList.value = [];
        }
    }
});

const filteredLycees = computed(() => {
    if (!search.value) return lyceeList.value;
    return lyceeList.value.filter(
        (lycee) =>
            lycee.name.toLowerCase().includes(search.value.toLowerCase()) ||
            lycee.city.toLowerCase().includes(search.value.toLowerCase())
    );
});

function close() {
    show.value = false;
}

function selectLycee(lycee: { name: string; city: string; category: string }) {
    selectedLycee.value = lycee;
    emits('select', lycee);
    emits('update:lycee', lycee);
    show.value = false;
}
</script>