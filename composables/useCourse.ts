import { CourseOutline } from '~/domains/course.domain';

export default async () => useFetchWithCache<CourseOutline>('/api/course/meta');
