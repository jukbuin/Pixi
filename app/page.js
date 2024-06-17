import DoubleClickLink from "@/app/DoubleClickLink";

export default function Home() {
    return (
        <div className="background">
            <div className="double-click-grid">
                <DoubleClickLink className="icon" href="https://www.naver.com/" openInNewTab>
                    <img src="/internetIcon.png" alt="Go to internet"/>
                </DoubleClickLink>
                <DoubleClickLink className="icon" href="/list">
                    <img src="/myPC.png" alt="Go to internet"/>
                </DoubleClickLink>
                <DoubleClickLink className="icon" href="/">
                    <img src="/folder.png" alt="Go to internet"/>
                </DoubleClickLink>
                <DoubleClickLink className="icon" href="/">
                    <img src="/ToDoList.png" alt="Go to internet"/>
                </DoubleClickLink>
                <DoubleClickLink className="icon" href="/">
                    <img src="/RecycleBin.png" alt="Go to internet"/>
                </DoubleClickLink>
            </div>
        </div>
    );
}
