import { useStore } from '@/store/jenkins';
import { ResourceCard, type Resource } from './resource-card';
import NookureStaff from '@/assets/resources/nookurestaff.png';
import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Modrinth } from '@/icons/modrinth';
import { ChangeIcon } from '@/icons/change-icon';
import type { JenkinsRun } from '@/api/jenkins/getRun';

const nookureStaffResource = {
    title: 'Nookure Staff',
    description: 'The most advanced staff utils plugin made for large Minecraft servers.s',
    downloadURL: 'https://modrinth.com/plugin/staff',
    image: NookureStaff,
} as Resource;

enum DownloadFrom {
    Modrinth = 'modrinth',
    Jenkins = 'jenkins',
}

export const NookureStaffButton = () => {
    const { nookureStaff, nookureStaffLastRun } = useStore();
    const [downloadButton, setDownloadButton] = useState<string>('...');
    const [downloadFrom, setDownloadFrom] = useState<DownloadFrom | undefined>(undefined);
  
    const getDownloadFromFromLocalStorage = () => {
      const storedValue = localStorage.getItem('downloadFrom');
      if (!storedValue) return DownloadFrom.Modrinth;

      return storedValue === DownloadFrom.Modrinth ? DownloadFrom.Modrinth : DownloadFrom.Jenkins;
    };
  
    useEffect(() => {
      const savedDownloadFrom = getDownloadFromFromLocalStorage();
      setDownloadFrom(savedDownloadFrom);
    }, []);
  
    useEffect(() => {
      if (downloadFrom !== undefined) {
        localStorage.setItem('downloadFrom', downloadFrom);
      }
    }, [downloadFrom]);
  
    useEffect(() => {
      if (nookureStaff?.lastSuccessfulBuild?.number) {
        setDownloadButton(`#${nookureStaff.lastSuccessfulBuild.number}`);
      } else {
        setDownloadButton('?');
      }
    }, [nookureStaff]);

    return (
        <div className='flex items-center justify-between mt-2'>
            <ButtonGroup>
                {downloadFrom === DownloadFrom.Modrinth ? <ModrinthButton /> : <JenkinsButton lastRun={nookureStaffLastRun}/>}
                <Dropdown placement='bottom-end'>
                    <DropdownTrigger>
                        <Button
                            isIconOnly
                            color={downloadFrom === DownloadFrom.Modrinth ? 'success' : 'default'}
                            radius='full'
                        >
                            <ChangeIcon />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        aria-label='Download from'
                        className='max-w-[300px]'
                        selectionMode='single'
                        selectedKeys={downloadFrom ? [downloadFrom] : []}
                        onSelectionChange={(keys) => {
                            setDownloadFrom(keys.currentKey as DownloadFrom);
                        }}
                    >
                        <DropdownItem key={DownloadFrom.Modrinth}>Modrinth</DropdownItem>
                        <DropdownItem key={DownloadFrom.Jenkins}>Jenkins</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </ButtonGroup>
            <span
                className='h-9 w-9 bg-default rounded-full flex items-center justify-center text-default-foreground cursor-pointer'
                onClick={() => window.open(nookureStaff?.lastSuccessfulBuild.url, '_blank')}
            >
                {downloadButton}
            </span>
        </div>
    );
};

const ModrinthButton = () => {
    return (
        <Button radius='full' size='md' as='a' href={nookureStaffResource.downloadURL} color='success' target='_blank'>
            <Modrinth /> Download
        </Button>
    );
};

const JenkinsButton = ({ lastRun }: { lastRun?: JenkinsRun }) => {
    return (
        <Button radius='full' size='md' color='default' disabled={!lastRun || lastRun.artifacts.length < 1} target='_blank' as='a' href={`${lastRun?.url}artifact/${lastRun?.artifacts[0].relativePath}`}>
            Direct Download
        </Button>
    );
};

export const NookureStaffCard = () => {
    return (
        <ResourceCard
            title={nookureStaffResource.title}
            description={nookureStaffResource.description}
            downloadURL={nookureStaffResource.downloadURL}
            image={nookureStaffResource.image}
            downloadButton={<NookureStaffButton />}
        />
    );
};
