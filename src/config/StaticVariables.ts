// const currentDate: Date = new Date();

import { Dimensions } from "react-native";

// const preIdleDate: string = currentDate.toISOString().split('T')[0] + 'T';
export const idleTime: string = "11:10:00";
// export const Idle_Date: Date = new Date(preIdleDate + idleTime);
export const weeks: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const { width } = Dimensions.get("window");
export const cellWidth = (width - 52) / 7;