import { IManagerServiceMethods } from "../../interface/manager/manager.interface";
import { ManagerLoginData, ManagerSignUpData } from "../../interface/manager/manager.types";
import { IEmployee } from "../../models/employee.model";
import bcrypt from "bcrypt";
import ManagerAuthRepository from "../../repositories/manager/auth.repository";


export default class ManagerAuthServices implements IManagerServiceMethods {
    private managerAuthRepository: ManagerAuthRepository

    constructor(managerAuthRepository: ManagerAuthRepository) {
        this.managerAuthRepository = managerAuthRepository
    }

    async managerSignup(managerData: ManagerSignUpData): Promise<IEmployee> {
        try {
            // Find Employee Already Exist With Email
            const ExistManager = await this.managerAuthRepository.findByEmail(managerData.email);
            if (ExistManager) {
                const error = new Error('Manager Already Exist');
                error.name = 'ManagerAlreadyExist';
                throw error;
            }

            const savedEmployee = await this.managerAuthRepository.managerSignup(managerData)
            return savedEmployee
        } catch (error: unknown) {
            throw error
        }
    }

    async managerLogin(managerData: ManagerLoginData): Promise<IEmployee | null> {
        try {
            const login = await this.managerAuthRepository.managerLogin(managerData)
            if (!login) {
                const error = new Error('Invalid Credentials');
                error.name = "InvalidCredentials"
                throw error
            }

            const isPassword = await bcrypt.compare(managerData.password, login.password)
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

}

const managerAuthRepository = new ManagerAuthRepository();
export const managerAuthServices = new ManagerAuthServices(managerAuthRepository);


