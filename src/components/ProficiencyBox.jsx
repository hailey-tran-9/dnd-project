import { useContext } from "react";
import { CharacterContext } from "./contexts/CharacterContext.jsx";

export default function ProficiencyBox({ ability }) {
    const { charData } = useContext(CharacterContext);
    let classes = "w-2 h-2 rounded border-2 border-black";
    if (charData.abilities[ability].proficient) {
        classes += " bg-black";
    } else {
        classes += " bg-white";
    }

    return (
        <div className={classes}></div>
    );
}