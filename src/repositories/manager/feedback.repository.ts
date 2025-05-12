import { IManagerFeedbackMethods } from "../../interface/manager/manager.interface"
import EmployeeModel, { IEmployee } from "../../models/employee.model"
import FeedbackModel, { IFeedback } from "../../models/feedback.model"
import CommonBaseRepository from "../base/baseRepository"

export default class ManagerFeedbackRepository extends CommonBaseRepository<{
    FeedbackModel: IFeedback,
    EmployeeModel: IEmployee
}> implements IManagerFeedbackMethods {
    constructor() {
        super({
            FeedbackModel: FeedbackModel,
            EmployeeModel: EmployeeModel
        })
    }

    async findAllDeptEmployees(department: string): Promise<IEmployee[]> {
        return this.findAll('EmployeeModel', { department });
    }

    async getEmployeesFeedback(): Promise<IFeedback[] | []> {
        return this.findAll('FeedbackModel')
    }
}