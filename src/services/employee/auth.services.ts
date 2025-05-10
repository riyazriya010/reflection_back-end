import { response } from "express";
import { IEmployeeServiceMethods } from "../../interface/employee/employee.interface";
import { EmployeeLoginData, EmployeeSignUpData } from "../../interface/employee/employee.types";
import { IEmployee } from "../../models/employee.model";
import EmployeeAuthRepository from "../../repositories/employee/auth.repository";
import bcrypt from "bcrypt"


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

    async getEmployees(empId: string): Promise<IEmployee[] | []> {
        try{
            const getEmployees = await this.employeeAuthRepository.getEmployees(empId)
            return getEmployees
        }catch(error: unknown){
            throw error
        }
    }

}

const employeeAuthRepository = new EmployeeAuthRepository()
export const employeeAuthServices = new EmployeeAuthServices(employeeAuthRepository)

