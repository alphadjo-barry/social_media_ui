import {FaShareFromSquare} from "react-icons/fa6";

export default function Reaction({ handleShow, reactions, sortedComments, commentaires, handleMouseEnter, handleMouseLeave, adoreRef, rireRef}) {
    return(<>
        <div
            className="mt-3 d-flex flex-row gap-1 card-footer bg-transparent border-secondary"
            onMouseLeave={handleMouseLeave}
            style={{ height: "60px"}}
        >
            <div className="col">

                <div className="d-flex flex-column">
                    <div className="d-flex flex-row gap-2">
                        <small style={{ display: "none" }} ref={adoreRef}>
                            ❤️
                        </small>

                        <small style={{ display: "none" }} ref={rireRef}>  😂 </small>
                    </div>

                    <small onMouseEnter={handleMouseEnter}>{ reactions } 👍 </small>
                </div>
            </div>

            <div className="col" onClick={ handleShow }
                 style={{ cursor: "pointer" }}>
                { sortedComments.length > 0 ? sortedComments.length : commentaires } commentaires 💬
            </div>

            <div className="col d-flex justify-content-end">
                <span> 0 partager <FaShareFromSquare /></span>
            </div>
        </div>

    </>);
}