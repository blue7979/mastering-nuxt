import { defineStore } from 'pinia';
import { QueryChapterLesson } from '~/types/Queries';
import { CourseProgress } from '~/types/course';

export const useCourseProgress = defineStore(
  'courseProgress',
  () => {
    // Initialize progress from local storage
    const progress = ref<CourseProgress>({});
    const initialized = ref(false);

    async function initialize() {
      // If the course has already been initialized, return
      if (initialized.value) return;
      initialized.value = true;

      const { data: userProgress } = await useFetch<CourseProgress>(
        '/api/user/progress',
        { headers: useRequestHeaders(['cookie']) },
      );

      // Update progress value
      if (userProgress.value) {
        progress.value = userProgress.value;
      }
    }

    // Toggle the progress of a lesson based on chapter slug and lesson slug
    const toggleComplete = async (
      chapterString: string,
      lessonString: string,
    ) => {
      const user = useSupabaseUser();
      let [chapter, lesson] = '';
      if (!user.value) return;

      if (!chapterString || !lessonString) {
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
        console.error(error);

        progress.value[chapter] = {
          ...progress.value[chapter],
          [lesson]: currentProgress,
        };
      }
    };

    const percentageCompleted = computed(() => {
      const chapters = Object.values(progress.value).map(
        (chapter) => {
          const lessons = Object.values(chapter);
          const completedLessons = lessons.filter(
            (lesson) => lesson,
          );
          return Number(
            (completedLessons.length / lessons.length) * 100,
          ).toFixed(0);
        },
        [],
      );

      const totalLessons = Object.values(
        progress.value,
      ).reduce((number, chapter) => number + Object.values(chapter).length, 0);

      const totalCompletedLessons = Object.values(
        progress.value,
      ).reduce((number, chapter) => (
        number
          + Object.values(chapter).filter((lesson) => lesson)
            .length
      ), 0);

      const course = Number(
        (totalCompletedLessons / totalLessons) * 100,
      ).toFixed(0);

      return {
        chapters,
        course,
      };
    });

    return {
      initialize,
      progress,
      toggleComplete,
      percentageCompleted,
    };
  },
);
