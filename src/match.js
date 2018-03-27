

/**
 * Matches if the given bytes match a specific byte pattern.
 * 
 * @param {*} pattern 
 * @param {*} bytes 
 */
export const matchesPattern = pattern => bytes => {
    if (pattern.length > bytes.length) return false;
    const bytesToMatch = bytes.slice(0, pattern.length);
    for (let i = 0; i < bytesToMatch.length; i++) {
        const patternByte = pattern[i];
        if (patternByte === '?') continue;
        if (patternByte !== bytesToMatch[i]) return false;
    }
    return true;
}
export default matchesPattern;