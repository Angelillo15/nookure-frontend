import { Hero } from '@/components/hero';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
    return [{ title: 'Nookure Studios' }, { name: 'description', content: 'Welcome to Nookure Studios homepage' }];
}

export default function Home() {
    return (
        <>
            <Hero />
        </>
    );
}
