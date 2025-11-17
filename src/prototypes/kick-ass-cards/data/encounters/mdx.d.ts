declare module "*.mdx" {
    import * as React from "react";

    const Component: React.ComponentType<{
        components?:
            | {
                  [key: string]: React.ComponentType<any>;
              }
            | undefined;
    }>;

    export default Component;
}
