import { PrismaClient } from '@prisma/client';
import { CourseOutline, courseSelect } from '~/domains/course.domain';

const prisma = new PrismaClient();

export default defineEventHandler(
  async (): Promise<CourseOutline> => {
    const outline = await prisma.course.findFirst(
      courseSelect,
    );

    if (!outline) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Course not found',
      });
    }

    const chapters = outline.chapters.map((chapter) => ({
      ...chapter,
      lessons: chapter.lessons.map((lesson) => ({
        ...lesson,
        path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
      })),
    }));

    return {
      ...outline,
      chapters,
    };
  },
);
