"use client";

import { useContext, useEffect } from 'react';
import { TrackerContext } from './openTracker';

const TrackerClientComponent = ({ children }) => {
    const { initTracker, startTracking } = useContext(TrackerContext)
    useEffect(() => {
        initTracker();
        startTracking();
    }, [initTracker, startTracking]); // Empty dependency array means this effect runs once on mount

    return <>
        {children}
    </>
};

export default TrackerClientComponent;