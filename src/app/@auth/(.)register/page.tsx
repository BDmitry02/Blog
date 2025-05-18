import { RegisterForm } from "@/components/auth/RegisterForm/RegisterForm";
import ModalWindow from "@/components/modal-window/ModalWindow";

export default function RegisterPageModal() {
    return (
        <ModalWindow>
            <div className="bg-white">
                <RegisterForm />
            </div>
        </ModalWindow>
    );
}
