import { METHODS, fetchData } from "../utils/axios";
import { BASE_URL } from "../utils/config";

enum Methods {
  'GET',
  'POST',
  'PUT',
  'DELETE'
}


// Fetch conversations of the user
export const fetchConversations = async () => {
  const response = await fetchData(
    `${BASE_URL}/message/conversation`,
    METHODS.GET,
    true
  );
  return response?.data;
};


// Fetch messages related to the conversation
export const fetchMessages = async (id: string) => {
  const response = await fetchData(
    `${BASE_URL}/message?c_id=${id}`,
    METHODS.GET,
    true
  );
  return response?.data;
};


// save the message to the beloged conversation 
export const saveMessage = async (message: string, receiverId: any) => {
  const response = await fetchData(`${BASE_URL}/message`, METHODS.POST, true, {
    message,
    receiverId,
  });
};
