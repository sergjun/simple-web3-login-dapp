import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from "./identicon";

type Props = {
  handleOpenModal: any;
};
export default function ConnectButton({ handleOpenModal }: Props) {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return account ? (
    <Box
      display="flex"
      alignItems="center"
      background="white"
      borderRadius="xl"
      py="0"
    >
      <Box px="3">
        <Text color="black" fontWeight="Bold" fontSize="md">
          {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
        </Text>
      </Box>
      <Button
        onClick={handleOpenModal}
        bg="gray.800"
        border="3px solid #C6F6D5"
        _hover={{
          border: "3px",
          borderStyle: "solid",
          borderColor: "green.500",
          backgroundColor: "gray.700",
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px"
      >
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          {account &&
            `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
        </Text>
        <Identicon />
      </Button>
    </Box>
  ) : (
    <Button
      onClick={handleConnectWallet}
      bg="gray.800"
      color="gray.300"
      fontSize="lg"
      fontWeight="medium"
      borderRadius="xl"
      border="1px solid transparent"
      _hover={{
        borderColor: "green.500",
        color: "green.300",
      }}
      _active={{
        backgroundColor: "green.500",
        borderColor: "green.300",
      }}
    >
      Connect to a wallet
    </Button>
  );
}
