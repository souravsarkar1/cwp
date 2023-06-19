const mongoose = require("mongoose");

const codeSchema = mongoose.Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    language: { type: String, require: true },
    username: { type: String, require: true },
    userID: { type: String, require: true },
    username :{ type: String, require: true },
    about : { type: String, require: true }
}, {
    versionKey: false
});


const CodeModel = mongoose.model("codedata", codeSchema);



module.exports = { CodeModel };