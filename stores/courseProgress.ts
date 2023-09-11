import { defineStore } from 'pinia';
import { QueryChapterLesson } from '~/types/Queries';

export const useCourseProgress = defineStore(
  'courseProgress',
  () => {
    const progress = ref<any>({});
    const initialized = ref(false);

    async function initialize() {
      if (initialized.value) return;
      initialized.value = true;
    }

    const toggleComplete = async (chapterString: string, lessonString: string) => {
      const user = useSupabaseUser();
      let [chapter, lesson] = [chapterString, lessonString];

      if (!user.value) return;

      if (!chapter || !lesson) {
        const { chapterSlug, lessonSlug } = useRoute().params as QueryChapterLesson;
        [chapter, lesson] = [chapterSlug, lessonSlug];
      }

      const currentProgress = progress.value[chapter]?.[lesson];

      progress.value[chapter] = {
        ...progress.value[chapter],
        [lesson]: !currentProgress,
      };

      try {
        await $fetch(
          `/api/course/chapter/${chapter}/lesson/${lesson}/progress`,
          {
            method: 'POST',
            body: {
              completed: !currentProgress,
            },
          },
        );
      } catch (error) {
        // console.error(error);

        progress.value[chapter] = {
          ...progress.value[chapter],
          [lesson]: currentProgress,
        };
      }
    };

    return {
      initialize,
      progress,
      toggleComplete,
    };
  },
);
