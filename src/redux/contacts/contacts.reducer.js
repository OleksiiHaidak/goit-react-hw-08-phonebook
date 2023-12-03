// import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
// import { instance } from 'redux/auth/auth.reducer';
// import axios from 'axios';

// export const fetchContacts = createAsyncThunk(
//   'contacts/fetchAll',
//   async (_, thunkApi) => {
//     try {
//       const { data } = await axios.get(`https://655d2d7a9f1e1093c59915fa.mockapi.io/contacts`);
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// export const addContact = createAsyncThunk(
//   'contacts/addContact',
//   async (contact, thunkApi) => {
//     try {
//       const { data } = await axios.post(`https://655d2d7a9f1e1093c59915fa.mockapi.io/contacts/`, contact);
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteContact = createAsyncThunk(
//   'contacts/deleteContact',
//   async (contactId, thunkApi) => {
//     try {
//       const { data } = await axios.delete(`https://655d2d7a9f1e1093c59915fa.mockapi.io/contacts/${contactId}`);
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// const initialState = {
//   contacts: [],
//   isLoading: false,
//   error: null,
//   filterTerm: "",
//   isAdding: false,
//   isDeleting: false,
// };

// const contactsSlice = createSlice({
//   name: "contacts",
//   initialState,
//   reducers: {
//     filterContacts(state, {payload}) {
//           state.filterTerm = payload;
//     },
//   },
//   extraReducers: builder =>
//       builder.addCase(fetchContacts.fulfilled, (state, { payload }) => {
//         state.isLoading = false;
//         state.contacts = payload;
//       })

//       .addCase(deleteContact.fulfilled, (state, { payload }) => {
//         state.isLoading = false;
//         state.isDeleting = false;
//         state.contacts = state.contacts.filter(item => item.id !== payload.id);
//       })

//       .addCase(addContact.fulfilled, (state, { payload }) => {
//         state.isLoading = false;
//         state.isAdding = false;
//         state.contacts = [...state.contacts, payload];
//       })

//   .addMatcher(
//         isAnyOf(
//           fetchContacts.pending,
//           deleteContact.pending,
//           addContact.pending,
//         ),
//         state => {
//           state.isLoading = true;
//           state.error = null;
//           state.isAdding = false;
//           state.isDeleting = false;
//         }
//       )
//   .addMatcher(
//         isAnyOf(
//           fetchContacts.rejected,
//           deleteContact.rejected,
//           addContact.rejected,
//         ),
//         (state, { payload }) => {
//           state.isLoading = false;
//           state.error = payload;
//           state.isAdding = false;
//           state.isDeleting = false;
//         }
//       )
// });

// export const {filterContacts} = contactsSlice.actions;

// export const contactsReducer = contactsSlice.reducer;

import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { instance } from 'redux/auth/auth.reducer';


export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get('/contacts');
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);


export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/contacts', formData);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);


export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkApi) => {
    try {
      const { data } = await instance.delete(`/contacts/${contactId}`);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  contacts: [],
  isLoading: false,
  error: null,
  filterTerm: "",
  isAdding: false,
  isDeleting: false,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    filterContacts(state, {payload}) {
          state.filterTerm = payload;
    },
  },
  extraReducers: builder =>
      builder.addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts = payload;
      })

      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isDeleting = false;
        state.contacts = state.contacts.filter(item => item.id !== payload.id);
      })

      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isAdding = false;
        state.contacts = [...state.contacts, payload];
      })

  .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          deleteContact.pending,
          addContact.pending,
        ),
        state => {
          state.isLoading = true;
          state.error = null;
          state.isAdding = false;
          state.isDeleting = false;
        }
      )
  .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          deleteContact.rejected,
          addContact.rejected,
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
          state.isAdding = false;
          state.isDeleting = false;
        }
      )
});

export const {filterContacts} = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;