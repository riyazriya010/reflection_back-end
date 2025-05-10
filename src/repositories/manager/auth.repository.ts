import { IManagerMethods } from "../../interface/manager/manager.interface";
import { ManagerLoginData } from "../../interface/manager/manager.types";
import ManagerModel, { IManager } from "../../models/manager.model";
import CommonBaseRepository from "../base/baseRepository";

export default class ManagerAuthRepository extends CommonBaseRepository<{
    ManagerModel: IManager
}> implements IManagerMethods {
    constructor() {
        super({
            ManagerModel: ManagerModel
        })
    }

    async managerSignup(managerData: Partial<IManager>): Promise<IManager> {
        return this.createData('ManagerModel', managerData);
    }

    async managerLogin(managerData: ManagerLoginData): Promise<IManager | null> {
        return this.findOne('ManagerModel', { email: managerData.email })
    }

    async findByEmail(email: string): Promise<IManager | null> {
        return this.findOne('ManagerModel', { email });
    }


}
