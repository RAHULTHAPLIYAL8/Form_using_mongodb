const express=require("express");
const router=express.Router();
const book=require("../controllers/user/Books");
const upload=require("../middleware/upload");
const authMiddleware=require("../middleware/authenticate")

router.post("/create",upload.single('image'),authMiddleware,book.createBook);
router.get("/delete/:id",authMiddleware,book.deleteBook);
router.get("/get/:id",authMiddleware,book.getBook);
router.get("/getbooks",authMiddleware,book.getBooks);
router.post("/mybook",authMiddleware,book.getMyBooks);
router.patch("/update/:id",upload.single('image'),authMiddleware,book.updateBook);



module.exports=router;

