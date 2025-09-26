<template>
  <main class="min-h-screen py-8 px-6 md:px-16 lg:px-24">
    <section class="max-w-md mx-auto">
      <div class="mb-6">
        <div class="rounded-xl bg-[#f3eeec] px-4 py-3 text-center">
          <div class="text-xs text-gray-600">EPITECH Paris | Paris</div>
          <div class="text-sm text-gray-700 font-medium">Ecole d'expert en technologie de l'information</div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-md p-6">
        <div class="flex flex-col items-center gap-4">
          <div class="w-40 h-40 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 120 120" class="w-40 h-40">
              <defs>
                <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#ff8a65" />
                  <stop offset="100%" stop-color="#b57cf6" />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="44" stroke="#f0f0f0" stroke-width="6" fill="none" />
              <circle
                cx="60"
                cy="60"
                r="44"
                stroke="url(#g)"
                stroke-width="6"
                stroke-linecap="round"
                fill="none"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="circumference - (circumference * percent) / 100"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <img src="~/assets/icons/rating.svg" class="absolute w-16 h-16" />
          </div>

          <div class="text-center">
            <div class="text-2xl font-semibold">{{ percent }}% · <span class="text-base font-medium">{{ label }}</span></div>
            <div class="mt-2 text-sm text-gray-600">Fiabilité
              <span class="ml-2 inline-flex items-center">
                <template v-for="i in 5">
                    <img v-if="i <= stars" src="~/assets/icons/star_black.svg" :key="i" class="h-4 w-4 text-gray-800" />
                    <img v-else src="~/assets/icons/star_gray.svg" class="h-4 w-4 text-gray-200" />
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
const stars = ref(Math.floor(percent.value / 20));

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
.w-40 {
    width: 10rem;
    height: 10rem;
}
</style>