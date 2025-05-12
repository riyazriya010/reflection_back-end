import { response } from "express";
import { IEmployeeServiceMethods } from "../../interface/employee/employee.interface";
import { EmployeeLoginData, EmployeerequestFeedback, EmployeeSignUpData } from "../../interface/employee/employee.types";
import { IEmployee } from "../../models/employee.model";
import EmployeeAuthRepository from "../../repositories/employee/auth.repository";
import bcrypt from "bcrypt"
import { IFeedbackRequest } from "../../models/request.model";
import mongoose from "mongoose";
import { IForm } from "../../models/form.model";


export default class EmployeeAuthServices implements IEmployeeServiceMethods {
    private employeeAuthRepository: EmployeeAuthRepository

    constructor(employeeAuthRepository: EmployeeAuthRepository) {
        this.employeeAuthRepository = employeeAuthRepository
    }

    async employeeSignup(employeeData: EmployeeSignUpData): Promise<IEmployee> {
        try {
            // Find Employee Already Exist With Email
            const ExistEmployee = await this.employeeAuthRepository.findByEmail(employeeData.email);
            if (ExistEmployee) {
                const error = new Error('Employee Already Exist');
                error.name = 'EmployeeAlreadyExist';
                throw error;
            }

            const savedEmployee = await this.employeeAuthRepository.employeeSignup(employeeData)
            return savedEmployee
        } catch (error: unknown) {
            throw error
        }
    }

    async employeeLogin(employeeData: EmployeeLoginData): Promise<IEmployee | null> {
        try {
            const login = await this.employeeAuthRepository.employeeLogin(employeeData)
            if (!login) {
                const error = new Error('Invalid Credentials');
                error.name = "InvalidCredentials"
                throw error
            }

            const isPassword = await bcrypt.compare(employeeData.password, login.password)
            if (!isPassword) {
                const error = new Error('Invalid Credentials');
                error.name = "InvalidCredentials"
                throw error
            }
            return login
        } catch (error: unknown) {
            throw error
        }
    }

    async getEmployees(empId: string): Promise<IEmployee[]> {
    try {
        const loggedPerson = await this.employeeAuthRepository.findByIds(empId);

        const allEmployees = await this.employeeAuthRepository.getEmployees(empId);
        const filteredEmployees = allEmployees.filter(emp =>
            emp.department === loggedPerson.department
        );
        return filteredEmployees;
    } catch (error: unknown) {
        throw error;
    }
}

}

const employeeAuthRepository = new EmployeeAuthRepository()
export const employeeAuthServices = new EmployeeAuthServices(employeeAuthRepository)

