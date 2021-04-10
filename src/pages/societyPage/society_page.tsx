import Society from "../../interfaces/society";

export default function SocietyPage({society}:{society:Society}) {
    return (
        <div>
            {society.name}
        </div>
    );
}