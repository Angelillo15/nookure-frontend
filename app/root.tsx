import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useNavigate, useNavigation } from 'react-router';

import type { Route } from './+types/root';
import stylesheet from './app.css?url';
import { NextUIProvider } from '@nextui-org/react';
import { NookureStaffBaner } from '@/components/nookure-staff-banner';
import NookureNavbar from './components/navbar';
import { Footer } from './components/footer';
import TopBar from './components/topbar';

export const links: Route.LinksFunction = () => [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
    },
    { rel: 'stylesheet', href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
    const navigation = useNavigation();
    const navigate = useNavigate();
    const navigateView = (view: string) => navigate(view, { viewTransition: true });

    return (
        <html lang='en' className='dark'>
            <head>
                <meta charSet='utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
                <Meta />
                <Links />
            </head>
            <body>
                <div className='fixed left-0 top-0 -z-10 h-full w-full'>
                    <div className='relative h-full w-full bg-black'>
                        <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'></div>
                        <div className='absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]'></div>
                    </div>
                </div>

                <NextUIProvider navigate={navigateView} className='font-geist bg-transparent'>
                    <NookureStaffBaner />
                    <NookureNavbar />
                    <TopBar />
                    {children}
                    <Footer />
                    <ScrollRestoration />
                    <Scripts />
                </NextUIProvider>
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = 'Oops!';
    let details = 'An unexpected error occurred.';
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? '404' : 'Error';
        details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className='pt-16 p-4 container mx-auto'>
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className='w-full p-4 overflow-x-auto'>
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}
