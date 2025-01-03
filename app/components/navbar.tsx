import React, { useEffect, useState, type ReactNode } from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
} from '@nextui-org/react';
import { NookureIcon } from '@/icons/nookure-icon';
import { Github } from '@/icons/github';
import { DiscordIcon } from '@/icons/discord';
import { useLocation, useNavigate } from 'react-router';

interface NavItem {
    url: string;
    external?: boolean;
    label: string;
    icon?: ReactNode;
}

const navMenu: NavItem[] = [
    {
        url: '/',
        label: '/home',
    },
    {
        url: '/downloads',
        label: '/downloads',
    },
    {
        url: 'https://github.com/Nookure',
        label: '/github',
        external: true,
        icon: <Github />,
    },
    {
        url: 'https://discord.nookure.com/',
        label: '/discord',
        external: true,
        icon: <DiscordIcon />,
    },
];

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigation = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen} isBlurred={false} className='vt-name-[navbar]'>
            <NavbarContent>
                <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className='sm:hidden' />
                <NavbarBrand onClick={() => navigation('/', { viewTransition: true })} className='cursor-pointer'>
                    <NookureIcon className='w-6 h-6 mr-2' />
                    <p className='font-bold text-inherit font-mono'>Nookure</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className='hidden sm:flex gap-4 font-mono' justify='center'>
                {navMenu.map((item, index) => (
                    <NavbarItem key={`${item.url}-${index}`}>
                        <Link
                            color='foreground'
                            className='flex items-center'
                            href={item.url}
                            target={item.external ? '_blank' : undefined}
                        >
                            {item.icon && <span className='mr-1'>{item.icon}</span>}
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify='end' />
            <NavbarMenu>
                <NavbarMenuItem>Items:</NavbarMenuItem>
                {navMenu.map((item, index) => (
                    <NavbarMenuItem key={`${item.url}-${index}`}>
                        <Link
                            color='foreground'
                            className='flex items-center'
                            href={item.external ? item.url : undefined}
                            target={item.external ? '_blank' : undefined}
                            onPress={() => {
                                
                                setTimeout(() => navigation(item.url, { viewTransition: true }), 100);
                            }}
                        >
                            {item.icon && <span className='mr-1'>{item.icon}</span>}
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
