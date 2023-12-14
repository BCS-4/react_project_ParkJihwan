import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NftMetadata } from "../types";

export interface NftCardProps {
  image: string;
  name: string;
  tokenId: number;
}

const NftCard: FC<NftCardProps> = ({ image, name, tokenId }) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const onMouseEnter = () => {
    setIsHover(true);
  };

  const onMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <Link to={`/detail/${tokenId}`}>
      <li
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="relative"
      >
        <img src={image} alt={name} />
        <div className="font-semibold mt-1">{name}</div>

        {isHover && (
          <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50"></div>
        )}
      </li>
    </Link>
  );
};

export default NftCard;
