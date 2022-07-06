import express from "express"
import AnalysisController from '../../controllers/analysisController'
import passport from "../../middlewares/passport";

const analysisController = new AnalysisController()
const router: express.Router = express.Router()

//получить анализ по id done, response done

/**
 * @swagger
 * components:
 *   schemas:
 *     Title:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *              type: string
 *              description: The analysis title [Length(2, 100)]
 *       example:
 *          title: Vitamin
 *     Analysis:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - group
 *         - result
 *         - severity
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the analysis
 *         title:
 *           type: string
 *           description: The analysis title [Length(2, 100)]
 *         description:
 *           type: string
 *           description: The analysis description [Length(2, 500)]
 *         group:
 *           type: string
 *           description: The analysis group
 *         result:
 *           type: string
 *           description: The analysis result
 *         severity:
 *           type: string
 *           description: The analysis severity
 *       example:
 *         title: Vitamin B8
 *         description: Quick analysis at home
 *         group: vitamin
 *         result: flaw
 *         severity: strong
 */


/**
 * @swagger
 * tags:
 *   name: Analysis
 *   description: The analysis managing API
 */

/**
 * @swagger
 * /v1/analysis/{id}:
 *   get:
 *     summary: Returns the specific analysis
 *     tags: [Analysis]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The analysis id
 *     responses:
 *       404:
 *         description: The analysis was not found
 *       200:
 *         description: The specific analysis
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Analysis'
 */

router.get('/:id(\\d+)/', passport.authenticate('jwt', { session: false }), analysisController.getBy_Id)

//получить все анализ done, response done

/**
 * @swagger
 * /v1/analysis/all:
 *   get:
 *     summary: Returns the list of the analysis
 *     tags: [Analysis]
 *     responses:
 *       404:
 *         description: The analysis was not found
 *       200:
 *         description: The list of the analysis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Analysis'
 */
router.get('/all', passport.authenticate('jwt', { session: false }),analysisController.getBy_All)

//получить анализ по названию done
/**
 * @swagger
 * /v1/analysis/title:
 *   post:
 *     summary: Returns the specific analysis
 *     tags: [Analysis]
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: '#/components/schemas/Title'
 *     responses:
 *       404:
 *         description: The analysis was not found
 *       200:
 *         description: The list of the analysis
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Analysis'
 */
router.post('/title', passport.authenticate('jwt', { session: false }), analysisController.getBy_Title)

// создать анализ done, response done
/**
 * @swagger
 * /v1/analysis/create:
 *   post:
 *     summary: Create a new analysis
 *     tags: [Analysis]
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Analysis'
 *     responses:
 *       404:
 *         description: The analysis doesn't create
 *       200:
 *         description: The analysis was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Analysis'
 */
router.post('/create',passport.authenticate('jwt', { session: false }), analysisController.create)

// удалить анализ done, response done
/**
 * @swagger
 * /v1/analysis/{id}:
 *   delete:
 *     summary: Remove the analysis by id
 *     tags: [Analysis]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The analysis id
 *     responses:
 *       200:
 *         description: The analysis was deleted
 *       404:
 *         description: The analysis was not found
 */
router.delete('/:id(\\d+)/', passport.authenticate('jwt', { session: false }), analysisController.delete)

// обновить анализ done, response done
/**
 * @swagger
 * /v1/analysis/{id}:
 *  put:
 *    summary: Update the analysis by the id
 *    tags: [Analysis]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The analysis id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Analysis'
 *    responses:
 *      200:
 *        description: The analysis was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Analysis'
 *      404:
 *        description: The analysis was not found
 *      500:
 *        description: Some error happened
 */
router.put('/:id',passport.authenticate('jwt', { session: false }), analysisController.update)

export default router