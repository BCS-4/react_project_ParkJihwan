import { FC } from "react";
import NftCard, { NftCardProps } from "./NftCard";

interface SaleNftCardProps extends NftCardProps {}

const SaleNftCard: FC<SaleNftCardProps> = ({ tokenId, image, name }) => {
  return (
    <>
      <NftCard tokenId={tokenId} image={image} name={name} />
    </>
  );
};

export default SaleNftCard;
