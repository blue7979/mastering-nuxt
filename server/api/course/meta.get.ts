import { PrismaClient } from '@prisma/client';
import { courseSelect } from '~/domains/course.domain';
import {
  OutlineChapter,
  OutlineLesson,
} from '~/types/course';

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  const course = await prisma.course.findFirst(courseSelect);
  if (!course) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Meta data not found',
    });
  }

  // Warning!
  // EsLint error, will be fixed by mr'SONG later.
  // the nuxt3 video instructors getting things wrong
  const outline: OutlineChapter[] = course.chapters.reduce((prev, next) => {
    const lessons: OutlineLesson[] = next.lessons.map((l) => ({
      title: l.title,
      slug: l.slug,
      number: next.number,
      path: `/course/chapter/${next.slug}/lesson/${l.slug}`,
    }));

    const chapter = {
      title: next.title,
      slug: next.slug,
      number: next.number,
      lessons,
    };

    return [...prev, chapter];
  }, []);

  return {
    title: course.title,
    chapters: outline,
  };
});
