export interface IntProtectedElement {
    children: React.ReactNode;
    redirectTo: string;
    isAllowed: boolean;
}

export interface IntProtectedComponent {
    children: React.ReactNode;
    isShowed: boolean;
}