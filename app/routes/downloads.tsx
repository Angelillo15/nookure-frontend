import { ContentContainer } from '@/components/content-container';
import type { Route } from './+types/downloads';

export function meta({}: Route.MetaArgs) {
    return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export default function Home() {
    return (
        <div className='flex flex-col justify-center items-center mt-12'>
            <ContentContainer className='vt-name-[introduction] w-full'>
                <h1>Downloads</h1>
            </ContentContainer>
        </div>
    );
}
