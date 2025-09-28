import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"


export const useComplaintStore = create()(
    persist(
        (set) => ({
            setData: (data) => set(data)
        }),
        {
            name: 'complaint-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
)