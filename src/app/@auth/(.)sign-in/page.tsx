import { LoginForm } from "@/components/auth/LoginForm/LoginForm";
import ModalWindow from "@/components/modal-window/ModalWindow";

export default function LoginPageModal() {
    return (
        <ModalWindow>
            <div className="bg-white">
                <LoginForm />
            </div>
        </ModalWindow>
    );
}
