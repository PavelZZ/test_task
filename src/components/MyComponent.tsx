import { memo, type PropsWithChildren } from "react";

interface IMyComponentProps extends PropsWithChildren {
    text: string;

}

function MyComponent({text, children}: IMyComponentProps) {
    return <div>
            some logic here {text}
            {children}
        </div>;
};


export default memo(MyComponent);