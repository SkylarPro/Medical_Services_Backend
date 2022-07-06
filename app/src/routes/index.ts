import express from "express"
import userRoutes from "./users/User"
import analysisRoutes from "./analysis/Analysis"

const router: express.Router = express.Router()

router.use('/analysis', analysisRoutes)
router.use('/user', userRoutes)

export default router