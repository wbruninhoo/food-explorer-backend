import { Request, Response } from 'express'

export class LogoutController {
  async handle(_: Request, res: Response) {
    return res
      .cookie('refreshToken', '', {
        path: '/',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 1000 * 2, // 2 seconds
      })
      .send()
  }
}
