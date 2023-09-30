import "./App.css";
import Drive from "./artifacts/contracts/Drive.sol/Drive.json";
import LandingPage from "./component/LandingPage";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./component/FileUpload";
import Display from "./component/Display";
import Modal from "./component/Modal";
import swal from "sweetalert";
import { Badge } from "./ui/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./ui/ui/hover-card";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        //to reload when acc of metamask get changed
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Drive.abi,
          signer
        );
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        swal("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <div className="App">
      {/* <Modal setModal={setModal} contract={contract}></Modal> */}
      <HoverCard>
        <HoverCardTrigger>
          {" "}
          <div className="flex px-2 my-8 mx-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>ewa</AvatarFallback>
            </Avatar>
            <Badge variant="outline">
              {account ? "Connected" : "Not Connected"}
            </Badge>
          </div>
        </HoverCardTrigger>
        <HoverCardContent>
          {account ? account : "Not Connected"}
        </HoverCardContent>
      </HoverCard>
      <FileUpload
        account={account}
        provider={provider}
        contract={contract}
      ></FileUpload>
      <Display contract={contract} account={account}></Display>
    </div>
  );
}

export default App;
