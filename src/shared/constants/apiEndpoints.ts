export const apiEndpoints = Object.freeze({
    ACCESS_TOKEN: "/token",
    XSRF_TOKEN: "/xsrftoken",

    // files
    FILE_UPLOAD: "/mediafile/singlefile",
    FILES_UPLOAD: "/mediafile/severalfiles",
    FILES_UPLOAD_ATTACH: "/mediafile/attach",

    //files-server-api
    FILE_SERVER_LIST: "/mediafile/list",
    FILE_SERVER_FILE: "/mediafile",
    FILE_SERVER_UPLOAD_FILE: "/mediafile/singlefile",
    FILE_SERVER_UPLOAD_FILES: "/mediafile/severalfiles",
    FILE_SERVER_MOVE_FILES: "/mediafile/move",
    FILE_SERVER_FOLDER: "/folder",
});
