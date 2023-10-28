import { MongoManager } from "../infra/database/mongodb/utils/mongo-manager";
import env from "./config/env";

MongoManager.connect(env.mongoUrl)
  .then(async () => {
    const server = (await import("./config/server")).default;

    server.listen(env.port, () => {
      console.log(`Server running at http://localhost:${env.port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
