import '@fontsource-variable/outfit';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { Toaster } from 'sonner';

import { App } from './App';
import { useEnrolledCourses } from './data/enrolled-courses';
import './i18n';
import './index.css';
import { queryClient } from './lib/query';

// MSW
const enableMocking = async () => {
	if (!import.meta.env.DEV) return;
	const { worker } = await import('./mocks/browser');
	return worker.start({
		onUnhandledRequest(request, print) {
			if (request.url.includes('/api')) {
				return print.warning();
			}
		},
	});
};
await enableMocking();

// Zustand
if (import.meta.env.DEV) {
	mountStoreDevtool('Courses', useEnrolledCourses);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<NextUIProvider>
				<Toaster richColors position="top-center" />
				<App />
			</NextUIProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);
