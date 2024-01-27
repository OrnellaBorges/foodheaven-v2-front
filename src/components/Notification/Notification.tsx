type ChildrenType = {
    children: React.ReactNode;
};

export function Notification({ children }: ChildrenType) {
    return (
        <div
            style={{
                position: "fixed",
                top: "10px",
                right: "10px",
                left: "10px",
                background: "white",
                padding: "10px",
                borderRadius: "10px",
            }}
        >
            {children}
        </div>
    );
}
