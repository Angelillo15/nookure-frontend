import { DocumentationIcon } from '@/icons/documentation';
import { DownloadIcon } from '@/icons/download';
import { ExternalLinkIcon } from '@/icons/external-link';
import { Github } from '@/icons/github';
import { Button, Card, CardBody } from '@nextui-org/react';
import { maxHeaderSize } from 'http';
import type React from 'react';
import { useNavigate } from 'react-router';

export const heroContainerWidth = 'lg:max-w-[60%] max-w-full';

export interface feature {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

export const Hero = () => {
    const navigate = useNavigate();
    const cards = ['Minecraft', 'Pterodactyl', 'Optimization', 'Scalability', 'Efficiency'];

    const openLink = (url: string, external: boolean = false) => {
        if (external) {
            window.open(url, '_blank');
        } else {
            navigate(url, { viewTransition: true });
        }
    };

    return (
        <>
            <div className='flex flex-col justify-center items-center mt-32'>
                <div className='flex flex-col bg-black/70 p-10 lg:max-w-[60%]'>
                    <div>
                        <h1 className='lg:text-6xl md:text-5xl sm:text-4xl text-xl font-medium text-center'>
                            Welcome to Nookure Studios page
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
                </div>
                <div className={`${heroContainerWidth} mt-6 w-full`}>
                    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3'>
                        {cards.map((card, index) => (
                            <Card key={index} radius='none' className='bg-black/70'>
                                <CardBody>
                                    <h3 className='text-lg font-medium'>{card}</h3>
                                    <p className='text-sm mt-2'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, incidunt
                                        asperiores quam doloremque pariatur delectus ut quibusdam nulla consequatur ad
                                        alias earum obcaecati. Quod, voluptate quis dolorem error tenetur temporibus?
                                    </p>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
