import { Lesson } from '@prisma/client';

export default async (
  chapterSlug: string,
  lessonSlug: string,
) => useFetchWithCache<Lesson>(`/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`);
