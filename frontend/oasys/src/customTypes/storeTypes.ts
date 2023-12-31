/* Export */
export interface AuthState {
    isAuth: boolean;
    updateAuthState: (data: Partial<AuthState>) => void;
}

export interface UserState {
    senior: boolean;
    gender: "MALE" | "FEMALE" | undefined;
    membership: boolean;
    member: {
        id: number;
        name: string;
        phone: string;
        faceId: string;
        subId: string;
    };
    updateUserState: (data: Partial<UserState>) => void;
}

export interface NoticeState {
    name: string;
    phone: string;
    teller: number;
    waitPeople: number;
    work: string;
    updateNoticeState: (data: Partial<NoticeState>) => void;
}
