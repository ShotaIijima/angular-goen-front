export interface User {
    id: number;
    auth_type: number; // 1: 求職者BASICログイン 2: 求職者FBログイン 3: 経営者BASICログイン 4: 経営者FBログイン
    name: string;
    photo_path: string;
    account: string;
    mail_address: string;
    phone_number: string;
    password: string;
    sex: number;
    birthday: string;
    self_introduction: string;
    company: number;
    reason: number;
    area: number;
    position: number;
    twitter: string;
    facebook: string;
    facebook_id: string;
    linkedin: string;
    skype: string;
    slack: string;
    chatwork: string;
    github: string;
    japanese_proficiency: string;
    address: number;
    address_detail: string;
    bloodtype: number;
    welfare: string;
    work_place: number;
    wp_detail: string;
    apeal: string;
    type: number;
    tdusers: [number];
    isMng: boolean;
    created_at: string;
    updated_at: string;
}