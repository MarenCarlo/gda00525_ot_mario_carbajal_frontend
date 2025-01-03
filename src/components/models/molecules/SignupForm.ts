import { Control } from 'react-hook-form';

export interface SignupFormProps {
    isLoading: boolean;
    newUserData: UserData;
    setNewUserData: React.Dispatch<React.SetStateAction<UserData>>;
    newEnterpriseData: EnterpriseData;
    handleUserChange: any;
    handleEnterpriseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorsUser: Record<string, any>;
    errorsEnterprise: Record<string, any>;
    signupUserForm: () => void;
    newEnterpriseForm: () => void;
    roles: any;
    enterprises: any;
    RoutesElements: { label: string; value: number }[];
    currentTab: number;
    setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
    enterpriseSelected: number;
    roleSelected: string | number;
    control: Control<any>;
}

interface UserData {
    empresa_idEmpresa: number;
    rol_idRol: number;
    nombre_completo: string;
    username: string;
    email: string;
    telefono: string;
    direccion: string;
    fecha_nacimiento: string;
    passphrase: string;
    repeat_passphrase: string;
}

interface EnterpriseData {
    nit: string;
    telefono: string;
    email: string;
    razon_social: string;
    nombre_comercial: string;
}