export type FileStorageContent = {
    id: string;
    url: string;
    size: number;
    status: number; // todo: должно быть перечисление, но на сервере нет информации
    type: number; // todo: должно быть перечисление, но на сервере нет информации
    isOptmized: boolean;
    createdAt: string;
    originalFileName: string;
    transformation: number; // todo: не понимаю, за что отвечает параметр
    transformationString: null; // todo: не понимаю, за что отвечает параметр
    parent: null | string; // todo: подозреваю, что здесь идентификатор
    subFiles: FileStorageContent[];
};
