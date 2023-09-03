export default defineNuxtRouteMiddleware(({ path }) => {
  const navigationHistory = useLocalStorage('history', []);
  navigationHistory.value.push(path as never);

  console.log(`Navigation history: ${navigationHistory.value.join('\n')}`);
  return undefined;
});
