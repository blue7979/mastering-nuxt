<script lnag="ts" setup>
import useLesson from '~/composables/useLesson';
import { useCourseProgress } from '~/stores/courseProgress';

const course = await useCourse();
const route = useRoute();
const { chapterSlug, lessonSlug } = route.params;
const lesson = await useLesson(chapterSlug, lessonSlug);
const store = useCourseProgress();
const { initialize, toggleComplete } = store;

initialize();

definePageMeta({
  middleware: ['abort', 'auth'],
});

const isCompleted = computed(() => store.progress.value[chapterSlug]?.[lessonSlug] || 0);

const chapter = computed(() => course.value.chapters.find(
  (c) => c.slug === route.params.chapterSlug,
));

const title = computed(() => `${lesson.value.title} - ${course.title}`);
useHead({
  title,
});

</script>

<template>
  <div>
    <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
      Lesson {{ chapter.number }} - {{ lesson.number }}
    </p>
    <h2 class="my-0">
      {{ lesson.title }}
    </h2>
    <div class="flex space-x-4 mt-2 mb-8">
      <NuxtLink
        v-if="lesson.sourceUrl"
        class="font-normal text-md text-gray-500"
        :to="lesson.sourceUrl"
      >
        Download Source Code
      </NuxtLink>
      <NuxtLink
        v-if="lesson.downloadUrl"
        class="font-normal text-md text-gray-500"
        :to="lesson.downloadUrl"
      >
        Download Video
      </NuxtLink>
    </div>
    <VideoPlayer
      v-if="lesson.videoId"
      :video-id="lesson.videoId"
    />
    <p>{{ lesson.text }}</p>
    <LessonCompleteButton
      v-if="user"
      :model-value="isCompleted"
      @update:model-value="toggleComplete"
    />
  </div>
</template>
