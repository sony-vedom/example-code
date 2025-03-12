/**
 * Определяет реальный формат OGG-файла, обходя ошибки Firefox.
 * Firefox распознаёт `audio/ogg` как `video/ogg`,
 * поэтому функция читает заголовок файла (magic bytes) и точно определяет тип.
 */

export const checkRealOggFormat = (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file.slice(0, 40));

        reader.onload = function (event) {
            const result = event.target?.result;
            if (!result || !(result instanceof ArrayBuffer)) return resolve("unknown");

            const arr = new Uint8Array(result);

            const oggHeader = new TextDecoder().decode(arr.slice(0, 4));
            if (oggHeader !== "OggS") return resolve(file.type || null);

            // Определяем, с какого байта начинается строка кодека
            // Если первый байт (arr[28]) не буква (ASCII < 32), пропускаем его
            let startIndex = 28;
            if (arr[startIndex] < 32) startIndex++;

            const formatBytes = new TextDecoder().decode(arr.slice(startIndex, startIndex + 6));

            if (formatBytes.startsWith("vorb")) {
                resolve("audio/ogg");
            } else if (formatBytes.startsWith("OpusH")) {
                resolve("audio/ogg");
            } else if (formatBytes.startsWith("theor")) {
                resolve("video/ogg");
            } else {
                resolve("unknown ogg format");
            }
        };
    });
};
