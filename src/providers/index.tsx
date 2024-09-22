import { createContext, useReducer, useContext,type Dispatch,type ReactNode } from 'react';
import { OrderItem, User } from '../types';

// コンテキストの作成
const GlobalContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
} | null>(null);

// Stateの型定義
type State = {
  user: User | null;
  shoppingCart: OrderItem[];
}

// アクションの型定義 (慣例としてtypeとpayloadとつけます)
type Action = { type: 'setUser', payload: User } | { type: 'setShoppingCart', payload: OrderItem[] };

// Reducer関数の定義（状態を更新するロジック）
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUser':
      return { ...state, user: action.payload };
    case 'setShoppingCart':
      return { ...state, shoppingCart: action.payload };
    default:
      return state;
  }
};

// 初期状態
const initialState: State = { user: null, shoppingCart: [] };

// プロバイダーコンポーネント
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('contextがnull');
  }
  return context;
}