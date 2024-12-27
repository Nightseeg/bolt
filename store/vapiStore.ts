import { create } from 'zustand';

interface VapiState {
  callId: string | null;
  isCallActive: boolean;
  setCallId: (id: string | null) => void;
  setCallActive: (active: boolean) => void;
}

export const useVapiStore = create<VapiState>()((set) => ({
  callId: null,
  isCallActive: false,
  setCallId: (id) => set({ callId: id }),
  setCallActive: (active) => set({ isCallActive: active }),
}));