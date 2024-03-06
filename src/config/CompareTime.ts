import { idleTime } from "./StaticVariables";

export const compareTimeWithCurrent = (entryTime: string): string => {
    if (entryTime > idleTime) {
        return 'false';
    } else {
        return 'true';
    }
};

