import { Prisma } from '@prisma/client';

export const lessonSelect = Prisma.validator<Prisma.LessonArgs>()({
  select: {
    title: true,
    slug: true,
    number: true,
  },
});
export type LessonOutline = Prisma.LessonGetPayload<
  typeof lessonSelect
> & {
  path: string;
};

export const chapterSelect = Prisma.validator<Prisma.ChapterArgs>()({
  select: {
    title: true,
    slug: true,
    number: true,
    lessons: lessonSelect,
  },
});
export type ChapterOutline = Omit<
  Prisma.ChapterGetPayload<typeof chapterSelect>,
  'lessons'
> & {
  lessons: LessonOutline[];
};

export const courseSelect = Prisma.validator<Prisma.CourseArgs>()({
  select: {
    title: true,
    chapters: chapterSelect,
  },
});
export type CourseOutline = Omit<
  Prisma.CourseGetPayload<typeof courseSelect>,
  'chapters'
> & {
  chapters: ChapterOutline[];
};
