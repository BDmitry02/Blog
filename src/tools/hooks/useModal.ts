import { useCallback, useState } from "react";

export function useModal(initial = false) {
    const [isOpened, setIsOpened] = useState(initial);

    const openModal = useCallback(() => setIsOpened(true), []);
    const closeModal = useCallback(() => setIsOpened(false), []);

    return { isOpened, openModal, closeModal };
}
