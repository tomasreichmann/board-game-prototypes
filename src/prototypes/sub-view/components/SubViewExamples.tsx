import React, { CSSProperties, PropsWithChildren, useEffect, useReducer } from "react";
import { useSubView } from "../../../components/SubView/SubViewProvider";
import { SubViewActionTypeEnum } from "../../../components/SubView/subViewReducer";
import SubView from "../../../components/SubView/SubView";

export default function SubViewExamples({ children }: PropsWithChildren) {
    return (
        <div className="SubViewExamples">
            <div className="relative w-full h-full">
                <SubView
                    contentAside={
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, iusto minus eligendi modi
                            asperiores vitae. Ad amet consequatur minus velit voluptates, ea maiores expedita eum,
                            dolorem ratione dolorum! Perferendis, delectus.
                        </p>
                    }
                >
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, iusto minus eligendi modi
                        asperiores vitae. Ad amet consequatur minus velit voluptates, ea maiores expedita eum, dolorem
                        ratione dolorum! Perferendis, delectus.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, iusto minus eligendi modi
                        asperiores vitae. Ad amet consequatur minus velit voluptates, ea maiores expedita eum, dolorem
                        ratione dolorum! Perferendis, delectus.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, iusto minus eligendi modi
                        asperiores vitae. Ad amet consequatur minus velit voluptates, ea maiores expedita eum, dolorem
                        ratione dolorum! Perferendis, delectus.
                    </p>
                </SubView>
            </div>
            {children}
        </div>
    );
}
