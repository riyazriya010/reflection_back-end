import { IEmployeeMethods } from "../../interface/employee/employee.interface";
import { EmployeeLoginData, EmployeeSignUpData } from "../../interface/employee/employee.types";
import EmployeeModel, { IEmployee } from "../../models/employee.model";
import CommonBaseRepository from "../base/baseRepository";

export default class EmployeeAuthRepository extends CommonBaseRepository<{
    EmployeeModel: IEmployee
}> implements IEmployeeMethods {
    constructor() {
        super({
            EmployeeModel: EmployeeModel
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

    async findByEmail(email: string): Promise<IEmployee | null> {
        return this.findOne('EmployeeModel', { email });
    }


}
