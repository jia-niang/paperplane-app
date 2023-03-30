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

interface IModifyInfo {
  createTime: TimestampType
  updateTime: TimestampType
}

interface IWithModify extends IModifyInfo {}

interface IWithId {
  _id: string
}

interface IWithClientId {
  clientId: string
}

type EmptyType<T extends object> = {
  [p: keyof T]: (typeof T)[p] | string
}
