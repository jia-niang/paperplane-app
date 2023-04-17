/** 响应体 */
interface IResponseBody {
  success: boolean
  message: string
  code: number
}

/** 成功的响应 */
interface ISuccessBody<TData = any> extends IResponseBody {
  success: true
  data: TData
}

/** 出错的响应   */
interface IErrorBody<TData = void> extends IResponseBody {
  success: false
  data?: TData
}

/** 分页数据 */
interface IPaginated<TData = any> {
  total: number
  current: number
  list: TData[]
}

type TimestampType = number

/** 带有修订信息的类型 */
interface IModifyInfo {
  createTime: TimestampType
  updateTime: TimestampType
}

interface IWithModify extends IModifyInfo {}

/** 自类型中移除修订信息字段 */
type NoModify<T extends IModifyInfo> = Omit<T, keyof IModifyInfo>

type IdType = string

/** 带有 _id 的类型 */
interface IWithId {
  _id: IdType
}

/** 自类型中移除 _id 类型 */
type NoId<T extends IWithId> = Omit<T, keyof IWithId>

/** 草稿类型，没有任何 _id 和修订信息 */
type Draft<T> = Omit<T, keyof IModifyInfo & IWithId>

/** 带有客户端 ID 的类型 */
interface IWithClientId {
  clientId?: string
}
