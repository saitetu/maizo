import { Icon } from "../atoms/Component";

interface Props {
  name: string;
  size?: string;
}
export const FabIcon = (props: Props) => {
  const Component = Icon[props.name];
  return (
    <div className="bg-[#000] w-[59px] h-[59px] rounded-full relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Component fill="#fff" size={props.size ? props.size : "42"} />
      </div>
    </div>
  );
};
