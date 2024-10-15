import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running at http://127.0.0.1:${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
