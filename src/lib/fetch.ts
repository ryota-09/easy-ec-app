import { API_KEY, API_URL } from "../config";

export const fetchItems = async () => {
  const res = await fetch(`${API_URL}/items`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      "X-API-KEY": API_KEY
    },
  });
  return res.json();
}

// export const registerUser = async (data: RegisterUser) => {
//   const res = await fetch(`${API_URL}/users`, {
//     method: 'POST',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json',
//       "X-API-KEY": API_KEY,
//     },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// }

// export const loginUser = async (data: LoginUser) => {
//   const res = await fetch(`${API_URL}/login`, {
//     method: 'POST',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json',
//       "X-API-KEY": API_KEY,
//     },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// }

// export const fetchTasks = async (userId: string) => {
//   const res = await fetch(`${API_URL}/tasks?userId=${userId}`, {
//     method: 'GET',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json',
//       "X-API-KEY": API_KEY
//     },
//   });
//   return res.json();
// }

// export const fetchTaskDetail = async (id: string) => {
//   const res = await fetch(`${API_URL}/tasks/${id}`, {
//     method: 'GET',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json',
//       "X-API-KEY": API_KEY
//     },
//   });
//   return res.json();
// }

// export const postNewTask = async (data: NewTask) => {
//   const res = await fetch(`${API_URL}/tasks`, {
//     method: 'POST',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json',
//       "X-API-KEY": API_KEY,
//     },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// }

// export const updateUser = async (data: EditUser) => {
//   const res = await fetch(`${API_URL}/users/${data.id}`, {
//     method: 'PATCH',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json',
//       "X-API-KEY": API_KEY,
//     },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// }

// export const updateTask = async (data: UpdateTask) => {
//   const res = await fetch(`${API_URL}/tasks/${data.id}`, {
//     method: 'PATCH',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json',
//       "X-API-KEY": API_KEY,
//     },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// }

// export const deleteTask = async (id: string) => {
//   const res = await fetch(`${API_URL}/tasks/${id}`, {
//     method: 'DELETE',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json',
//       "X-API-KEY": API_KEY,
//     },
//   });
//   return res.json();
// }