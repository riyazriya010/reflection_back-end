import { IEmployee } from "../../models/employee.model";
import { EmployeeLoginData, EmployeeSignUpData } from "./employee.types";

export interface IEmployeeMethods {
    employeeSignup(employeeData: EmployeeSignUpData): Promise<IEmployee>
    employeeLogin(employeeData: EmployeeLoginData): Promise<IEmployee | null>
}

export interface IEmployeeServiceMethods {
    employeeSignup(employeeData: EmployeeSignUpData): Promise<IEmployee>
    employeeLogin(employeeData: EmployeeLoginData): Promise<IEmployee | null>
}