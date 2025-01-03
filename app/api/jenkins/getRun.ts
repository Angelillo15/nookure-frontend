const URL = import.meta.env.VITE_JENKINS_URL;

export interface JenkinsRun {
    _class: string;
    number: number;
    url: string;
    building: boolean;
    result: string;
    timestamp: number;
    duration: number;
    estimatedDuration: number;
    artifacts: JenkinsArtifact[];
}

export interface JenkinsArtifact {
    displayPath: string;
    fileName: string;
    relativePath: string;
}

export const getRun = async (job: string, run: number): Promise<JenkinsRun> => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}/job/${job}/${run}/api/json`)
            .then((res) => res.json())
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
