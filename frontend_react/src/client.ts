import {createClient} from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: import.meta.env.VITE_REACT_APP_SANITY_PROJECT_ID,
    dataset: import.meta.env.VITE_REACT_APP_SANITY_DATASET,
    apiVersion: "2025-04-30",
    useCdn: true,
    token: import.meta.env.VITE_REACT_APP_SANITY_API_TOKEN,
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);