export type createFormService = {
    title: string;
    description: string;
    fields: Array<{
        type: string;
        label: string;
        required: boolean;
        anonymous: boolean;
        options?: string[];
        min?: number;
        max?: number;
        step?: number;
    }>;
}

export type createFormRepo = {
    title: string;
    description: string;
    fields: any[];
    createdBy: string;
}