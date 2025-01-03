import { getJob } from '@/api/jenkins/getJob';
import type { Route } from './+types/downloads';
import { DownloadHero } from '@/components/downloads/hero';
import { useEffect } from 'react';
import { useStore } from '@/store/jenkins';
import { getRun } from '@/api/jenkins/getRun';

export const loader = async () => {
    const job = await getJob('NookureStaff');
    const run = await getRun('NookureStaff', job.lastBuild.number);
    return { job, run };
};

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Nookure Downloads' },
        { name: 'description', content: 'Welcome to the Nookure Studios downloads page' },
    ];
}

const DownloadPage = ({ loaderData }: Route.ComponentProps) => {
    const { setNookureStaff, setNookureStaffLastRun } = useStore();

    useEffect(() => {
        setNookureStaff(loaderData.job);
        setNookureStaffLastRun(loaderData.run);
    }, [loaderData]);

    return (
        <div className='flex flex-col justify-center items-center mt-12'>
            <DownloadHero />
        </div>
    );
};

export default DownloadPage;
