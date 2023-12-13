import { Dispatch, FC, SetStateAction, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext, NftMetadata } from "../types/index";
import axios from "axios";

interface MintModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const MintModal: FC<MintModalProps> = ({ setIsOpen }) => {
  const [metadata, setMetadata] = useState<NftMetadata>();

  const { mintNftContract, account } = useOutletContext<OutletContext>();

  const onClickMint = async () => {
    try {
      if (!mintNftContract || !account) return;

      await mintNftContract.methods.mintNFT().send({ from: account });
      // @ts-expect-error
      const balance = await mintNftContract.methods.balanceOf(account).call();

      const tokenId = await mintNftContract.methods
        // @ts-expect-error
        .tokenOfOwnerByIndex(account, Number(balance) - 1)
        .call();

      const metadataURI: string = await mintNftContract.methods
        // @ts-expect-error
        .tokenURI(Number(tokenId))
        .call();

      const response = await axios.get(metadataURI);

      setMetadata(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-70 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl">
        <div className="bg-pink-100 text-right mb-8">
          <button onClick={() => setIsOpen(false)}>X</button>
        </div>
        {metadata ? (
          <div className="w-60">
            <img
              className="w-60 h-60"
              src={metadata.image}
              alt={metadata.name}
            />
            <div className="font-semibold mt-1">{metadata.name}</div>
            <div className="mt-1">{metadata.description}</div>
            <ul className="mt-1 flex flex-wrap gap-1">
              {metadata.attributes.map((v, i) => (
                <li key={i}>
                  <span className="font-semibold">{v.trait_type}</span>
                  <span>{v.value}</span>
                </li>
              ))}
            </ul>
            <div className="bg-blue-200 w-20 p-1 rounded-md mx-auto text-center font-bold mt-4 hover:text-gray-500">
              <button onClick={() => setIsOpen(false)}>닫기</button>
            </div>
          </div>
        ) : (
          <>
            <div className="">NFT를 민팅하시겠습니까?</div>
            <div className="text-center mt-4 bg-blue-100">
              <button onClick={onClickMint}>확인</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MintModal;
