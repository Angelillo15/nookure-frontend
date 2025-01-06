import { DownloadIcon } from '@/icons/download';
import { Button, Card, CardBody } from '@nextui-org/react';
import type { ReactNode } from 'react';

export interface Resource {
    title: string;
    image: string;
    description: string;
    downloadURL: string;
    downloadButton?: ReactNode;
}

export const ResourceCard = ({ title, description, downloadURL, image, downloadButton }: Resource) => {
    return (
        <Card radius='none' className='bg-black/70'>
            <CardBody>
                <div>
                    <img src={image} alt={title} className='aspect-video object-cover' />
                </div>
                <div className='flex items-center gap-2 p-2'>
                    <div>
                        <div>
                            <h3 className='text-lg font-bold'>{title}</h3>
                        </div>
                        <p>{description}</p>
                        {downloadButton ? (
                            downloadButton
                        ) : (
                            <>
                                <Button
                                    radius='full'
                                    size='md'
                                    as='a'
                                    href={downloadURL}
                                    target='_blank'
                                    className='mt-2'
                                >
                                    Download <DownloadIcon />
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};
