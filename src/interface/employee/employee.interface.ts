import { IEmployee } from "../../models/employee.model";
import { IForm } from "../../models/form.model";
import { IFeedbackRequest } from "../../models/request.model";
import { EmployeeLoginData, EmployeeRequest, EmployeerequestFeedback, EmployeeSignUpData } from "./employee.types";


/// Authentication Methods

export interface IEmployeeMethods {
    employeeSignup(employeeData: EmployeeSignUpData): Promise<IEmployee>
    employeeLogin(employeeData: EmployeeLoginData): Promise<IEmployee | null>
    getEmployees(empId: string): Promise<IEmployee[] | []>
    
}

export interface IEmployeeServiceMethods {
    employeeSignup(employeeData: EmployeeSignUpData): Promise<IEmployee>
    employeeLogin(employeeData: EmployeeLoginData): Promise<IEmployee | null>
    getEmployees(empId: string): Promise<IEmployee[] | []>
    
}


/////// Feedback Methods

export interface IFeedBackMethods {
    requestFeedback(data: EmployeeRequest): Promise<IFeedbackRequest | null>
    requestedFeedback(senderId: string): Promise<IFeedbackRequest[] | null>
    getOthersRequested(receiverId: string, status?: string): Promise<IFeedbackRequest[] | null>
    getAllForm(): Promise<IForm[] | null>
    submitFeedback(data: any): Promise<any>
}



export interface IFeedbackServiceMethods {
    requestFeedback(data: EmployeerequestFeedback): Promise<IFeedbackRequest | null>
    requestedFeedback(senderId: string): Promise<IFeedbackRequest[] | null>
    getAllForm(): Promise<IForm[] | null>
    submitFeedback(data: any): Promise<any>
    getOthersRequested(receiverId: string, status?: string): Promise<IFeedbackRequest[] | null>
}