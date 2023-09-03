export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();

  if (user.value || to.params.chapterSlug === '1-chapter-1') {
    return undefined;
  }
  return navigateTo('/login');
});
