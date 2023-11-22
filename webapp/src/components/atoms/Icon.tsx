export interface IconsProps {
  size?: string;
  fill?: string;
}
export const Treasure = ({ size = "24", fill = "#fff" }: IconsProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 4H19C19.7956 4 20.5587 4.31607 21.1213 4.87868C21.6839 5.44129 22 6.20435 22 7V11H15V10H9V11H2V7C2 6.20435 2.31607 5.44129 2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4ZM11 11H13V13H11V11ZM2 12H9V13L11 15H13L15 13V12H22V20H2V12Z" />
    </svg>
  );
};
export const Plus = ({ size = "24", fill = "#fff" }: IconsProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    </svg>
  );
};
export const Arrow = ({ size = "24", fill = "#fff" }: IconsProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.08 7.03V11.03H19L19.03 13.04H10.08V17.03L5.08 12.03L10.08 7.03Z" />
    </svg>
  );
};
export const MapMarker = ({ size = "24", fill = "#fff" }: IconsProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5ZM12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2Z" />
    </svg>
  );
};
export const Pencil = ({ size = "24", fill = "#fff" }: IconsProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.71 7.04C20.37 7.38 20.04 7.71 20.03 8.04C20 8.36 20.34 8.69 20.66 9C21.14 9.5 21.61 9.95 21.59 10.44C21.57 10.93 21.06 11.44 20.55 11.94L16.42 16.08L15 14.66L19.25 10.42L18.29 9.46L16.87 10.87L13.12 7.12L16.96 3.29C17.35 2.9 18 2.9 18.37 3.29L20.71 5.63C21.1 6 21.1 6.65 20.71 7.04ZM3 17.25L12.56 7.68L16.31 11.43L6.75 21H3V17.25Z" />
    </svg>
  );
};
export const Shovel = ({ size = "24", fill = "#fff" }: IconsProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.1 1.81L12.27 4.64C11.5 5.42 11.5 6.69 12.27 7.47L13.68 8.88L9.13 13.43L6.31 10.6L4.89 12C-0.0600011 17 3.5 20.5 3.5 20.5C3.5 20.5 7 24 12 19.09L13.41 17.68L10.61 14.88L15.15 10.34L16.54 11.73C17.32 12.5 18.59 12.5 19.37 11.73L22.2 8.9L15.1 1.81ZM17.93 10.28L16.55 8.9L15.11 7.46L13.71 6.06L15.12 4.65L19.35 8.88L17.93 10.28Z" />
    </svg>
  );
};
export const Car = ({ size = "24", fill = "#fff" }: IconsProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 11L6.5 6.5H17.5L19 11M17.5 16C17.1022 16 16.7206 15.842 16.4393 15.5607C16.158 15.2794 16 14.8978 16 14.5C16 14.1022 16.158 13.7206 16.4393 13.4393C16.7206 13.158 17.1022 13 17.5 13C17.8978 13 18.2794 13.158 18.5607 13.4393C18.842 13.7206 19 14.1022 19 14.5C19 14.8978 18.842 15.2794 18.5607 15.5607C18.2794 15.842 17.8978 16 17.5 16ZM6.5 16C6.10218 16 5.72064 15.842 5.43934 15.5607C5.15804 15.2794 5 14.8978 5 14.5C5 14.1022 5.15804 13.7206 5.43934 13.4393C5.72064 13.158 6.10218 13 6.5 13C6.89782 13 7.27936 13.158 7.56066 13.4393C7.84196 13.7206 8 14.1022 8 14.5C8 14.8978 7.84196 15.2794 7.56066 15.5607C7.27936 15.842 6.89782 16 6.5 16ZM18.92 6C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.28 5.42 5.08 6L3 12V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21H5C5.26522 21 5.51957 20.8946 5.70711 20.7071C5.89464 20.5196 6 20.2652 6 20V19H18V20C18 20.2652 18.1054 20.5196 18.2929 20.7071C18.4804 20.8946 18.7348 21 19 21H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20V12L18.92 6Z" />
    </svg>
  );
};
export const Gps = ({ size = "24", fill = "#fff" }: IconsProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8ZM3.05 13H1V11H3.05C3.5 6.83 6.83 3.5 11 3.05V1H13V3.05C17.17 3.5 20.5 6.83 20.95 11H23V13H20.95C20.5 17.17 17.17 20.5 13 20.95V23H11V20.95C6.83 20.5 3.5 17.17 3.05 13ZM12 5C10.1435 5 8.36301 5.7375 7.05025 7.05025C5.7375 8.36301 5 10.1435 5 12C5 13.8565 5.7375 15.637 7.05025 16.9497C8.36301 18.2625 10.1435 19 12 19C13.8565 19 15.637 18.2625 16.9497 16.9497C18.2625 15.637 19 13.8565 19 12C19 10.1435 18.2625 8.36301 16.9497 7.05025C15.637 5.7375 13.8565 5 12 5Z" />
    </svg>
  );
};
export const Vip = ({ size = "24", fill = "#fff" }: IconsProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 39 18`}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.6 0.863999L9.768 18H5.808L0 0.863999H3.672L6.888 11.064C6.952 11.24 7.04 11.568 7.152 12.048C7.28 12.512 7.408 13.008 7.536 13.536C7.664 14.048 7.752 14.48 7.8 14.832C7.848 14.48 7.928 14.048 8.04 13.536C8.168 13.008 8.296 12.512 8.424 12.048C8.552 11.568 8.64 11.24 8.688 11.064L11.928 0.863999H15.6ZM24.1774 18H16.3774V15.936L18.4654 14.976V3.888L16.3774 2.928V0.863999H24.1774V2.928L22.0894 3.888V14.976L24.1774 15.936V18ZM32.5695 0.863999C34.7775 0.863999 36.3855 1.344 37.3935 2.304C38.4175 3.248 38.9295 4.552 38.9295 6.216C38.9295 6.968 38.8175 7.688 38.5935 8.376C38.3695 9.048 37.9935 9.656 37.4655 10.2C36.9535 10.728 36.2735 11.144 35.4255 11.448C34.5775 11.752 33.5295 11.904 32.2815 11.904H30.7215V18H27.0975V0.863999H32.5695ZM32.3775 3.84H30.7215V8.928H31.9215C32.6095 8.928 33.2015 8.84 33.6975 8.664C34.1935 8.488 34.5775 8.208 34.8495 7.824C35.1215 7.44 35.2575 6.944 35.2575 6.336C35.2575 5.488 35.0255 4.864 34.5615 4.464C34.0975 4.048 33.3695 3.84 32.3775 3.84Z" 
      fill={fill}
      />
    </svg>
  );
};
