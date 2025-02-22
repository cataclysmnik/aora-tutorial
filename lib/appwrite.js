import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';
import SignIn from '../app/(auth)/sign-in';

export const appwriteConfig = {
    endpoint:"https://cloud.appwrite.io/v1",
    platform: 'com.nik.aora',
    projectId: '67b9500e0017ed539e74',
    databaseId: '67b9515a001a67ad08f5',
    userCollectionId: '67b9517e0031e958c57d',
    videoCollectionId: '67b951ae001b2fb3e53f',
    storageId: '67b952f5001f48114369',

}

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.

    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);


export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials();

        await SignIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser;

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function signIn(email,password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)

        return session;
    } catch (error) {
        throw new Error(error)
    }
}