<template>
    <div class="w-full bg-white rounded-2xl shadow-sm border border-transparent">
        <div class="p-4">
            <button class="flex items-center justify-between w-full" @click="toggle">
                <h3 class="text-base font-semibold text-gray-900">{{ Title || 'Section' }}</h3>
                <div class="flex flex-row gap-4 items-center">
                    <span v-if="!confirmed" class="text-sm text-gray-600">À compléter</span>
                    <img src="~/assets/icons/chevron-down.svg" :class="['transform transition-transform', opened ? 'rotate-0' : 'rotate-180']" alt="Toggle" />
                </div>
            </button>

            <transition name="fade">
                <div v-if="opened" class="mt-4">
                    <div v-if="!hasSections" class="text-gray-400 py-6">Aucune donnée accessible</div>
                    <div v-else>
                        <div v-for="(section, sIdx) in sections" :key="sIdx" class="mb-4">
                            <div class="mb-2 text-sm  text-gray-900">{{ section.title || ''}}</div>
                            <div class="flex flex-wrap gap-3">
                                <button
                                    v-for="(btn, bIdx) in section.buttons"
                                    :key="bIdx"
                                    @click="selectButton(sIdx, bIdx)"
                                    :class="['px-4 py-2 text-sm rounded-full', btn.selected ? 'bg-white text-gray-900 border-1' : 'bg-gray-100 text-gray-800']"
                                >
                                    {{ btn.text }}
                                </button>
                            </div>
                            <div v-if="sIdx < sections.length - 1" class="mt-4 border-t border-gray-100 pt-4"></div>
                        </div>
                        <div class="mt-4">
                            <button
                                @click="confirm"
                                :disabled="!allSelected"
                                :class="[
                                    'w-full py-3 rounded-full transition-colors',
                                    allSelected
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-white border border-gray-200 text-gray-700'
                                ]"
                                :style="{ cursor: allSelected ? 'pointer' : 'not-allowed' }"
                            >
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface Button {
    text: string;
    value: string;
    selected: boolean;
}
interface Section {
    title?: string | null;
    buttons?: Button[];
}
interface Props {
    Sections?: Array<Section | null> | null;
    Title: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: 'update', payload: {
        title : string,
        values : Array<string>
    }): void;
}>();

const opened = ref(false);
const allSelected = computed(() => {
    return sections.value.length > 0 ? sections.value.every(sec => sec.buttons?.some(b => b.selected)) : false;
});
const confirmed = ref(false);

const hasSections = computed(() => Array.isArray(props.Sections) && props.Sections.length > 0);

const sections = ref<Section[]>([]);

watch(
    () => props.Sections,
    (newVal) => {
        if (Array.isArray(newVal)) {
            sections.value = newVal.map(s => ({
                title: s?.title ?? null,
                buttons: (s?.buttons ?? []).map(b => ({ ...b }))
            }));
        } else {
            sections.value = [];
        }
    },
    { immediate: true }
);

function toggle() {
    opened.value = !opened.value;
}

function selectButton(sectionIdx: number, buttonIdx: number) {
    const btns = sections.value[sectionIdx]!.buttons;
    if (!btns) return;
    if (btns[buttonIdx]!.selected) {
        btns[buttonIdx]!.selected = false;
    } else {
        btns.forEach((b, idx) => {
            b.selected = idx === buttonIdx;
        });
    }
}

function confirm() {
    const selectedValues = sections.value.map(sec => {
        const btn = sec.buttons?.find(b => b.selected);
        return btn ? btn.value : null;
    });
    if (selectedValues.some(v => v === null)) return;
    emit('update', {
        title: props.Title || 'Section',
        values: selectedValues as Array<string>
    });
    opened.value = false;
    confirmed.value = true;
}
</script>
