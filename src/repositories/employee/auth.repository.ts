import { IEmployeeMethods } from "../../interface/employee/employee.interface";
import { EmployeeLoginData } from "../../interface/employee/employee.types";
import EmployeeModel, { IEmployee } from "../../models/employee.model";
import FeedbackModel, { IFeedback } from "../../models/feedback.model";
import FormModel, { IForm } from "../../models/form.model";
import FeedbackRequestModel, { IFeedbackRequest } from "../../models/request.model";
import CommonBaseRepository from "../base/baseRepository";

export default class EmployeeAuthRepository extends CommonBaseRepository<{
    EmployeeModel: IEmployee,
    FeedbackRequestModel: IFeedbackRequest,
    FormModel: IForm,
    FeedbackModel: IFeedback
}> implements IEmployeeMethods {
    constructor() {
        super({
            EmployeeModel: EmployeeModel,
            FeedbackRequestModel: FeedbackRequestModel,
            FormModel: FormModel,
            FeedbackModel: FeedbackModel
        })
    }

    async employeeSignup(employeeData: Partial<IEmployee>): Promise<IEmployee> {
        return this.createData('EmployeeModel', employeeData);
    }

    async employeeLogin(employeeData: EmployeeLoginData): Promise<IEmployee | null> {
        return this.findOne('EmployeeModel', { email: employeeData.email })
    }

    async getEmployees(empId: string): Promise<IEmployee[]> {
        return this.findAll('EmployeeModel', { _id: { $ne: empId } });
    }

    async findByEmail(email: string): Promise<any> {
        return this.findOne('EmployeeModel', { email });
    }

    async findByIds(id: string): Promise<any> {
        return this.findById('EmployeeModel', id);
    }



}

