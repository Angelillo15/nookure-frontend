import { ContentContainer } from '../content-container';
import { heroContainerWidth, HeroDescription, HeroTitle } from '../hero';
import { useStore } from '@/store/jenkins';
import { useEffect } from 'react';
import { ResourceCard, type Resource } from './resource-card';
import { NookureStaffCard } from './nookure-staff-card';

import NookTheme from '@/assets/resources/nooktheme.png';
import IceMinecraftTheme from '@/assets/resources/ice.png';
import MinecraftPurpleTheme from '@/assets/resources/purple.png';

const resources = [
    {
        title: 'NookTheme',
        description: 'Our most popular theme for Pterodactyl Panel, simple, beatiful and free.',
        downloadURL: 'https://github.com/Nookure/NookTheme/#installation',
        image: NookTheme,
    },
    {
        title: 'Ice Minecraft Theme',
        description: 'A cool and refreshing theme for Pterodactyl Panel, perfect for Minecraft servers.',
        downloadURL: 'https://builtbybit.com/resources/iceminecrafttheme-pterodactyl-theme.26274/',
        image: IceMinecraftTheme,
    },
    {
        title: 'Minecraft Purple Theme',
        description: 'A purple theme for Pterodactyl Panel, perfect for Minecraft servers.',
        downloadURL: 'https://pterodactyl-resources.com/resources/resource/43/',
        image: MinecraftPurpleTheme,
    }
] as Resource[];

export const DownloadHero = () => {
    const { nookureStaff } = useStore();

    useEffect(() => {
        console.log(nookureStaff);
    }, [nookureStaff]);

    return (
        <>
            <ContentContainer className='w-full mt-12 vt-name-[introduction]'>
                <div>
                    <HeroTitle>Welcome to Nookure Downloads</HeroTitle>
                    <HeroDescription>
                        Here you can find all the latest downloads for Nookure Products. From the latest version of the
                        Nookure app to the latest version of the Nookure API, you can find it all here.
                    </HeroDescription>
                </div>
            </ContentContainer>
            <div className={`${heroContainerWidth} mt-6 w-full`}>
                <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3'>
                    <NookureStaffCard />
                    {resources.map((resource, index) => (
                        <ResourceCard
                            key={index}
                            title={resource.title}
                            description={resource.description}
                            downloadURL={resource.downloadURL}
                            image={resource.image}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
