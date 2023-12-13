const mongoose =require('mongoose');
// console.log("con")
const DB=process.env.DATABASE;
mongoose.connect(DB,{
    useNewUrlparser:true,
    useUnifiedTopology:true,
    //  userCreateIndex :true,
    //  useUnifiedTopology :true,
    //  useFindAndModify :false
 }).then(()=>{
    console.log(`connection sucesfully`);
}).catch((err)=>console.log(`no connection`));