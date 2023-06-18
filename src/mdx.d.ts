declare module "*.mdx" {
    const Component: React.ComponentType<{
        components?:
            | {
                  [key: string]: React.ComponentType<any>;
              }
            | undefined;
    }>;
    export default Component;
}
