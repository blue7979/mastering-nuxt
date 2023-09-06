import { StorageSerializers } from '@vueuse/core';

export default async <T>(url: string) => {
  const cashed = useSessionStorage<T>(url, null, {
    serializer: StorageSerializers.object,
  });

  if (!cashed.value) {
    const { data, error } = await useFetch<T>(url, {
      headers: useRequestHeaders(['cookie']),
    });

    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not fetch data from ${url}`,
      });
    }
    cashed.value = data.value as T;
  } else {
    console.log(`Getting value from cache for ${url}`);
  }

  return cashed;
};
