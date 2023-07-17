export interface Message {
  message: string;
  sentBy: string;
  time: any;
  _id?: string;
}

type Action =
  | { type: "ADD_MSG"; payload: Message }
  | { type: "ADD_MSGS"; payload: Message[] }
  | { type: "DEL_MSG"; payload: Message };

export const msgReducer = (state: Message[], action: Action): Message[] => {
  switch (action.type) {
    case "ADD_MSG":
      return [...state, action.payload];
    case "ADD_MSGS":
      return [...state, ...action.payload];
    // not implemented now
    case "DEL_MSG":
      const updatedState = state.filter(
        (message) => message.message !== action.payload.message
    );
      return updatedState;
    default:
      return state;
  }
};
