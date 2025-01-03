import { NookureIcon } from '@/icons/nookure-icon';
import { ContentContainer } from './content-container';
import { Github } from '@/icons/github';
import { DiscordIcon } from '@/icons/discord';

export const Footer = () => {
    return (
        <footer className='flex justify-center'>
            <ContentContainer className='w-full vt-name-[footer] mt-4'>
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        <span className='flex justify-center items-center gap-2 text-xl font-mo'>
                            <NookureIcon className='w-6 h-6' /> Nookure Studios
                        </span>
                    </div>
                    <div>
                        <div className='flex gap-2'>
                            <a href='https://github.com/Nookure' target='_blank'>
                                <Github className='w-6 h-6' />
                            </a>
                            <a href='https://discord.nookure.com' target='_blank'>
                                <DiscordIcon className='w-6 h-6' />
                            </a>
                        </div>
                    </div>
                </div>
                <hr className='border-t border-stone-500 my-4' />
                <div className='text-center'>
                    <p className='text-sm text-stone-500'>
                        &copy; {new Date().getFullYear()} Nookure Studios. All rights reserved.
                    </p>
                </div>
            </ContentContainer>
        </footer>
    );
};
