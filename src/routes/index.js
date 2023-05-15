import  express  from "express";
import userRoutes from "./user.routes.js"
import mediaRoutes from "./media.routes.js"
import reviewRoutes from "./review.routes.js"
import personRoutes from "./person.routes.js"

const router = express.Router()

router.use("/user", userRoutes)
router.use("/person", personRoutes)
router.use("/:mediaType", mediaRoutes)
router.use("/reviews", reviewRoutes)

export default router;