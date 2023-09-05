import { CourseMeta } from '~/types/Course';

export default async () => useFetchWithCache<CourseMeta>('/api/course/meta');
