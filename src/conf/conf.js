const config = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjetId: String(import.meta.env.VITE_APPWRITE_PROJET_ID),
  appwriteDbId: String(import.meta.env.VITE_APPWRITE_DB_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default config;
