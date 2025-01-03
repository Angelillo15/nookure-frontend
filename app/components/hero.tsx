import { BoltIcon } from '@/icons/bolt';
import { CubeIcon } from '@/icons/cube';
import { DocumentationIcon } from '@/icons/documentation';
import { DownloadIcon } from '@/icons/download';
import { ExternalLinkIcon } from '@/icons/external-link';
import { Github } from '@/icons/github';
import { ClosedLockIcon } from '@/icons/lock-closed';
import { PresentationChartLine } from '@/icons/presentation-chart-line';
import { ServerIcon } from '@/icons/server';
import { WrenchScreeDriver } from '@/icons/wrench-screewdriver';
import { Button, Card, CardBody } from '@nextui-org/react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { ContentContainer } from './content-container';

export const heroContainerWidth = 'lg:max-w-[60%] max-w-full';

interface HeroCardProps {
    title: string;
    description: string;
    icon: ReactNode;
}

export const cards = [
    {
        title: 'Minecraft',
        icon: <CubeIcon />,
        description:
            'We have a lot of experience developing plugins for Minecraft servers from single servers to large networks with multiple proxies and instances. Some of our plugins are open-source and available on our GitHub.',
    },
    {
        title: 'Pterodactyl',
        icon: <ServerIcon />,
        description: 'We are leading the development of the Open Source themes for Pterodactyl Panel. We have a lot of experience with the Pterodactyl Panel and Wings.',
    },
    {
        title: 'Optimization',
        icon: <WrenchScreeDriver />,
        description:
            'We have a lot of experience making software more efficient and faster. We implement the best practices to make sure our software is as optimized as possible.',
    },
    {
        title: 'Scalability',
        icon: <PresentationChartLine />,
        description:
            'The software we develop is designed to be scalable and to handle a large number of users. We use things like Redis and our own TCP protocol to make sure our software can run on multiple servers and instances all synchronized.',
    },
    {
        title: 'Constant Updates',
        icon: <BoltIcon />,
        description:
            'We are constantly updating our software to make sure it is up to date with the latest technologies and to make sure it is as efficient as possible. We are always looking for ways to improve our software and make it better.',
    },
    {
        title: 'Security',
        icon: <ClosedLockIcon />,
        description:
            'We ensure that our software is secure and safe to use. We implement the best practices as encryptation to make sure our software is as secure as possible.',
    }
] as HeroCardProps[];

export const HeroCard = ({ title, description, icon }: HeroCardProps) => (
    <Card radius='none' className='bg-black/70'>
        <CardBody>
            <div className='flex items-center gap-2 p-2'>
                <div>
                    <span className='font-bold text-lg flex items-center gap-2'>
                        <div className='bg-default rounded-full p-2 block text-black'>{icon}</div>
                        <h3>{title}</h3>
                    </span>
                    <p className='mt-2'>{description}</p>
                </div>
            </div>
        </CardBody>
    </Card>
);

export const Hero = () => {
    const navigate = useNavigate();

    const openLink = (url: string, external: boolean = false) => {
        if (external) {
            window.open(url, '_blank');
        } else {
            navigate(url, { viewTransition: true });
        }
    };

    return (
        <>
            <div className='flex flex-col justify-center items-center md:mt-32 mt-12'>
                <ContentContainer className='flex flex-col vt-name-[introduction]'>
                    <div>
                        <h1 className='lg:text-6xl md:text-5xl sm:text-4xl text-xl font-medium text-center'>
                            Welcome to Nookure Studios
                        </h1>
                        <h2 className='font-mono sm:text-medium md:text-lg lg:text-xl mt-4 text-center text-stone-500'>
                            Nookure is an open-source organization focused on developing software solutions for
                            Minecraft and Pterodactyl, with a strong emphasis on performance optimization, scalability,
                            and efficiency.
                        </h2>
                    </div>
                    <div className='flex justify-center mt-4 gap-4 flex-wrap'>
                        <Button radius='full' size='md' onPress={() => openLink('/downloads')}>
                            Downloads <DownloadIcon />
                        </Button>
                        <Button radius='full' size='md' onPress={() => openLink('https://docs.nookure.com/', true)}>
                            <DocumentationIcon /> Docs <ExternalLinkIcon />
                        </Button>
                        <Button radius='full' size='md' onPress={() => openLink('https://github.com/Nookure', true)}>
                            <Github /> Github <ExternalLinkIcon />
                        </Button>
                    </div>
                </ContentContainer>
                <div className={`${heroContainerWidth} mt-6 w-full`}>
                    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3'>
                        {cards.map((card, index) => (
                            <HeroCard key={index} title={card.title} description={card.description} icon={card.icon} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
