type State = {
    language: string
    state: string | undefined
}

export default function useAppState() {
    const state = ref<State>({
        language: 'en',
        state: undefined,
    })

    return {
        state,
    }
}