import type { Course } from '../types/course';
import { fetcher } from './fetcher';

type CoursesRes = {
	courses: Array<{
		id: string;
		name: {
			subject: string;
			code: string;
			title: string;
		};
	}>;
};

export const getCourses = (params: { year: number; term: string }) => {
	return fetcher.get<CoursesRes>('/courses', { params });
};

export const getCourse = async ({ id }: { id: string }) => {
	return fetcher.get<Course>(`/course/${id}`);
};