export type DocumentStateType = {};

export type DocumentStateActionType = { type: "noop" };

export const initialState: DocumentStateType = {};

export default function documentStateReducer(
    state: DocumentStateType,
    action: DocumentStateActionType
): DocumentStateType {
    return state;
}
