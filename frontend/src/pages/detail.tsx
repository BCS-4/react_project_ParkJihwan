import { FC, useEffect, useState } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { NftMetadata, OutletContext } from "../types";
import axios from "axios";

const Detail: FC = () => {
  const [metadata, setMetadata] = useState<NftMetadata>();

  const { tokenId } = useParams();

  const { mintNftContract } = useOutletContext<OutletContext>();

  const navigate = useNavigate();

  const getMyNFT = async () => {
    try {
      if (!mintNftContract) return;

      const metadataURI: string = await mintNftContract.methods
        // @ts-expect-error
        .tokenURI(tokenId)
        .call();

      const response = await axios.get(metadataURI);

      setMetadata(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMyNFT();
  }, [mintNftContract]);

  return (
    <div className="grow flex justify-center items-center relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 hover:text-gray-500 bg-gray-200 py-1 px-2 rounded-lg font-semibold"
      >
        Back
      </button>
      {metadata && (
        <div className="w-90 flex p-10 bg-gray-100 shadow-2xl border border-gray-100">
          <div className="w-1/2 mr-2">
            <img className="w-72" src={metadata.image} alt={metadata.name} />
          </div>
          <div className="w-1/2 ml-2">
            <div className="font-semibold mt-1">{metadata.name}</div>
            <div className="mt-1">{metadata.description}</div>
            <ul className="mt-4 flex gap-1 flex-col">
              {metadata.attributes.map((v, i) => (
                <li key={i}>
                  <span className="font-semibold">{v.trait_type}</span>
                  <span>: {v.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
