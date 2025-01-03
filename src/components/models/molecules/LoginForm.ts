import { FieldErrors, SubmitHandler, UseFormRegister } from "react-hook-form";

export interface LogInOrgProps {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    userData: UserData;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    loginForm: (e: React.FormEvent<HTMLFormElement>) => void;
    errors: FieldErrors<UserData>;
}
interface UserData {
    username: string;
    passphrase: string;
}