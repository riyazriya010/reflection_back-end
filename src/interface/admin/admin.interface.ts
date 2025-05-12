import { IForm } from "../../models/form.model";
import { createFormRepo, createFormService } from "./admin.types";

export interface AdminMethods {
    createForm(formData: any): Promise<IForm>
}


export interface AdminServicesMethods {
    createForm(formData: any): Promise<IForm>
}