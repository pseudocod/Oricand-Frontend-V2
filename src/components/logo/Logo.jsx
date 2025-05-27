import { useNavigate } from "react-router-dom";

export default function Logo({
  size = "text-5xl",
  color = "text-black",
  center = false,
}) {
  const navigate = useNavigate();

  return (
    <div
      className={`font-light cursor-pointer transition-all duration-700 ${size} ${color} ${
        center ? "text-center" : ""
      }`}
      onClick={() => navigate("/")}
    >
      ORICÂND
    </div>
  );
}
