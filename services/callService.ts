import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Call, CreateCallData } from '@/lib/models/call';

const COLLECTION = 'calls';

export const callService = {
  async createCall(data: CreateCallData): Promise<Call> {
    const callRef = collection(db, COLLECTION);
    
    const callData = {
      userId: data.userId,
      phoneNumber: data.phoneNumber,
      status: 'pending',
      startedAt: serverTimestamp(),
    };

    const docRef = await addDoc(callRef, callData);
    return { id: docRef.id, ...callData } as Call;
  },

  async getCall(callId: string): Promise<Call | null> {
    const callRef = doc(db, COLLECTION, callId);
    const callSnap = await getDoc(callRef);
    
    if (!callSnap.exists()) {
      return null;
    }

    return { id: callSnap.id, ...callSnap.data() } as Call;
  },

  async getUserCalls(userId: string): Promise<Call[]> {
    const callsQuery = query(
      collection(db, COLLECTION),
      where('userId', '==', userId),
      orderBy('startedAt', 'desc')
    );

    const querySnapshot = await getDocs(callsQuery);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as Call[];
  },

  async updateCallStatus(
    callId: string, 
    status: Call['status'], 
    duration?: number
  ): Promise<void> {
    const callRef = doc(db, COLLECTION, callId);
    const updateData: any = { status };

    if (status === 'completed' || status === 'failed') {
      updateData.endedAt = serverTimestamp();
      if (duration) {
        updateData.duration = duration;
      }
    }

    await updateDoc(callRef, updateData);
  }
};