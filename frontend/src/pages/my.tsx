import { FC } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";

const My: FC = () => {
  const { mintNftContract } = useOutletContext<OutletContext>();

  return <div>My</div>;
};

export default My;
