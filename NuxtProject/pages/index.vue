<template>
    <main class="min-h-screen py-12 px-6 md:px-16 lg:px-24">
        <section class="max-w-2xl mx-auto">
            <div class="mb-6">
                <LyceeCard
                    :name="valuesCard.School?.name ?? 'Aucun lycée sélectionné'"
                    :city="valuesCard.School?.city ?? ''"
                    :category="valuesCard.School?.category ?? ''"
                    @update:lycee="(lycee) => valuesCard.School = lycee"
                />
            </div>

            <div class="space-y-4">
                <SectionCard
                    Title="Classe"
                    :Sections="classeSections"
                    @update="handleSectionUpdate"
                />
                <SectionCard Title="Spécialités" :Sections="null" @update="handleSectionUpdate" />
                <SectionCard Title="Notes" :Sections="null" @update="handleSectionUpdate" />
            </div>

            <div class="mt-8 flex justify-center">
                <button @click="goToFormation" :class="['px-6 py-3 rounded-full ',
                    canConfirm ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-400'
                ]" :style="{ cursor: canConfirm ? 'pointer' : 'not-allowed' }">Confirmer</button>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from '#app';
import LyceeCard from '@/components/LyceeCard.vue';
import SectionCard from '@/components/SectionCard.vue';

const valuesCard = ref<{
    School: { name: string; city: string; category: string } | null;
    Classe: any;
    Specialites: any;
    Notes: any;
}>({
    School: null,
    Classe: null,
    Specialites: null,
    Notes: null,
});

const canConfirm = computed(() => {
    return valuesCard.value.School != null && valuesCard.value.Classe != null;
})

const classeSections = ref([
    {
        buttons: [
            { text: 'Seconde', value: 'Seconde', selected: false },
            { text: 'Première', value: 'Première', selected: false },
            { text: 'Terminale', value: 'Terminale', selected: false }
        ]
    },
    {
        title: 'Type de bac',
        buttons: [
            { text: 'Général', value: 'Général', selected: false },
            { text: 'Technologique', value: 'Technologique', selected: false },
            { text: 'Professionnel', value: 'Professionnel', selected: false }
        ]
    }
]);

async function fetchPrefill() {
    const res = await useFetch('/api/prefill');
    if (res.data.value) {
        valuesCard.value.School = res.data.value.lycee ?? null;
        const classCard = res.data.value.classCard;

        if (classCard) {
            const btnClasse = classeSections.value[0] && classeSections.value[0].buttons
                ? classeSections.value[0].buttons.find(btn => btn.value === classCard.classe)
                : null;
            if (btnClasse) btnClasse.selected = true;
            const btnParcours = classeSections.value[1] && classeSections.value[1].buttons
                ? classeSections.value[1].buttons.find(btn => btn.value === classCard.parcours)
                : null;
            if (btnParcours) btnParcours.selected = true;

            nextTick(() => {
                classeSections.value = [...classeSections.value];
            });
        }
    }
}

fetchPrefill();

onMounted(() => {
    fetchPrefill();
});

const router = useRouter();
function goToFormation() {
    if(!canConfirm.value) return;
    router.push('/formation');
}

function handleSectionUpdate(payload: { title : string, values : Array<string> }) {
    if (!payload || !payload.title) return;
    switch (payload.title) {
        case 'Classe':
            valuesCard.value.Classe = payload.values;
            break;
        case 'Spécialités':
            valuesCard.value.Specialites = payload.values;
            break;
        case 'Notes':
            valuesCard.value.Notes = payload.values;
            break;
    }
}
</script>