type IProps = {
  title: string;
  body: string;
};

export default function DescriptionCard({ body, title }: IProps) {
  return (
    <div className="rounded-3xl p-3 bg-fg max-w-[620px]">
      <div className="uppercase text-textGray font-extrabold text-[0.6rem]">
        {title}
      </div>
      <div className="font-semibold text-sm mt-2">{body}</div>
    </div>
  );
}
