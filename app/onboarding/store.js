import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"


export const useOnboardingStore = create()(
    persist(
        (set) => ({
            setData: (data) => set(data)
        }),
        {
            name: 'onboarding-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
)