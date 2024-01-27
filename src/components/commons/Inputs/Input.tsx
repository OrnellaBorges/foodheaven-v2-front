export function Input({ type, htmlFor }: { type: string; htmlFor: string }) {
    return (
        <div className="input">
            <label htmlFor={htmlFor}> Input</label>
            <input type={type} />
        </div>
    );
}
