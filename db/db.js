import mongoose from "mongoose";

const mongoURI = "mongodb+srv://danikkkk12:68429852DanikBaze@cluster0.afahx5g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ База подключена"))
  .catch(err => console.error("Ошибка подключения:", err));

export default mongoose;