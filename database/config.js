const mongoose = require('mongoose');


//User:mean_user
//Pass: ywxwoqd1avUq5M0l

const bdConnection = async ()=>{

    try{
        await  mongoose.connect(process.env.BD_CNN,{
                                useNewUrlParser: true,
                                useUnifiedTopology: true,
                                //useCreateIndex: true
                            });
                            console.log("DB Online");
    }catch(error){
        console.log(error);
        throw new Error("Error a la hora de iniciar DB");
    }
  
}

module.exports ={
    bdConnection
}
