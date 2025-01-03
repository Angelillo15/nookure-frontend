export const NOOKURE_STAFF = 'NookureStaff';

import type { JenkinsJob } from '@/api/jenkins/getJob';
import type { JenkinsRun } from '@/api/jenkins/getRun';
import { create } from 'zustand';

type JenkinsStore = {
    nookureStaff: JenkinsJob | null;
    setNookureStaff: (job: JenkinsJob) => void;
    nookureStaffLastRun: JenkinsRun | undefined;
    setNookureStaffLastRun: (run: JenkinsRun) => void;
};

export const useStore = create<JenkinsStore>()((set) => ({
    nookureStaff: null,
    setNookureStaff: (job) => set({ nookureStaff: job }),
    nookureStaffLastRun: undefined,
    setNookureStaffLastRun: (run) => set({ nookureStaffLastRun: run }),
}));
