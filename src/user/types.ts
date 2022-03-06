export type SignUpBody = {
  username: string
  password: string
  mnemonic: string //TODO: maybe mnemonic type.
}

export type LoginBody = {
  username: string
  password: string
}
