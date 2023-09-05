import { LessonWithPath } from '~/types/Course';

export default async (
  chapterSlug: string,
  lessonSlug: string,
) => useFetchWithCache<LessonWithPath>(`/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`);