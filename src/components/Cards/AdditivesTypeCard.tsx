import { greenCheckSVG } from "../../assets/icons/GreenCheck";
import { neutralSVG } from "../../assets/icons/NeutralIcon";
import { redCrossSVG } from "../../assets/icons/RedCrossIcon";

type IProp = {
  variant: "cross" | "neutral" | "check";
  title: string;
};

const VariantAndIcon = {
  cross: redCrossSVG,
  neutral: neutralSVG,
  check: greenCheckSVG,
};

export default function AdditivesTypeCard({ title, variant }: IProp) {
  const icon = VariantAndIcon[variant];
  return (
    <div
      className="
    h-[60px] w-[173px] 
    rounded-3xl 
    flex justify-between items-center
    uppercase
    bg-fg
    p-3
    font-bold
    "
    >
      {title}
      {icon}
    </div>
  );
}
