import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const accommodationsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  endp
})