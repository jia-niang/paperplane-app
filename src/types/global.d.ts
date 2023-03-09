type RC = ReturnType<React.FC>

interface IProps extends React.PropsWithChildren {
  style?: React.CSSProperties
  className?: string
}

type TypeofArray<T extends any[]> = T extends (infer U)[] ? U : never
