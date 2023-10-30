import { css } from '@emotion/react'
import { NavLink } from 'react-router-dom'

import bg1 from '@/assets/bg/escheresque.png'
import openAiIcon from '@/assets/icon/logo-openai.svg'
import PageLayout from '@/components/layout/PageLayout'

export default function HomePage(): RC {
  return (
    <PageLayout>
      <div css={css``}>
        <NavLink
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            background-color: #c83dab;
            background-image: url(${bg1});
            background-repeat: repeat;
            width: 280px;
            height: 140px;
            padding: 20px;
            text-decoration: none;
          `}
          to="/gpt"
        >
          <img
            css={css`
              height: 70px;
              width: 70px;
            `}
            src={openAiIcon}
            alt=""
          />

          <div
            css={css`
              margin-left: 18px;
              font-size: 40px;
              text-decoration: none;
              color: #fff;
            `}
          >
            GPT
          </div>
        </NavLink>
      </div>
    </PageLayout>
  )
}
