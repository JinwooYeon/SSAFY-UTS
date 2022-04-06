import { message } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ThemeType } from "../../../../../global/theme";
import { badgeDetailState } from "../../../../../recoil/BadgeDetail";
import { profileState } from "../../../../../recoil/profile";
import Button from "../../../../containers/button";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import { BuyBadgeModal } from "../buyBadgeModal/BuyBadgeModal";
import { SellBadgeModal } from "../sellBadgeModal/SellBadgeModal";
import { BadgeDetailDiv, ButtonDiv } from "./BadgeDetail.styled";
import { ethers } from "ethers";
import { marketContract } from "../../../../../config";

interface IBadgeDetail extends ThemeType {}

export const BadgeDetail = ({ isDark }: IBadgeDetail) => {
  const [badgeDetailStateVal, setBadgeDetailStateVal] =
    useRecoilState(badgeDetailState);
  // 정현 추가
  const tokenId = 1;
  const getInfo = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const balance = await provider.getBalance(signer.getAddress());
    console.log("here", balance);
    const response = await marketContract.tokenURI(1);
    console.log("response", response);
  };
  getInfo();
  // 여기까지
  const userDetailStateVal = useRecoilValue(profileState);

  const copyCodeToClipboard = () => {
    const el = "주소주소주~~"; //고쳐야 합니다
    // console.log(navigator.clipboard);
    navigator.clipboard.writeText(el).then(() => {
      // console.log(`${el} success`);
      message.success("해당 뱃지의 url이 클립보드에 저장되었습니다.");
    });
  };

  const onClickBuy = () => {
    setBadgeDetailStateVal({
      ...badgeDetailStateVal,
      isOpenBuyModal: true,
    });
  };

  const onClickSell = () => {
    setBadgeDetailStateVal({
      ...badgeDetailStateVal,
      isOpenSellModal: true,
    });
  };

  // console.log(userDetailStateVal.userWallet); // badgeDetailStateVal.userWallet이랑 같으면 어떻게 하고 아니면 어떻게 하게 해결 해야함

  return (
    <BadgeDetailDiv isDark={isDark}>
      <div>
        <LetterBox size="h1" weight="extraBold">
          history
        </LetterBox>
        <LetterBox>역사 1</LetterBox>
        <LetterBox>역사 2</LetterBox>
        <LetterBox>역사 3</LetterBox>
      </div>
      <ButtonDiv>
        <Button styleVariant="primary" onClick={onClickBuy}>
          Buy 1000 SSF
        </Button>
        <Button styleVariant="primary" onClick={copyCodeToClipboard}>
          Share with Friends
        </Button>
      </ButtonDiv>
      <BuyBadgeModal isDark={isDark}></BuyBadgeModal>
      <ButtonDiv>
        <Button styleVariant="primary" onClick={onClickSell}>
          Sell this Badge
        </Button>
        <Button styleVariant="primary" onClick={copyCodeToClipboard}>
          Share with Friends
        </Button>
      </ButtonDiv>
      <SellBadgeModal isDark={isDark}></SellBadgeModal>
    </BadgeDetailDiv>
  );
};
