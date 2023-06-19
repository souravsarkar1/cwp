const mongoose=require("mongoose")

const repoSchema=mongoose.Schema({
    name:String,
    description:String
},{
    versionKey:false
})

const RepoModel=mongoose.model("repo",repoSchema)

module.exports={RepoModel}