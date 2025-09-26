<template>
  <div class="w-full bg-white rounded-2xl shadow-sm border border-transparent">
    <div class="p-4">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-semibold text-gray-900">{{ Title || 'Section' }}</h3>
        <button @click="toggle" class="text-gray-400">{{ opened ? '˄' : '˅' }}</button>
      </div>

      <transition name="fade">
        <div v-if="opened" class="mt-4">
          <div v-if="!hasSections && Title !== 'Classe'" class="text-gray-400 py-6">Aucune donnée accessible</div>

            <div v-else>
            <div class="flex flex-wrap gap-3">
              <button
                v-for="(p, idx) in pillLabels"
                :key="idx"
                @click="togglePill(p)"
                :class="['px-4 py-2 text-sm rounded-full', selections[p] ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-800']"
              >
                {{ p }}
              </button>
            </div>

            <div class="mt-4 border-t border-gray-100 pt-4">
              <label class="text-sm text-gray-600 mb-2 block">Type de bac</label>
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="(b, idx) in bacLabels"
                  :key="idx"
                  @click="toggleBac(b)"
                  :class="['px-4 py-2 text-sm rounded-full', bacSelection === b ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-800']"
                >
                  {{ b }}
                </button>
              </div>
            </div>

            <div class="mt-4">
              <button @click="confirm" class="w-full py-3 bg-white border border-gray-200 rounded-full text-gray-700">Confirmer</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  Sections?: Array<{
    title?: string | null;
    buttons?: Array<{ text: string; value: number }>;
  } | null> | null;
  Title?: string | null;
  Initial?: { pills?: Record<string, boolean>; bac?: string | null } | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update', payload: { title?: string | null; selections: Record<string, any> }): void;
}>();

const opened = ref(false);
const selections = ref<Record<string, boolean>>({});
const bacSelection = ref<string | null>(null);

const hasSections = computed(() => Array.isArray(props.Sections) && props.Sections.length > 0);

// Fallback pill labels when Sections provided; otherwise default sample labels for Classe
const pillLabels = computed(() => {
  if (hasSections.value) {
    const out: string[] = [];
    for (const s of props.Sections as NonNullable<typeof props.Sections>) {
      if (!s) continue;
      const labels = s.buttons?.map(b => b.text) ?? [];
      out.push(...labels);
    }
    return out;
  }
  // default when Sections is null and Title is 'Classe'
  return props.Title === 'Classe' ? ['Seconde', 'Première', 'Terminale'] : [];
});

const bacLabels = ['Général', 'Technologique', 'Professionnel'];

function toggle() {
  opened.value = !opened.value;
}

function togglePill(label: string) {
  selections.value[label] = !selections.value[label];
}

function toggleBac(label: string) {
  bacSelection.value = bacSelection.value === label ? null : label;
}

function confirm() {
  emit('update', { title: props.Title, selections: { pills: { ...selections.value }, bac: bacSelection.value } });
}

// Apply Initial selections if provided
import { onMounted } from 'vue';

onMounted(() => {
  if (props.Initial) {
    if (props.Initial.pills) selections.value = { ...props.Initial.pills } as Record<string, boolean>;
    if (props.Initial.bac) bacSelection.value = props.Initial.bac;
  }
});
</script>