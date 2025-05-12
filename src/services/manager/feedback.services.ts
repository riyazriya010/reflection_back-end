import { IManagerFeedbackServicesMethods } from "../../interface/manager/manager.interface";
import { IFeedback } from "../../models/feedback.model";
import ManagerFeedbackRepository from "../../repositories/manager/feedback.repository";

export default class ManagerFeedbackServices implements IManagerFeedbackServicesMethods {
    private managerFeedbackRepository: ManagerFeedbackRepository
    constructor(managerFeedbackRepository: ManagerFeedbackRepository) {
        this.managerFeedbackRepository = managerFeedbackRepository
    }

    async getEmployeesFeedback(dept: string): Promise<IFeedback[] | []> {
        try {
            const departmentEmployees = await this.managerFeedbackRepository.findAllDeptEmployees(dept);
            const employeeIds = departmentEmployees.map(emp => emp._id);

            const allFeedback = await this.managerFeedbackRepository.getEmployeesFeedback();

            const response = allFeedback
                .filter((feedback: IFeedback) =>
                    employeeIds.some(id => id.equals(feedback.receiverId))
                )
                .map((f: IFeedback) => f.toObject());
                
            return response
        } catch (error: unknown) {
            throw error
        }
    }
}

const managerFeedbackRepository = new ManagerFeedbackRepository()
export const managerFeedbackServices = new ManagerFeedbackServices(managerFeedbackRepository)

