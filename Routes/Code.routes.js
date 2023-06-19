const { Router } = require("express");
const { CodeModel } = require("../Models/code.model");


const codeRouter = Router();


codeRouter.post("/upload", async (req, res) => {
    const userID=req.body.userID ;
    const userName=req.body.user;
    const {title,content,language,about} =req.body;
    const payload={
        userID,
        username:userName,
        title,
        content,
        language,
        about
    }
    try {
        const code = new CodeModel(payload);
        await code.save();
        res.status(200).json({ message: 'Code Uploaded Sucessfull',code })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

codeRouter.get("/getcode",async (req, res) => {
    const userID=req.body.userID ;
    const userName=req.body.user;
    try {
        const data = await CodeModel.find({userID});
        res.status(200).json({ message: 'Data Get Sucessfull',data })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

codeRouter.get("/singlecode/:id",async (req, res) => {
    const {id} = req.params;
    const userID=req.body.userID ;
    try {
        const data = await CodeModel.findOne({userID,_id:id});
        res.status(200).json({ message: 'Data Get Sucessfull',data })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});
codeRouter.patch("/update/:CodeId",async (req, res) => {

    const userID=req.body.userID ;
    const userName=req.body.user;

    const {CodeId} = req.params;
    try {
        const data = await CodeModel.findByIdAndUpdate({_id:CodeId,userID},req.body);
        res.status(200).json({ message: 'Code Updated Sucessfull',data })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

codeRouter.delete("/delete/:CodeId",async (req, res) => {
    const userID=req.body.userID ;
    const userName=req.body.user;
    const {CodeId} = req.params;
    try {
        const data = await CodeModel.findByIdAndDelete({_id:CodeId,userID});
        res.status(200).json({ message: 'Code Deleted Sucessfull',data })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});


module.exports = { codeRouter }

