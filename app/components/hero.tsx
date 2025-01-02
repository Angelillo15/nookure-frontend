import { DocumentationIcon } from '@/icons/documentation';
import { DownloadIcon } from '@/icons/download';
import { ExternalLinkIcon } from '@/icons/external-link';
import { Github } from '@/icons/github';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router';

export const Hero = () => {
    const navigate = useNavigate();

    const openLink = (url: string, external: boolean = false) => {
        if (external) {
            window.open(url, '_blank');
        } else {
            navigate(url);
        }
    };

    return (
        <div className='flex justify-center items-center mt-60'>
            <div className='flex flex-col bg-black/70 p-10'>
                <h1 className='font-geist text-6xl font-medium'>Welcome to Nookure Studios page</h1>
                <div className='flex justify-center mt-4 gap-4'>
                    <Button radius='full' size='md' onPress={() => openLink("/downloads")}>
                        Downloads <DownloadIcon />
                    </Button>
                    <Button radius='full' size='md' onPress={() => openLink("https://docs.nookure.com/", true)}>
                        <DocumentationIcon/> Documentation <ExternalLinkIcon />
                    </Button>
                    <Button radius='full' size='md' onPress={() => openLink("https://github.com/Nookure", true)}>
                        <Github/> Github <ExternalLinkIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
};
