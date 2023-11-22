interface Props {
  name: string;
  thumbnail: string;
  value: number;
  onClick: () => void;
}

export const HistoryContent = (props: Props) => {
  return (
    <div
      onClick={() => {
        props.onClick();
      }}
      className="bg-[#212121] mt-2 w-[380px] h-[160px] mx-auto rounded-[6px] text-[18px] cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105 mb-3 relative"
    >
      <div>
        <img
          className="h-[135px] rounded-lg absolute top-1/2 left-5 -translate-y-1/2"
          src={props.thumbnail}
          alt="thumbnail"
        />
        <div className="flex-col absolute top-1/2 left-[240px] -translate-y-1/2">
          <div className="text-start mb-7">
           {props.name}
          </div>
          <div className="flex gap-3 items-center">
            <div>
              <img src="image/maizocoin.png" alt="maizocoin" width={30} />
            </div>
            <div>{props.value}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
