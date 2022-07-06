import { Router } from "express";
import AuthController from "../../controllers/AuthController";
import passport from "../../middlewares/passport"

const router = Router();
const authController = new AuthController()



/**
 * @swagger
 * components:
 *   schemas:
 *     Token:
 *       type: object
 *       required:
 *         - accessToken
 *         - refreshToken
 *       properties:
 *         accessToken:
 *           type: string
 *           description: The access token to services [Unique]
 *         refreshToken:
 *           type: string
 *           description: The refresh token to services
 *       example:
 *         accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjU1OTAyNTg0fQ.4toMcIexRJ1WOho6zS4yajpQMiLrZDM3H3-K_Vg-37s
 *         refreshtoken: 7425c16d-c1c2-452e-84f4-134a34ed2fa9
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Refreshtoken:
 *       type: object
 *       required:
 *         - refreshToken
 *       properties:
 *         refreshToken:
 *           type: string
 *           description: The refresh token to update access token
 *       example:
 *         refreshToken: 7425c16d-c1c2-452e-84f4-134a34ed2fa9
 */


/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: The auth managing API
 */


//done, response done
/**
 * @swagger
 * /v1/auth/refresh:
 *   put:
 *     summary: Refresh outdated access token
 *     tags: [Authentication]
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Refreshtoken'
 *                  description: The refresh token
 *     responses:
 *       404:
 *         description: The refresh token incorrect
 *       200:
 *         description: Update refresh token and access token
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Token'
 */
router.put('/refresh',authController.refresh_token)

/**
 * @swagger
 * /v1/auth/isAuth:
 *   get:
 *     summary: Proxy between app and authentication
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Auth successful
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: {id: 7}
 *       404:
 *         description: Auth unsuccessful
 */
router.get("/isAuth", passport.authenticate('jwt', { session: false }), authController.isAuth);

/**
 * @swagger
 * /v1/auth/doAuth:
 *   post:
 *     summary: Proxy between app and authentication
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Auth successful
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Token'
 *       404:
 *         description: Auth unsuccessful
 */
router.post("/doAuth", authController.doAuth);


export default router;


