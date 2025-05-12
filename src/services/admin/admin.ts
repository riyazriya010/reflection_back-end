import { AdminServicesMethods } from "../../interface/admin/admin.interface"
import { createFormService } from "../../interface/admin/admin.types"
import { IForm } from "../../models/form.model"
import AdminRepository from "../../repositories/admin/admin"

export default class AdminServices implements AdminServicesMethods {
    private adminRepository: AdminRepository

    constructor(adminRepository: AdminRepository) {
        this.adminRepository = adminRepository
    }

    async createForm(formData: any): Promise<IForm> {
        try {
            const validFieldTypes = ['text', 'textarea', 'radio', 'checkbox', 'select', 'rating', 'scale'];

            for (const field of formData.fields) {
                if (!validFieldTypes.includes(field.type)) {
                    throw new Error(`Invalid field type: ${field.type}`);
                }

                if (['radio', 'checkbox', 'select'].includes(field.type) &&
                    (!field.options || field.options.length === 0)) {
                    throw new Error(`${field.type} fields require options`);
                }
            }

            const response = await this.adminRepository.createForm(formData);
            return response

        } catch (error: unknown) {
            throw error
        }
    }

}

const adminRepository = new AdminRepository()
export const adminServices = new AdminServices(adminRepository)

