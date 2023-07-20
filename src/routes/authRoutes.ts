import Router from 'koa-router'

import { appContainer } from '../inversify.config'
import { Api } from '../types/TApi'
import { TYPES } from '../types/const'
import { AuthController, authValidators } from '../controllers/auth'

const router = new Router()

const authController = appContainer.get<AuthController>(TYPES.AuthController)
router.post(Api.Auth.Login.URL, authValidators.authUser, (ctx) => authController.login(ctx, ctx.request.body))

export const authRouter = router

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Auth user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - login:
 *              - pass:
 *             properties:
 *              login:
 *                name: login
 *                type: string
 *              pass:
 *                name: pass
 *                type: string
 *
 *     responses:
 *       200:
 *         description: User successfully login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                token:
 *                  type: string
 *
 *       500:
 *         description: Some server error
 *
 *       400:
 *         description: Validation error
 *
 *       403:
 *         description: Login or pass incorrect
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ErrorResult'
 *
 */
