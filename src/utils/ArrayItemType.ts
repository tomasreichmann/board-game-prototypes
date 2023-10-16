type ArrayItem<T extends any[]> = T extends (infer U)[] ? U : never;
export default ArrayItem;
