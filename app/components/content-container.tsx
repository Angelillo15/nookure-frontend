import type { HTMLAttributes, ReactNode } from 'react';

export const ContentContainer = ({
    children,
    className,
    ...props
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={`bg-black/70 p-10 lg:max-w-[60%] ${className}`} {...props}>
            {children}
        </div>
    );
};
