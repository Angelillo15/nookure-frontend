import { useEffect } from 'react';

import emitter from '@/libs/emitter';
import { useLocation } from 'react-router';
import { Modrinth } from '@/icons/modrinth';

const hideOnPaths: string[] = [];

export const NookureStaffBaner = () => {
    const pathname = useLocation();
    const shouldBeVisible = !hideOnPaths.some((path) => pathname.pathname.includes(path));

    useEffect(() => {
        if (!shouldBeVisible) return;

        // listen to scroll event, dispatch an event when scroll is at the top < 48 px
        const handleScroll = () => {
            if (window.scrollY < 48) {
                emitter.emit('nookureStaffBannerVisibilityChange', 'visible');
            } else {
                emitter.emit('nookureStaffBannerVisibilityChange', 'hidden');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [shouldBeVisible]);

    if (!shouldBeVisible) return null;

    return (
        <div className='relative z-50 isolate flex items-center overflow-hidden bg-black border-b-1 border-divider px-6 py-2 sm:px-3.5 sm:before:flex-1 vt-name-[nookure-staff-banner]'>
            <div className='flex w-full items-center justify-between md:justify-center gap-x-3'>
                <a
                    className='text-small flex items-end sm:text-[0.93rem] text-foreground hover:opacity-80 transition-opacity'
                    href='https://modrinth.com/plugin/staff'
                    rel='noopener noreferrer'
                    target='_blank'
                >
                    <span aria-label='rocket' className='hidden md:block' role='img'>
                        🚀
                    </span>
                    Nookure Staff now available on &nbsp; <Modrinth className='text-green-400 relative top-[-3px] mr-1'/>
                    <span
                        className={
                            'bg-gradient-to-r from-green-300 via-green-500 to-green-600 inline-block text-transparent bg-clip-text'
                        }
                    >
                        Modrinth
                    </span>
                </a>
            </div>
        </div>
    );
};
