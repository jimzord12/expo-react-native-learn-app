import { Client, Account, ID, Databases } from "react-native-appwrite";

const client = new Client()
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM);

const databases = new Databases(client);

export { client, databases };
