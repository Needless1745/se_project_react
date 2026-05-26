const baseUrl = "http://localhost:3001";

export const headers = { "Content-Type": "application/json" };

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () =>
  fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);

export const addItem = ({ name, imageUrl, weather }, token) =>
  fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(handleServerResponse);

export const deleteItem = (id, token) =>
  fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers,
  }).then(handleServerResponse);

export const updateUserProfile = ({ name, avatar }, token) =>
  fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleServerResponse);
