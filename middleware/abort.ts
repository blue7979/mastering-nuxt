export default defineNuxtRouteMiddleware(async (to) => {
  const course = await useCourse();

  const chapter = course.value.chapters.find(
    (c) => c.slug === to.params.chapterSlug,
  );

  if (!chapter) {
    return abortNavigation(createError({
      statusCode: 404,
      message: 'Chapter not found',
    }));
  }

  const lesson = chapter.lessons.find(
    (l) => l.slug === to.params.lessonSlug,
  );

  if (!lesson) {
    return abortNavigation(createError({
      statusCode: 404,
      message: 'Lesson not found',
    }));
  }

  return undefined;
});
