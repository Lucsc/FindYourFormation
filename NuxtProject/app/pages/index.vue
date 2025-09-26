<template>
        <main class="min-h-screen py-12 px-6 md:px-16 lg:px-24">
            <section class="max-w-2xl mx-auto">
                <!-- Top card -->
                <div class="mb-6">
                    <LyceeCard name="Lycée Gaston Berger" city="Lille" category="Lycée Public" />
                </div>

                <!-- Sections stacked like screenshot -->
                <div class="space-y-4">
                    <SectionCard
                        Title="Classe"
                        :Sections="classeSections"
                        :Initial="classeInitial"
                        @update="handleSectionUpdate"
                    />
                    <SectionCard Title="Spécialités" :Sections="null" @update="handleSectionUpdate" />
                    <SectionCard Title="Notes" :Sections="null" @update="handleSectionUpdate" />
                </div>

                <!-- Confirm bottom button -->
                <div class="mt-8 flex justify-center">
                    <button class="px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-600">Confirmer</button>
                </div>
            </section>
        </main>
</template>

<script setup lang="ts">
import LyceeCard from '~/components/LyceeCard.vue';
import SectionCard from '~/components/SectionCard.vue';

// Fetch prefill data on the client only to avoid server/client hydration mismatches
const { data: prefillData } = useFetch('/api/prefill', { server: false });

// Store collected selections from SectionCard children
const selections = useState('selections', () => ({}));

// Map client prefill data (when available) into the structure the SectionCard expects
const classeSections = computed(() => {
        const cd = (prefillData.value as any)?.classCard;
    if (!cd) return null;
    // build a Sections array where one section contains buttons for Classe and an initial selection
    return [
        {
            title: 'Classe',
            buttons: [
                { text: 'Seconde', value: 0 },
                { text: 'Première', value: 1 },
                { text: 'Terminale', value: 2 }
            ]
        }
    ];
});

const classeInitial = computed(() => {
        const cd = (prefillData.value as any)?.classCard;
    if (!cd) return null;
    return { pills: { [cd.classe]: true }, bac: cd.parcours };
});

function handleSectionUpdate(payload: { title?: string | null; selections: Record<string, any> }) {
    if (!payload || !payload.title) return;
    selections.value = { ...selections.value, [payload.title]: payload.selections };
    if (typeof window !== 'undefined') console.log('selections updated', selections.value);
}
</script>