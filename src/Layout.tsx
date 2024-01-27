import { Main } from "./components/Main/Main";
import { Header } from "./components/Header/Header";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <Main>{children}</Main>
        </>
    );
}
