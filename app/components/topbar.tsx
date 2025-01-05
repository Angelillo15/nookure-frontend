import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-router';
import LoadingBar from 'react-top-loading-bar';

interface TopBarProps {
    color?: string;
    height?: string;
    transitionDuration?: string;
}

const TopBar = ({ color = '#ffffff', height = '2px', transitionDuration = '1.3s' }: TopBarProps) => {
    const navigation = useNavigation();
    const [progress, setProgress] = useState(0);
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        let progressInterval: NodeJS.Timeout;

        if (navigation.state === 'loading') {
            setIsNavigating(true);
            setProgress(10);
            progressInterval = setInterval(() => {
                setProgress((prev) => (prev < 90 ? prev + Math.random() * 10 : prev));
            }, 200);
        } else if (navigation.state === 'idle' && isNavigating) {
            setProgress(100);
            const resetTimer = setTimeout(() => {
                setProgress(0);
                setIsNavigating(false);
            }, 500);

            return () => clearTimeout(resetTimer);
        }

        return () => clearInterval(progressInterval);
    }, [navigation.state, isNavigating]);

    return <LoadingBar color={color} progress={progress} onLoaderFinished={() => setProgress(0)} />;
};

export default TopBar;
