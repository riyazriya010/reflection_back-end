import { AdminMethods } from "../../interface/admin/admin.interface"
import { createFormRepo } from "../../interface/admin/admin.types"
import FormModel, { IForm } from "../../models/form.model"
import CommonBaseRepository from "../base/baseRepository"

export default class AdminRepository extends CommonBaseRepository<{
    FormModel: IForm
}> implements AdminMethods {
    constructor() {
        super({
            FormModel: FormModel
        })
    }

    async createForm(formData: any): Promise<IForm> {
        try {
        const newForm = new FormModel({
            title: formData.title,
            description: formData.description,
            fields: formData.fields.map((field: any) => ({
                type: field.type,
                label: field.label,
                required: field.required || false,
                anonymous: field.anonymous || false,
                options: field.options,
                min: field.min,
                max: field.max,
                step: field.step
            })),
            createdBy: formData.createdBy
        });

        return await newForm.save();
    } catch (error) {
        console.error('Repository error creating form:', error);
        throw error;
    }
    }

}