import { api } from ".";

interface IUploadImageResponse {
  imageUrl: string;
}

export const uploadImageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<IUploadImageResponse, FormData>({
      query: (body) => ({
        method: "POST",
        url: "/upload/image",
        body,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = uploadImageApi;
