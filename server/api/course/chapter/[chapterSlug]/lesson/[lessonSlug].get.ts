import { QueryChapterLesson } from '~/types/Queries';
import course from '~/server/courseData';
import {
  Chapter, Course, Lesson, LessonWithPath,
} from '~/types/Course';

course as Course;

// "server/routes/api === server/api" is same address
export default defineEventHandler((event): LessonWithPath => {
  const { chapterSlug, lessonSlug } = event.context.params as QueryChapterLesson;

  const chapter: Maybe<Chapter> = course.chapters.find(
    (c) => c.slug === chapterSlug,
  );

  if (!chapter) {
    throw createError({
      statusCode: 404,
      message: 'Chapter not found',
    });
  }

  const lesson = chapter.lessons.find(
    (l) => l.slug === lessonSlug,
  );

  if (!lesson) {
    throw createError({
      statusCode: 404,
      message: 'Lesson not found',
    });
  }

  return { ...lesson, path: `/course/chapter/${chapterSlug}/lesson/${lessonSlug}` };
});
