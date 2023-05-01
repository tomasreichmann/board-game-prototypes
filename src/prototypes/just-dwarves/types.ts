export type ContentType = {
    children?: string | ContentType[];
    component?: string;
    className?: string;
};

export type PlaytesterType = {
    name: string;
};
