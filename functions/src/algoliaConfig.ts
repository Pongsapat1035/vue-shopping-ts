import { algoliasearch } from "algoliasearch";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const appID = process.env.ALGOLIA_APP_ID;
const apiKey = process.env.ALGOLIA_API_KEY;

const client = algoliasearch((appID ?? ""), (apiKey ?? ""));

export default client