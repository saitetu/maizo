interface Props {
    children?: React.ReactNode;
    className?: string;
    sm?: boolean;
  }

export const Label = (props: Props) => {
    return (
      <div className={props.className}>
        {
          !props.sm?
      <div
        className={'text-white noto-bold border-l-[8px] border-white ml-3 my-2 font-bold'}
        style={{
          fontSize: '24px',
        }}
      >
        <span className="ml-2">{props.children}</span>
      </div>:
        <div
        className={'text-white noto-bold border-l-[8px] border-white ml-3 my-5 font-bold'}
        style={{
          fontSize: '18px',
        }}
      >
        <span className="ml-2">{props.children}</span>
      </div>
      }
      </div>
    );
  };
  