import { css } from '@emotion/react'

export default function PageLayout(props: IProps): RC {
  return (
    <main
      {...props}
      css={css`
        width: 960px;
        margin: 0 auto;
      `}
    >
      {props.children}
    </main>
  )
}
