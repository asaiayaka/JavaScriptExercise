export function parseJSONSafe(input) {
    try {
        const data = JSON.parse(input);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}