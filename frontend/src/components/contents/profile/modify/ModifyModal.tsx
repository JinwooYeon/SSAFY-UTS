import { useRecoilState } from "recoil";
import { profileState } from "../../../../recoil/profile";
import ModifyModalNickname from "./modifyModalNickname";
import { Button, message, Modal, Popconfirm } from "antd";
import { userState } from "../../../../recoil/user";
import ModifyModalPic from "./modifyModalPic";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export const ModifyModal = () => {
  // recoil
  const [userStateVal, setUserStateVal] = useRecoilState(userState);
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // let
  let userSeq = localStorage.getItem("userSeq");

  // useNavigate
  const naviagate = useNavigate();

  // Axios
  const PutWidthdraw = (userSeq: string | null) => {
    axios
      .put("http://j6a105.p.ssafy.io:8080/api/user/withdraw", {
        userSeq,
      })
      .then(() => {
        console.log(`SUCCESS Delete Account\n${profileStateVal.userNickname}`);
        localStorage.removeItem("userAccount");
        localStorage.removeItem("userSeq");
        localStorage.removeItem("userProfileImage");
        setUserStateVal({ ...userStateVal, login: false });
        setProfileStateVal({
          ...profileStateVal,
          modalVisible: false,
          userRole: 0,
        });
        naviagate("/");
      })
      .catch((res) => {
        console.log(res);
      });
  };
  const PutNickname = (userSeq: string | null, userNickname: string | null) => {
    axios
      .put("http://j6a105.p.ssafy.io:8080/api/user/edit/nickname", {
        userSeq,
        userNickname,
      })
      .then(() => {
        console.log("change nickname / " + profileStateVal.modifyNickname);
      })
      .catch((res) => {
        console.log(res);
      });
  };
  const PutImage = (
    userSeq: string | null,
    userProfileImage: string | undefined | null
  ) => {
    axios
      .put("http://j6a105.p.ssafy.io:8080/api/user/edit/image", {
        userSeq,
        userProfileImage,
      })
      .then((res) => {
        console.log(
          "change profileImg / " + profileStateVal.modifyUserProfileImage
        );
      })
      .catch((res) => {
        console.log(res);
      });
  };

  // function
  const handleCancel = () => {
    setProfileStateVal({
      ...profileStateVal,
      modalVisible: false,
      modifyNickname: profileStateVal.userNickname,
      modifyUserProfileImage: profileStateVal.userProfileImage,
    });
  };
  const modifyFunc = () => {
    if (profileStateVal.modifyNicknameCheck) {
      if (profileStateVal.userNickname !== profileStateVal.modifyNickname) {
        PutNickname(userSeq, profileStateVal.modifyNickname);
        setProfileStateVal({
          ...profileStateVal,
          userNickname: profileStateVal.modifyNickname,
        });
      }
      if (
        profileStateVal.userProfileImage !==
        profileStateVal.modifyUserProfileImage
      ) {
        PutImage(userSeq, profileStateVal.modifyUserProfileImage);
        setProfileStateVal({
          ...profileStateVal,
          userProfileImage: profileStateVal.modifyUserProfileImage,
        });
        if (profileStateVal.modifyUserProfileImage)
          localStorage.setItem(
            "userProfileImage",
            profileStateVal.modifyUserProfileImage
          );
      }
      setProfileStateVal({
        ...profileStateVal,
        modalLoading: false,
        modalVisible: false,
      });
    } else {
      message.error("????????? ??????????????? ????????????!");
      setProfileStateVal({
        ...profileStateVal,
        modalLoading: false,
        modalVisible: true,
      });
    }
    // console.log("profileStateVal.userProfileImage");
    // console.log(profileStateVal.userProfileImage);
    // console.log("profileStateVal.modifyUserProfileImage");
    // console.log(profileStateVal.modifyUserProfileImage);
  };

  // click button _ modify
  const clickModifyDelete = () => {
    PutWidthdraw(userSeq);
  };
  const clickModifyButton = () => {
    setProfileStateVal({
      ...profileStateVal,
      modalLoading: true,
    });
    setTimeout(() => {
      modifyFunc();
    }, 1500);
  };

  // useEffect
  useEffect(() => {
    if (profileStateVal.userNickname === profileStateVal.modifyNickname) {
      setProfileStateVal({ ...profileStateVal, modifyNicknameCheck: true });
    } else {
      setProfileStateVal({ ...profileStateVal, modifyNicknameCheck: false });
    }
  }, [profileStateVal.modifyNickname]);
  useEffect(() => {
    console.log(profileStateVal);
  }, [profileStateVal.userProfileImage]);

  return (
    <>
      <Modal
        visible={profileStateVal.modalVisible}
        title="????????? ??????"
        centered
        onCancel={handleCancel}
        footer={[
          <Popconfirm
            title="????????? ?????????????????????????"
            onConfirm={clickModifyDelete}
            okText="???"
            cancelText="?????????"
            key="0"
          >
            <Button danger>????????????</Button>
          </Popconfirm>,
          <Button
            type="primary"
            loading={profileStateVal.modalLoading}
            onClick={clickModifyButton}
            key="1"
          >
            ????????????
          </Button>,
        ]}
      >
        <ModifyModalPic key="0" />

        <ModifyModalNickname key="1" />
      </Modal>
    </>
  );
};
