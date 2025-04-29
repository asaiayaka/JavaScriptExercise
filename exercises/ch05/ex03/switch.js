export function monthSwitch(month) {
    switch(month) {
        case "Jan":
        case "Mar":
        case "May":
        case "Jul":
        case "Aug":
        case "Oct":
        case "Dec":
            return true;
        default:
            return false;
    }
}