<template>
  <main class="min-h-screen py-8 px-6 md:px-16 lg:px-24">
    <section class="max-w-md mx-auto">
      <!-- Top pill with school -->
      <div class="mb-6">
        <div class="rounded-xl bg-[#f3eeec] px-4 py-3 text-center">
          <div class="text-xs text-gray-600">EPITECH Paris | Paris</div>
          <div class="text-sm text-gray-700 font-medium">Ecole d'expert en technologie de l'information</div>
        </div>
      </div>

      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-md p-6">
        <div class="flex flex-col items-center gap-4">
          <!-- Circular graphic placeholder (use asset path if available) -->
          <div class="w-40 h-40 rounded-full flex items-center justify-center">
            <!-- If you have an asset, replace the SVG below with: <img src="~/assets/icons/formation.svg" /> -->
            <svg viewBox="0 0 120 120" class="w-40 h-40">
              <defs>
                <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#ff8a65" />
                  <stop offset="100%" stop-color="#b57cf6" />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="44" stroke="#f0f0f0" stroke-width="12" fill="none" />
              <circle
                cx="60"
                cy="60"
                r="44"
                stroke="url(#g)"
                stroke-width="12"
                stroke-linecap="round"
                fill="none"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="circumference - (circumference * percent) / 100"
                transform="rotate(-90 60 60)"
              />
              <!-- Center icon (lightning) -->
              <g transform="translate(60,60) scale(0.7)">
                <path d="M-8 -18 L6 -2 L-2 -2 L12 18 L-4 2 L6 2 Z" fill="#ff8a65" />
              </g>
            </svg>
          </div>

          <div class="text-center">
            <div class="text-2xl font-semibold">{{ percent }}% · <span class="text-base font-medium">{{ label }}</span></div>
            <div class="mt-2 text-sm text-gray-600">Fiabilité
              <span class="ml-2 inline-flex items-center">
                <template v-for="i in 5">
                  <svg v-if="i <= stars" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.413 2.308c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.585 9.393c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69L9.05 2.927z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.413 2.308c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.585 9.393c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69L9.05 2.927z" />
                  </svg>
                </template>
              </span>
            </div>

            <p class="mt-4 text-sm text-gray-500">Cette estimation est fournie à titre indicatif et ne garantit en aucun cas la décision d'admission de l'établissement.</p>
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-center">
        <button @click="back" class="px-6 py-3 rounded-full bg-black text-white">Tester une autre formation</button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from '#app';

const percent = ref(Math.floor(Math.random() * 101));
const stars = ref(Math.floor(Math.random() * 6));

const circumference = 2 * Math.PI * 44;

const label = computed(() => {
  if (percent.value >= 75) return 'Très élevées';
  if (percent.value >= 50) return 'Élevées';
  if (percent.value >= 25) return 'Faibles';
  return 'Très faibles';
});

const router = useRouter();
function back() {
  router.push('/');
}
</script>

<style scoped>
.w-40 { width: 10rem; height: 10rem; }
</style>