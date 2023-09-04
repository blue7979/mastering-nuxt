import { LessonWithPath } from '~/types/Course';
import useFetchWithCache from './useFetchWithCache';

export default async (
  chapterSlug: string,
  lessonSlug: string,
) => useFetchWithCache<LessonWithPath>(`/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`);
