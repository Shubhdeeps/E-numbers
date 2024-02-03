type IProp = {
  title: string;
};
export default function MutedTitle({ title }: IProp) {
  return (
    <div className="mt-3 px-3 uppercase text-[#7A7A7A] font-bold text-sm">
      {title}
    </div>
  );
}
