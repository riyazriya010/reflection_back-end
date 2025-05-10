import { IManager } from "../../models/manager.model";
import { ManagerLoginData, ManagerSignUpData } from "./manager.types";

export interface IManagerMethods {
    managerSignup(managerData: ManagerSignUpData): Promise<IManager>
    managerLogin(managerData: ManagerLoginData): Promise<IManager | null>
}

export interface IManagerServiceMethods {
    managerSignup(managerData: ManagerSignUpData): Promise<IManager>
    managerLogin(managerData: ManagerLoginData): Promise<IManager | null>
}

