import React from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Button,
} from '@nextui-org/react';
import { NookureIcon } from '@/icons/nookure-icon';
import { Github } from '@/icons/github';
import { DiscordIcon } from '@/icons/discord';

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        'Profile',
        'Dashboard',
        'Activity',
        'Analytics',
        'System',
        'Deployments',
        'My Settings',
        'Team Settings',
        'Help & Feedback',
        'Log Out',
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isBlurred={false}>
            <NavbarContent>
                <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className='sm:hidden' />
                <NavbarBrand>
                    <NookureIcon className='w-6 h-6 mr-2' />
                    <p className='font-bold text-inherit font-mono'>Nookure</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className='hidden sm:flex gap-4 font-mono' justify='center'>
                <NavbarItem>
                    <Link color='foreground' href='#'>
                        /
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link color='foreground' aria-current='page' href='#'>
                        /downloads
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color='foreground' href='#'>
                        <Github className='mr-1'/> /nookure
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color='foreground' href='#'>
                        <DiscordIcon className='mr-1'/> /nookure
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify='end'>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className='w-full'
                            color={index === 2 ? 'primary' : index === menuItems.length - 1 ? 'danger' : 'foreground'}
                            href='#'
                            size='lg'
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
