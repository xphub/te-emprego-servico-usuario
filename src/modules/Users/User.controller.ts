import { ModuleResponse } from '@services/ModuleRegister.service'
import { create, login, list, updateInfo, find } from './methods'

class UserController {
  public create: any
  public login: any
  public list: any
  public updateInfo: any
  public find: any

  public constructor () {
    this.create = create.run
    this.login = login.handle
    this.list = list.handle
    this.updateInfo = updateInfo.handle
    this.find = find.handle
  }

  public async auth (): Promise<ModuleResponse> {
    return {
      status: 200,
      data: {
        message: 'google callback function'
      }
    }
  }
}

export default new UserController()
