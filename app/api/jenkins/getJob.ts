const URL = import.meta.env.VITE_JENKINS_URL;

export interface JenkinsJobBuild {
    '_class': string;
    number: number;
    url: string;
}

export interface JenkinsJob {
    displayName: string;
    displayNameOrNull?: string;
    fullDisplayName: string;
    fullName: string;
    url: string;
    buildable: boolean;
    builds: JenkinsJobBuild[];
    lastBuild: JenkinsJobBuild;
    lastSuccessfulBuild: JenkinsJobBuild;
}


export const getJob = async (job: string): Promise<JenkinsJob> => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}/job/${job}/api/json`)
            .then((res) => res.json())
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};