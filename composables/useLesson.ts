import { StorageSerializers } from '@vueuse/core';
import { LessonWithPath } from '~/types/Course';

export default async (
  chapterSlug: string,
  lessonSlug: string,
) => {
  const url = `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`;
  const lesson = useSessionStorage<LessonWithPath>(url, null, {
    serializer: StorageSerializers.object,
  });

  if (!lesson.value) {
    const { data, error } = await useFetch<LessonWithPath>(url);

    lesson.value = data.value;
    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not fetch lesson ${lessonSlug} in chapter ${chapterSlug}`,
      });
    }
  }

  return lesson;
};
