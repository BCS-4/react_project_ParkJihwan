import { useSDK } from "@metamask/sdk-react";
import { Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  account: string;
  setAccount: Dispatch<SetStateAction<string>>;
}

const Header: FC<HeaderProps> = ({ account, setAccount }) => {
  const { sdk } = useSDK();

  const onClickMetaMask = async () => {
    try {
      const accounts: any = await sdk?.connect();

      setAccount(accounts[0] as string);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header className="bg-gray-100 p-2 flex justify-between border-b-2 border-black">
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/my">My</Link>
        <Link to="/sale">Sale</Link>
      </div>
      <div>
        {account ? (
          <div>
            <span className="py-1 px-2 ">
              {account.substring(0, 7)}...
              {account.substring(account.length - 5)}
            </span>
            <button
              className="ml-5 bg-sky-500 py-1 px-2 text-white rounded-xl"
              onClick={() => setAccount("")}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="ml-5 bg-sky-500 py-1 px-2 text-white rounded-xl"
            onClick={onClickMetaMask}
          >
            MetaMask Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
