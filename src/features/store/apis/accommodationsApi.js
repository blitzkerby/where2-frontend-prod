import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// I MAKE THIS COMMENT TO POST ON REVIEWBOARD
const accommodationsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    credentials: 'include', // This ensures cookies are included in the requests,
    prepareHeaders: (header, {getState}) => {
      header.set('Authorization', `Bearer ${getState().auth.token}`);
      return header;
    }
  }),
  endpoints(builder) {
    return{
      fetchAccommodations: builder.query({
        query: (page) => {
          return {
            baseUrl: '/accommodations',
            method: 'GET',
            params: {
              page: page.index,
              filter: {}
            }
          }
        }
      }),
      addBookmark: builder.mutation({
        query: (params) => {
          return {
            baseUrl: `/users/${params.user.id}/bookmarks`,
            method: 'POST',
            params: {
              accommodationId: params.accommodation.id
            }
          }
        }
      })
    }
  }
})

export const {useFetchAccommodationsQuery, useAddBookmarkMutation} = accommodationsApi;
export {accommodationsApi};