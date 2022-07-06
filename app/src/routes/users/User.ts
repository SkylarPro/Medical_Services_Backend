import express from "express"
import UserController from '../../controllers/userController'
import passport from "../../middlewares/passport";

const userController = new UserController()
const router: express.Router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - nickname
 *         - password
 *         - firstname
 *         - surname
 *         - sex
 *         - age
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: The user email [unique]
 *         nickname:
 *           type: string
 *           description: The user nickname [unique]
 *         password:
 *           type: string
 *           description: The user password [@Length(6,20)]
 *         firstname:
 *           type: string
 *           description: The user firstname
 *         surname:
 *           type: string
 *           description: The user surname
 *         sex:
 *           type: string
 *           description: The user sex
 *         age:
 *           type: integer
 *           description: The user age
 *       example:
 *         email: SkylarPro@yandex.ru
 *         password: k23456124
 *         nickname: skylar
 *         firstname: Viktor
 *         surname: Kumpan
 *         sex: men
 *         age: 28
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User_login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string, unique
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password [@Length(6,20)]
 *       example:
 *         email: SkylarPro@yandex.ru
 *         password: k23456124
 */

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
 *     Profile:
 *       type: object
 *       required:
 *         - nickname
 *         - firstname
 *         - surname
 *         - sex
 *         - age
 *       properties:
 *         nickname:
 *             type: string
 *             description: Nickname of a person
 *         firstname:
 *             type: string
 *             description: Firstname of a person
 *         surname:
 *             type: string
 *             description: Surname of a person
 *         sex:
 *             type: string
 *             description: Gender of a person
 *         age:
 *             type: integer
 *             description: Number age person
 *       example:
 *         nickname: skylar
 *         firstname: Viktor
 *         surname: Kumpan
 *         sex: men
 *         age: 28
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The user managing API
 */


//получить инфомрацию по аккаунту done, respone done

/**
 * @swagger
 * /v1/user/profiles/{id}:
 *   get:
 *     summary: Returns profiles
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The analysis id
 *     responses:
 *       200:
 *         description: The profiles
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 *       404:
 *         description: The profiles was not found
 */
router.get('/profiles/:id(\\d+)/',userController.get_profile)

// получить информацию о себе done, respone done
/**
 * @swagger
 * /v1/user/me:
 *   get:
 *     summary: Returns own profiles
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The profiles
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: The profiles was not found
 */
router.get('/me', passport.authenticate('jwt', { session: false }), userController.me)


/**
 * @swagger
 * /v1/user/registration:
 *   post:
 *     summary: Registration a new user
 *     tags: [User]
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: The user doesn't create
 */
router.post("/registration", userController.registration);

// удаление аккаунта done, respone done
/**
 * @swagger
 * /v1/user/delete:
 *   delete:
 *     summary: Remove self account
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
router.delete('/delete',passport.authenticate('jwt', { session: false }), userController.delete)

// обновление данных аккаунта done, respone done
/**
 * @swagger
 * /v1/user/update:
 *  put:
 *    summary: Update the self information
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Profile'
 *    responses:
 *      200:
 *        description: The user information was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user information was not found
 *      500:
 *        description: Some error happened
 */
router.put('/update',passport.authenticate('jwt', { session: false }),userController.update)

//done, response done
/**
 * @swagger
 * components:
 *   schemas:
 *     Passwords:
 *       type: object
 *       required:
 *         - oldPassword
 *         - newPassword
 *       properties:
 *         oldPassword:
 *           type: string
 *           description: The old password
 *         newPassword:
 *           type: string
 *           description: The new password
 *       example:
 *         oldPassword: k23456124
 *         newPassword: k123456789
 */

/**
 * @swagger
 * /v1/user/change-password:
 *   put:
 *     summary: Update password
 *     tags: [User]
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Passwords'
 *                  description: The update password
 *     responses:
 *       404:
 *         description: The input data incorrect
 *       200:
 *         description: Update password
 */
router.put("/change-password", passport.authenticate('jwt', { session: false }), userController.passwordChange);


/**
 * @swagger
 * /v1/user/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User_login'
 *     responses:
 *       200:
 *         description: The user was successfully loging
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Token'
 *       404:
 *         description: The user doesn't loging
 */
router.post('/login',userController.login);


export default router