/** React 组件 */
type RC = ReturnType<React.FC>

/** 组件基础属性 */
interface IProps {
  style?: React.CSSProperties
  className?: string
  children?: ReactNode
}

/** 获取数组的类型 */
type TypeofArray<T extends any[]> = T extends (infer U)[] ? U : never
