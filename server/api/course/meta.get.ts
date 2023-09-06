import { PrismaClient, Prisma } from '@prisma/client';
import {
  OutlineChapter,
  OutlineLesson,
} from '~/types/course';

const prisma = new PrismaClient();

const lessonSelect = Prisma.validator<Prisma.LessonArgs>()({
  select: {
    title: true,
    slug: true,
    number: true,
  },
});
export type LessonOutline = Prisma.LessonGetPayload<
  typeof lessonSelect
>;

const chapterSelect = Prisma.validator<Prisma.ChapterArgs>()({
  select: {
    title: true,
    slug: true,
    number: true,
    lessons: lessonSelect,
  },
});
export type ChapterOutline = Prisma.ChapterGetPayload<
  typeof chapterSelect
>;

const courseSelect = Prisma.validator<Prisma.CourseArgs>()({
  select: {
    title: true,
    chapters: chapterSelect,
  },
});
export type CourseOutline = Prisma.CourseGetPayload<
  typeof courseSelect
>;

export default defineEventHandler(async () => {
  const course = await prisma.course.findFirst(courseSelect);
  if (!course) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Meta data not found',
    });
  }

  // EsLint error, will be fixed by mr'SONG later.
  // Warning!
  // watch out for nuxt3 video instructors getting things wrong
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
