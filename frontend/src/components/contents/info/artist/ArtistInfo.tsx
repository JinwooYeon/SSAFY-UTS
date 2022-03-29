import LetterBox from "../../../containers/letterBox/LetterBox";
import { useParams, Params } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Modal, Button, message } from "antd";
import { ArtistHeader } from "../infoHeader/artistHeader/ArtistHeader";
import { ArtistInfoBox } from "./artistInfoBox/ArtistInfoBox";
import { EditionItem } from "./EditionItem/EditionItem";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { artistDetailState } from "../../../../recoil/artistDetail";
import { themeAtom } from "../../../../recoil/theme";

interface ArtistParamTypes extends Params {
  artist_id: string;
}

const ArtistInfomation = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

export const ArtistInfo = () => {
  const isDark = useRecoilValue(themeAtom).isDark;

  const checkFollow = () => {
    axios({
      method: "GET",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/check/follow", // 고쳐야 합니다
      params: {
        userTo: 2,
        userFrom: 33,
      },
    })
      .then(function (res) {
        setFollowArtist({ ...followArtist, followArtist: res.data.success });
        console.log(res.data.success);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  // 현재 artist_id 잡아내기
  const { artist_id } = useParams() as ArtistParamTypes;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [walletAddress, setwalletAddress] = useState("");
  const [followArtist, setFollowArtist] = useRecoilState(artistDetailState);

  // useEffect
  // 고쳐야 합니다
  useEffect(() => {
    checkFollow();
    setwalletAddress("0x23D5ecFf8a5b9f9f5f57EAFE35268bC566BDda55");
    // console.log(followArtist.followArtist);
  }, []);

  // modal창 열기
  // clipboard에 지갑 주소 복사하기
  const copyCodeToClipboard = () => {
    const el = walletAddress;
    navigator.clipboard.writeText(el).then(() => {
      console.log(`${el} success`);
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCopyPaste = () => {
    setIsModalVisible(false);
    copyCodeToClipboard();
    message.success("지갑 주소가 복사되었습니다.");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <ArtistInfomation>
        <ArtistHeader isFollow={followArtist.followArtist} />
        {/* <p>{artist_id}번째 아티스트</p> */}
        <LetterBox size="h1" weight="extraBold">
          Kelly Jung
        </LetterBox>
        <Button type="primary" onClick={showModal}>
          지갑 주소 확인하기
        </Button>
        <Modal
          title={`${artist_id}님의 지갑 주소`} // 고쳐야 합니다
          visible={isModalVisible}
          onOk={handleCopyPaste}
          onCancel={handleCancel}
          okText="지갑 주소 복사하기"
          cancelText="닫기"
        >
          <p>{walletAddress}</p>
        </Modal>
        <br />
        <ArtistInfoBox isDark={isDark} />
        <br />
        <LetterBox size="h2" weight="extraBold">
          BADGE EDITION
        </LetterBox>
        <div>
          <EditionItem isDark={isDark} />
          <EditionItem isDark={isDark} />
          <EditionItem isDark={isDark} />
        </div>
      </ArtistInfomation>
    </div>
  );
};
