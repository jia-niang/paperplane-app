const prefixStr = 'cc.paperplane.app'

function prefix(arg1: string | TemplateStringsArray, ...restArgs: string[]) {
  if (typeof arg1 === 'string') {
    return prefixStr + arg1
  }
  const result = arg1.reduce(
    (result, frag, index) => result.concat(frag).concat(restArgs[index] || ''),
    ''
  )

  return prefixStr + result
}

/** 客户端 ID */
export const SK_CLIENT_ID = prefix`.cid`

/** 网站设置 */
export const SK_SETTING = prefix`.setting`

/** GPT 提问记录 */
export const SK_GPT_RECORDS = prefix`.gpt-record`

/** 机器人配置 */
export const SK_ROBOT_CONFIG = prefix`.robot-config`
