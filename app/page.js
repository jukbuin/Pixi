import DoubleClickLink from "@/app/components/DoubleClickLink";
import MyPCModal from "@/app/components/MyPCModal";
import RecycleBinModal from "@/app/components/RecycleBinModal";
import FolderModal from "@/app/components/FolderModal";

export default function Home() {
    return (
        <div className="background">
            <div className="double-click-grid">
                <DoubleClickLink className="icon" href="https://www.naver.com/" openInNewTab>
                    <img src="/internetIcon.png" alt="Go to internet"/>
                </DoubleClickLink> {/*internet*/}
                <MyPCModal /> {/*MyPC*/}
                <FolderModal/> {/*folder*/}
                <DoubleClickLink className="icon" href="/todo">
                    <img src="/ToDoList.png" alt="Go to ToDoList"/>
                </DoubleClickLink> {/*ToDoList*/}
                <RecycleBinModal/> {/*RecycleBin*/}
            </div>
        </div>
    );
}